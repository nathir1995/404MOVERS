<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
// NOTE: in PHP grouped use, ensure the backslash before "{"
use App\Http\Controllers\Api\{
    AdminDashboardController,
    AdminSettingController,
    UserauthController,
    UserprofileController,
    FCMController,
    ItemCategoryController,
    ItemController,
    MessageController,
    MoveController,
    MoveStatusController,
    MoveTypeController,
    MovePackageController,
    UserDeletionController,
    NotificationController,
    RealTimeTracking
};

/* ... */

Route::group(['middleware' => 'logRoute'], function () {
});

/* SWITCH TO SANCTUM (or delete if unused) */
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

/* ... */

// Payments
Route::middleware(['auth:sanctum', 'app_localization'])->group(function () {
    Route::post('/pay', [MoveController::class, 'pay']);
    Route::post('/process-payment', [MoveController::class, 'processPayment']);
});

Route::prefix('email')->group(function () {
    Route::group(['middleware' => 'app_localization'], function () {
        Route::post('/send-verification-code', [UserauthController::class, 'sendVerificationCode'])
            ->middleware('throttle:5,1');  // 5 per minute
        Route::post('/verify', [UserauthController::class, 'verify_otp'])
            ->middleware('throttle:10,1'); // 10 per minute
    });
});

Route::prefix('admin')->group(function () {
    Route::group(['middleware' => 'app_localization'], function () {
        /* throttle admin login to curb brute force */
        Route::post('/login', [UserauthController::class, 'adminLogin'])
            ->middleware('throttle:6,1');

        /* ENFORCE ADMIN at route level */
        Route::group(['middleware' => ['auth:sanctum', 'admin.api']], function () {
            Route::post('/users', [AdminDashboardController::class, 'users']);
            Route::post('/user', [AdminDashboardController::class, 'user']);
            Route::post('/user/exempt', [AdminDashboardController::class, 'exempt_user']);
            Route::post('/drivers', [AdminDashboardController::class, 'drivers']);
            Route::post('/driver', [AdminDashboardController::class, 'driver']); // <-- keep this EXACT
            Route::post('/labors', [AdminDashboardController::class, 'labors']);
            Route::post('/labor', [AdminDashboardController::class, 'labor']);

            /* Admin-only deletion (controller blocks deleting admins) */
            Route::post('/user/delete', [UserDeletionController::class, 'delete'])
                ->name('admin.accounts.delete');

            Route::post('/movers', [AdminDashboardController::class, 'movers']);
            Route::prefix('mover')->group(function () {
                Route::post('/reject-account', [AdminDashboardController::class, 'rejectAccount']);
                Route::post('/approve-account-and-request-documents', [AdminDashboardController::class, 'approveAccountAndRequestDocuments']);
                Route::post('/reject-documents-and-request-reupload', [AdminDashboardController::class, 'rejectDocumentsAndRequestReupload']);
                Route::post('/approve-documents', [AdminDashboardController::class, 'approveDocuments']);
            });
            /* ... rest unchanged ... */
        });
    });
});

/* ... remainder unchanged ... */
