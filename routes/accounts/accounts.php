<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Accounts\AccountController;
use App\Http\Controllers\Accounts\AccountSubdomainController;


Route::middleware('auth')->group(function () {
    Route::prefix('accounts')->as('accounts.')->group(function () {
        Route::get('/create', [AccountController::class, 'create'])->name('create');
        Route::post('/subdomain', [AccountSubdomainController::class, 'show'])->name('subdomain');
    });
});
