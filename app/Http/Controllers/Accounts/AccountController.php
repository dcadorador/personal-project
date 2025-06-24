<?php

namespace App\Http\Controllers\Accounts;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Accounts\Account;
use App\Models\State;
use Inertia\Inertia;
use Illuminate\Support\Facades\Cache;

class AccountController extends Controller
{
    //
    public function index(Request $request)
    {

    }

    public function create(Request $request)
    {
        return Inertia::render('Accounts/Create', [
            'user' => $request->user(),
            'states' => Cache::rememberForever('states', function () {
                return State::all();
            }),
        ]);
    }

    public function store(Request $request)
    {

    }

    public function show(Request $request, Account $account)
    {

    }
}
