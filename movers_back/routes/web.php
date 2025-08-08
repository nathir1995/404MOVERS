<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// Railway health check endpoint
Route::get('/health', function () {
    return response()->json([
        'status' => 'healthy',
        'app' => 'Movers Backend API',
        'version' => '1.0.0',
        'environment' => config('app.env'),
        'timestamp' => now()->toISOString(),
        'php_version' => PHP_VERSION,
        'laravel_version' => app()->version()
    ], 200);
});

// Optional: Root endpoint
Route::get('/', function () {
    return response()->json([
        'message' => 'Movers Backend API is running',
        'status' => 'ok',
        'docs' => '/health'
    ], 200);
});

// Add your other routes below this line
// Example:
// Route::get('/api/test', function () {
//     return response()->json(['message' => 'Test endpoint working']);
// });
