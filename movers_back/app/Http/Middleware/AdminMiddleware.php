<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AdminApiMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $user = $request->user(); // sanctum auth
        
        if (!$user) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        // Primary role check
        if ($user->role === 'admin' || $user->account_type === 'admin') {
            return $next($request);
        }

        // Fallback for legacy user_role_id
        if ((int)($user->user_role_id ?? 0) === 1) {
            return $next($request);
        }

        return response()->json(['message' => 'Forbidden - Admin access required'], 403);
    }
}
