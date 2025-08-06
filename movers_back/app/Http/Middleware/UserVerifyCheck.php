<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserVerifyCheck
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $check_data =  User::find(Auth::user()->id);

        if ($check_data && $check_data->verfication) {
            return $next($request);
        } else {
            return response()->json([
                "code"      =>  404,
                "response"  =>  "error",
                "message"   =>  __("Your Account is not verified"),

            ], 404);
        }
    }
}
