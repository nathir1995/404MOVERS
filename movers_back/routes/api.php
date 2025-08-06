<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
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
    NotificationController,
    RealTimeTracking
};

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::group(['middleware' => 'logRoute'], function () {
});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('register')->group(function () {
    Route::group(['middleware' => 'app_localization'], function () {
        Route::post('/user', [UserauthController::class, 'userRegister']);
        Route::post('/driver', [UserauthController::class, 'driverRegister']);
        Route::post('/labor', [UserauthController::class, 'laborRegister']);
        Route::group(['middleware' => ['auth:sanctum']], function () {
            Route::prefix('driver')->group(function () {
                Route::post('/upload-documents', [UserprofileController::class, 'uploadDocuments'])->name('driver-upload-documents');
            });
            Route::prefix('labor')->group(function () {
                Route::post('/upload-documents', [UserprofileController::class, 'uploadDocuments'])->name('labor-upload-documents');
            });
        });
    });
});

Route::prefix('email')->group(function () {
    Route::group(['middleware' => 'app_localization'], function () {
        Route::post('/send-verification-code', [UserauthController::class, 'sendVerificationCode']);
        Route::post('/verify', [UserauthController::class, 'verify_otp']);
    });
});

Route::prefix('admin')->group(function () {
    Route::group(['middleware' => 'app_localization'], function () {
        Route::post('/login', [UserauthController::class, 'adminLogin']);
        Route::group(['middleware' => ['auth:sanctum']], function () {
            Route::post('/users', [AdminDashboardController::class, 'users']);
            Route::post('/user', [AdminDashboardController::class, 'user']);
            Route::post('/user/exempt', [AdminDashboardController::class, 'exempt_user']);
            Route::post('/drivers', [AdminDashboardController::class, 'drivers']);
            Route::post('/driver', [AdminDashboardController::class, 'driver']);
            Route::post('/labors', [AdminDashboardController::class, 'labors']);
            Route::post('/labor', [AdminDashboardController::class, 'labor']);
            Route::post('/movers', [AdminDashboardController::class, 'movers']);
            Route::prefix('mover')->group(function () {
                Route::post('/reject-account', [AdminDashboardController::class, 'rejectAccount']);
                Route::post('/approve-account-and-request-documents', [AdminDashboardController::class, 'approveAccountAndRequestDocuments']);
                Route::post('/reject-documents-and-request-reupload', [AdminDashboardController::class, 'rejectDocumentsAndRequestReupload']);
                Route::post('/approve-documents', [AdminDashboardController::class, 'approveDocuments']);
            });
            Route::prefix('move-packages')->group(function () {
                Route::get('/index', [MovePackageController::class, 'index']);
                Route::post('/get', [MovePackageController::class, 'get']);
                Route::post('/add', [MovePackageController::class, 'store']);
                Route::post('/update', [MovePackageController::class, 'update']);
                Route::post('/delete', [MovePackageController::class, 'delete']);
            });
            Route::get('/item-categories', [ItemCategoryController::class, 'itemCategories']);
            /**Settings APIs */
            Route::prefix('settings')->group(function () {
                Route::get('/index', [AdminSettingController::class, 'index']);
                Route::post('/add', [AdminSettingController::class, 'store']);
                Route::post('/update', [AdminSettingController::class, 'update']);
                Route::post('/delete', [AdminSettingController::class, 'delete']);
            });
            /**Moves APIs*/
            Route::prefix('moves')->group(function () {
                Route::post('/moves', [MoveController::class, 'getMoves']);
                Route::post('/get-move', [MoveController::class, 'getMove']);
                Route::post('/upcoming', [MoveController::class, 'upcomingMoves']);
                Route::post('/past', [MoveController::class, 'pastMoves']);
            });
        });
    });
});

Route::prefix('user')->group(function () {
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/verify-token', [UserauthController::class, 'verifyToken']);
        Route::prefix('moves')->group(function () {
            Route::post('/moves', [MoveController::class, 'getMoves']);
            Route::post('/draft', [MoveController::class, 'draftMoves']);
            Route::post('/upcoming', [MoveController::class, 'upcomingMoves']);
            Route::post('/past', [MoveController::class, 'pastMoves']);
            Route::post('/get-move', [MoveController::class, 'getMove']);
            Route::post('/start-move', [MoveController::class, 'startMove']);
            Route::post('/confirm-start-move', [MoveController::class, 'confirmStartMove']);
            Route::post('/finish-move', [MoveController::class, 'finishMove']);
            Route::post('/confirm-finish-move', [MoveController::class, 'confirmFinishMove']);
        });
        Route::post('/pay', [MoveController::class, 'pay']);
        Route::post('/process-payment', [MoveController::class, 'processPayment']);
        Route::post('/map', [RealTimeTracking::class, 'sendLocation']);
    });
    Route::prefix('moves')->group(function () {
        Route::post('/create', [MoveController::class, 'createMove']);
    });
});

Route::prefix('driver')->group(function () {
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/verify-token', [UserauthController::class, 'verifyToken']);
        Route::prefix('moves')->group(function () {
            Route::post('/moves', [MoveController::class, 'getMoves']);
            Route::post('/get-move', [MoveController::class, 'getMove']);
            Route::post('/my-moves', [MoveController::class, 'myMoves']);
            Route::post('/accept-move', [MoveController::class, 'acceptMove']);
            Route::post('/upcoming', [MoveController::class, 'upcomingMoves']);
            Route::post('/past', [MoveController::class, 'pastMoves']);
            Route::post('/start-move', [MoveController::class, 'startMove']);
            Route::post('/finish-move', [MoveController::class, 'finishMove']);
        });
    });
});

Route::prefix('labor')->group(function () {
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/verify-token', [UserauthController::class, 'verifyToken']);
        Route::prefix('moves')->group(function () {
            Route::post('/moves', [MoveController::class, 'getMoves']);
            Route::post('/get-move', [MoveController::class, 'getMove']);
            Route::post('/my-moves', [MoveController::class, 'myMoves']);
            Route::post('/accept-move', [MoveController::class, 'acceptMove']);
            Route::post('/upcoming', [MoveController::class, 'upcomingMoves']);
            Route::post('/past', [MoveController::class, 'pastMoves']);
            Route::post('/start-move', [MoveController::class, 'startMove']);
            Route::post('/finish-move', [MoveController::class, 'finishMove']);
        });
    });
});

Route::prefix('notification')->group(function () {
    Route::post('/sendNotification', [FCMController::class, 'sendNotification']);
    Route::group(['middleware' => ['auth:sanctum']], function () {
        Route::get('/all', [NotificationController::class, 'index']);
        Route::post('/read', [NotificationController::class, 'read']);
        Route::post('/delete', [NotificationController::class, 'delete']);
    });
});

Route::prefix('tracking')->group(function () {
    Route::group(['middleware' => ['auth:sanctum']], function () {
        Route::post('/location', [RealTimeTracking::class, 'location']);
    });
});

Route::get('/item-categories', [ItemCategoryController::class, 'itemCategories']);
Route::get('/items', [ItemController::class, 'items']);
Route::get('/move-types', [MoveTypeController::class, 'moveTypes']);
Route::get('/move-packages', [MovePackageController::class, 'index']);
Route::get('/move-statuses', [MoveStatusController::class, 'moveStatuses']);

Route::post('/login', [UserauthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [UserauthController::class, 'logout']);
});

Route::prefix('chat')->group(function () {
    Route::group(['middleware' => ['auth:sanctum']], function () {
        Route::get('/all', [MessageController::class, 'index']);
        Route::post('/create', [MessageController::class, 'createChat']);
        Route::post('/messages', [MessageController::class, 'show']);
        Route::post('/message', [MessageController::class, 'store']);
    });
});
