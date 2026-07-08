<?php

use App\Http\Controllers\Api\AddressController;
use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\CheckoutController;
use App\Http\Controllers\Api\CouponController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\PublicCatalogController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\WishlistController;
use Illuminate\Support\Facades\Route;

Route::get('/categories', [PublicCatalogController::class, 'categories']);
Route::get('/categories/{slug}', [PublicCatalogController::class, 'category']);
Route::get('/categories/{slug}/products', [PublicCatalogController::class, 'categoryProducts']);
Route::get('/products', [PublicCatalogController::class, 'products']);
Route::get('/products/search', [PublicCatalogController::class, 'search']);
Route::get('/products/{slug}', [PublicCatalogController::class, 'product']);
Route::get('/products/{id}/related', [PublicCatalogController::class, 'related']);
Route::get('/products/{id}/reviews', [PublicCatalogController::class, 'reviews']);
Route::get('/sellers/{slug}', [PublicCatalogController::class, 'seller']);
Route::get('/sellers/{slug}/products', [PublicCatalogController::class, 'sellerProducts']);
Route::get('/banners', [PublicCatalogController::class, 'banners']);
Route::get('/deals', [PublicCatalogController::class, 'deals']);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/seller/register', [AuthController::class, 'registerSeller']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'me']);
});

Route::middleware(['auth:sanctum', 'role:customer'])->group(function () {
    Route::get('/cart', [CartController::class, 'index']);
    Route::post('/cart/add', [CartController::class, 'add']);
    Route::put('/cart/update/{itemId}', [CartController::class, 'update']);
    Route::delete('/cart/remove/{itemId}', [CartController::class, 'remove']);
    Route::delete('/cart/clear', [CartController::class, 'clear']);

    Route::get('/wishlist', [WishlistController::class, 'index']);
    Route::post('/wishlist/add', [WishlistController::class, 'add']);
    Route::delete('/wishlist/remove/{productId}', [WishlistController::class, 'remove']);

    Route::get('/addresses', [AddressController::class, 'index']);
    Route::post('/addresses', [AddressController::class, 'store']);
    Route::put('/addresses/{id}', [AddressController::class, 'update']);
    Route::delete('/addresses/{id}', [AddressController::class, 'destroy']);

    Route::post('/coupon/apply', [CouponController::class, 'apply']);
    Route::delete('/coupon/remove', [CouponController::class, 'remove']);

    Route::post('/checkout', [CheckoutController::class, 'preview']);
    Route::post('/orders', [OrderController::class, 'store']);
    Route::get('/orders', [OrderController::class, 'index']);
    Route::get('/orders/{id}', [OrderController::class, 'show']);
    Route::post('/orders/{id}/cancel', [OrderController::class, 'cancel']);

    Route::post('/products/{id}/reviews', [ReviewController::class, 'store']);
    Route::put('/reviews/{id}', [ReviewController::class, 'update']);
    Route::delete('/reviews/{id}', [ReviewController::class, 'destroy']);

    Route::post('/payment/create-intent', [PaymentController::class, 'createIntent']);
    Route::post('/payment/verify', [PaymentController::class, 'verify']);
});

Route::middleware(['auth:sanctum', 'role:seller'])->prefix('seller')->group(function () {
    Route::get('/products', [\App\Http\Controllers\Api\Seller\ProductController::class, 'index']);
    Route::post('/products', [\App\Http\Controllers\Api\Seller\ProductController::class, 'store']);
    Route::put('/products/{id}', [\App\Http\Controllers\Api\Seller\ProductController::class, 'update']);
    Route::delete('/products/{id}', [\App\Http\Controllers\Api\Seller\ProductController::class, 'destroy']);

    Route::get('/orders', [\App\Http\Controllers\Api\Seller\OrderController::class, 'index']);
    Route::get('/orders/{id}', [\App\Http\Controllers\Api\Seller\OrderController::class, 'show']);
    Route::put('/orders/{id}/status', [\App\Http\Controllers\Api\Seller\OrderController::class, 'updateStatus']);
});

Route::middleware(['auth:sanctum', 'role:admin'])->prefix('admin')->group(function () {

    Route::get('/sellers/pending', [AdminController::class, 'pendingSellers']);
    Route::post('/sellers/{id}/approve', [AdminController::class, 'approveSeller']);
    Route::post('/sellers/{id}/reject', [AdminController::class, 'rejectSeller']);

  
    Route::post('/categories', [AdminController::class, 'categoryStore']);
 
    Route::post('/products/{id}/approve', [AdminController::class, 'productApprove']);
    Route::post('/products/{id}/reject', [AdminController::class, 'productReject']);

    Route::get('/commission-settings', [AdminController::class, 'commissionIndex']);
    Route::post('/commission-settings', [AdminController::class, 'commissionStore']);
});
