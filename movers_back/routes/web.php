
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\{
    HomeController,
    AuthController,
    UserController,
    CmsController,
    ReportController,
    RatingReviewController,
    TransactionController,
    RidesController,
    SettingController,
    NotificationController,
    CostController,
    EarningController
};
use App\Http\Controllers\AdminOfferController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return view('welcome');
// });

Auth::routes();
Route::get('locale/{locale}', function ($locale) {
    Session::put('locale', $locale);
    return redirect()->back();
});





Route::get('/home', [HomeController::class, 'index'])->name('home');

Route::get('/cron-job', [UserController::class, 'change_ride_status'])->name('change-ride-status');
Route::prefix('admin')->group(function () {

    //Route::get('/', [AuthController::class, 'register'])->name('admin.register');
    Route::get('/', [AuthController::class, 'login'])->name('admin.login');
    Route::post('/admin-login-check', [AuthController::class, 'login_admin'])->name('admin.login.check');
    Route::get('/forget-password', [AuthController::class, 'forget_password'])->name('admin.forget.password');
    Route::post('/send-password-link', [AuthController::class, 'send_reset_link'])->name('admin.send.reset.link');
    Route::get('/reset-password-recive/{token}/', [AuthController::class, 'recive_reset_link'])->name('admin.redirect.password');
    Route::post('/submit-new-password', [AuthController::class, 'submit_new_password'])->name('admin.submit.new.password');

    Route::group(['middleware' => 'is_admin'], function () {

        Route::get('/dashboard', [AuthController::class, 'dashboard'])->name('admin.dashboard');
        Route::get('/logout', [AuthController::class, 'logout'])->name('admin.logout');
        Route::get('/admin-profile', [AuthController::class, 'admin_profile'])->name('admin.profile');
        Route::post('/submit-profile', [AuthController::class, 'update_profile'])->name('admin.submit.profile');
        Route::get('/admin-profile-setting', [AuthController::class, 'admin_profile_setting'])->name('admin.profile.setting');

        ///////////User Route///////////////
        Route::get('users/user-list', [UserController::class, 'index'])->name('user.list');
        Route::get('users/user-view/{id}', [UserController::class, 'user_view'])->name('user.view');
        Route::get('users/edit-user-view/{id}', [UserController::class, 'edit_user'])->name('edit.user');
        Route::post('users/submit-edited-user/{id}', [UserController::class, 'edit_user_data'])->name('admin.submit.user.data');
        Route::get('users/add-user', [UserController::class, 'add_user'])->name('admin.add.user');
        Route::post('users/submit-user', [UserController::class, 'submit_user'])->name('admin.submit.user');
        Route::post('users/admin-delete-user', [UserController::class, 'delete_user'])->name('admin.delete.user');
        Route::post('users/admin-change-status', [UserController::class, 'change_status'])->name('admin.change.status');
        Route::post('users/delete-car', [UserController::class, 'delete_car'])->name('admin.delete.car');
        Route::post('users/change-car-status', [UserController::class, 'change_car_status'])->name('admin.car.status');
        Route::post('users/change-verified-status', [UserController::class, 'change_verified_status'])->name('admin.verified.status');
        Route::get('users/view-car/{id}', [UserController::class, 'view_car'])->name('admin.view.car');
        Route::post('users/delete-user-complaint', [UserController::class, 'delete_user_complaint'])->name('admin.delete.user.complaint');
        Route::post('users/admin-reply-user', [UserController::class, 'admin_reply_user'])->name('admin.reply.user.complaint');
        Route::get('users/receive-notification/{id}', [UserController::class, 'user_notification'])->name('user.receive.notification');
        Route::post('users/delete-notification', [UserController::class, 'delete_notification'])->name('user.delete.notification');
        Route::post('users/send-notification', [UserController::class, 'send_notification'])->name('user.send.notification');

        /////////////Report Manager////////
        Route::get('report/complaint', [ReportController::class, 'compalint_list'])->name('admin.complaint.list');
        Route::get('report/complaint/view-complaint/{id}', [ReportController::class, 'view_complaint'])->name('admin.complaint.view');
        Route::post('report/complaint/delete-complaint', [ReportController::class, 'delete_complaint'])->name('admin.delete.complaint');
        Route::post('report/complaint/complaint-reply', [ReportController::class, 'complaint_reply'])->name('admin.complaint.reply');
        Route::get('report/enquiry', [ReportController::class, 'enquiry_list'])->name('admin.enquiry.list');
        Route::get('report/enquiry/view-enquiry/{id}', [ReportController::class, 'view_enquiry'])->name('admin.enquiry.view');
        Route::post('report/enquiry/delete-enquiry', [ReportController::class, 'delete_enquiry'])->name('admin.delete.enquiry');
        Route::post('report/enquiry/enquiry-reply', [ReportController::class, 'enquiry_reply'])->name('admin.enquiry.reply');
        Route::get('report/reasons', [ReportController::class, 'reasons_list'])->name('admin.reasons.list');
        Route::get('report/reasons/add-reason', [ReportController::class, 'add_reason'])->name('admin.add.reason');
        Route::post('report/reasons/submit-reason', [ReportController::class, 'submit_reason'])->name('admin.submit.reason');
        Route::get('report/reasons/edit-reason/{id}', [ReportController::class, 'edit_reason'])->name('admin.edit.reason');
        Route::post('report/reasons/submit-edit-reason/{id}', [ReportController::class, 'submit_edit_reason'])->name('admin.submit.edit.reason');
        Route::post('report/reasons/delete-reason', [ReportController::class, 'delete_reason'])->name('admin.delete.reason');
        Route::post('report/reasons/change-status', [ReportController::class, 'reason_change_status'])->name('admin.reason.change.status');
        Route::get('report/cancel', [ReportController::class, 'cancel_reasons'])->name('admin.cancel.rides');
        Route::post('report/cancel/delete-cancel-reason', [ReportController::class, 'delete_cancel_reason'])->name('admin.delete.cancel.reason');

        ////////////Rating Manager//////////
        Route::get('rating/review-rating', [RatingReviewController::class, 'index'])->name('admin.rating.list');
        Route::get('rating/view-rating/{id}', [RatingReviewController::class, 'view_rating'])->name('admin.view.rating');
        Route::post('rating/delete-rating', [RatingReviewController::class, 'delete_rating'])->name('admin.delete.rating');
        Route::post('rating/change-rating-status', [RatingReviewController::class, 'rating_change_status'])->name('admin.rating.status');

        ////////////Transaction Manager/////
        Route::get('transaction/transaction-list', [TransactionController::class, 'index'])->name('admin.transaction.list');
        Route::get('transaction/view-transaction/{id}', [TransactionController::class, 'view_transaction'])->name('admin.view.transaction');
        Route::get('transaction/rider-transaction', [TransactionController::class, 'view_rider_transaction'])->name('admin.view.rider.transaction');
        Route::post('transaction/pay-to-rider', [TransactionController::class, 'pay_to_rider'])->name('admin.pay.to.rider');

        ////////////CMS Manager////////////
        Route::get('cms/pages/pages-list', [CmsController::class, 'index'])->name('admin.cms.list');
        Route::get('cms/pages/page-view/', [CmsController::class, ''])->name('admin.view.page');
        Route::get('cms/pages/page-add', [CmsController::class, 'view_add_page'])->name('admin.cms.add');
        Route::post('cms/pages/submit-page', [CmsController::class, 'add_page'])->name('admin.cms.submit.page');
        Route::get('cms/pages/page-edit/{slug}', [CmsController::class, 'edit_cms_page'])->name('admin.cms.edit');
        Route::post('cms/pages/submit-edited-page/{slug}', [CmsController::class, 'submit_edited_page'])->name('admin.cms.edit.page');
        Route::post('cms/pages/delete-page', [CmsController::class, 'delete_page'])->name('admin.delete.page');
        Route::post('cms/pages/change-page-status', [CmsController::class, 'change_page_status'])->name('admin.page.status');
        Route::get('cms/help/help-list', [CmsController::class, 'help_list'])->name('admin.help.page');
        Route::get('cms/help/add-help', [CmsController::class, 'add_help'])->name('admin.add.help.page');
        Route::post('cms/help/submit-help', [CmsController::class, 'submit_help'])->name('admin.submit.help.page');
        Route::post('cms/help/delete-help', [CmsController::class, 'delete_help'])->name('admin.delete.help');
        Route::get('cms/help/view-help-edit/{id}', [CmsController::class, 'edit_help'])->name('admin.edit.help');
        Route::post('cms/help/help-edit/{id}', [CmsController::class, 'submit_edit_help'])->name('admin.edited.help');
        Route::post('cms/help/help-change-status/', [CmsController::class, 'help_change_status'])->name('admin.help.change.status');

        ////////////////Setting Manager////////
        Route::get('setting/logo-favicon', [SettingController::class, 'logo_favicon'])->name('admin.setting.site');
        Route::post('setting/add-logo-favicon', [SettingController::class, 'add_favicon'])->name('admin.add.favicon');
        Route::get('setting/admin-setting', [SettingController::class, 'admin_setting'])->name('admin.setting');
        Route::post('setting/submit-admin-percentage', [SettingController::class, 'submit_admin_per'])->name('admin.percentage.update');
        Route::post('setting/submit-sms-key', [SettingController::class, 'update_sms_key'])->name('admin.sms.key.update');
        Route::post('setting/update-search-radius', [SettingController::class, 'update_search_radius'])->name('admin.search.radius');
        Route::post('setting/submit-per-km', [SettingController::class, 'submit_per_km'])->name('admin.per.km');

        /////////////////Rider Manager///////////
        Route::any('rides/users/rides-list', [RidesController::class, 'index'])->name('admin.rides.list');
        Route::get('rides/users/ride/{id}', [RidesController::class, 'view_ride'])->name('admin.view.rides');

        ////////////////Notification Manager/////
        Route::get('get-notification/', [NotificationController::class, 'notification_list'])->name('admin.notification');
        Route::post('change-notification-status/', [NotificationController::class, 'notification_status'])->name('change.notification.status');
        Route::get('view-notification/{id}', [NotificationController::class, 'view_notification'])->name('view.notification');

        /////////////Cost Manager/////////////////
        Route::get('cost/get-cost-list', [CostController::class, 'cost_list'])->name('admin.cost.list');

        /////////////Earning Manager/////////////
        Route::get('earning/get-earning-list', [EarningController::class, 'earninglist'])->name('admin.earning.list');

        ////////////Charge Wallet////////////////
        Route::post('charge-wallet', [TransactionController::class, 'chargeWalletManualy'])->name('charge.wallet.manual');

        ////////////Offers Manager///////////////
        Route::get('offers', [AdminOfferController::class, 'index'])->name('admin.offers.list');
        Route::get('add-offer', [AdminOfferController::class, 'add_offer'])->name('admin.add.offer');
        Route::post('offers/submit-offer', [AdminOfferController::class, 'submit_offer'])->name('admin.submit.offer');
        Route::get('offers/offer-view/{id}', [AdminOfferController::class, 'offer_view'])->name('offer.view');
        Route::get('offers/edit-offer-view/{id}', [AdminOfferController::class, 'edit_offer'])->name('edit.offer');
        Route::post('offers/submit-edited-offer/{id}', [AdminOfferController::class, 'edit_offer_data'])->name('admin.submit.offer.data');
        Route::post('offers/admin-delete-offer', [AdminOfferController::class, 'delete_offer'])->name('admin.delete.offer');
        Route::post('offers/admin-change-status', [AdminOfferController::class, 'change_status'])->name('admin.change.offer.status');
        Route::post('offers/send-notification', [AdminOfferController::class, 'send_notification'])->name('offer.send.notification');

        //////////////////Debug Routes/////////////////
        Route::post('debug/test', [RidesController::class, 'rides_route'])->name('admin.debug.test');
    });
});
Route::get('/{slug}', [CmsController::class, 'redirect_page'])->name('pages');
