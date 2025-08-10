<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class EnsureAdminApi
{
    public function handle(Request $request, Closure $next)
    {
        $user = $request->user(); // sanctum user
        if (!$user) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        // Prefer Spatie roles if available
        if (method_exists($user, 'hasRole') && $user->hasRole('admin')) {
            return $next($request);
        }

        // Fallbacks for schema variants
        $role = $user->role ?? $user->account_type ?? null;
        if ($role === 'admin' || (int)($user->user_role_id ?? 0) === 1) {
            return $next($request);
        }

        return response()->json(['message' => 'Forbidden'], 403);
    }
}
