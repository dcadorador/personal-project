<?php

namespace App\Http\Controllers\Accounts;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Accounts\Account;

class AccountSubdomainController extends Controller
{
    //
    public function show(Request $request)
    {
        $subdomain = $request->input('subdomain');

        $exists = Account::where('subdomain', $subdomain)->exists();

        if ($exists) {
            return Inertia::json([
                'status' => false,
                'message' => 'Subdomain already exists.',
            ]);
        }

        return Inertia::json([
            'status' => true,
            'message' => 'Subdomain is available.',
        ]);
    }
}
