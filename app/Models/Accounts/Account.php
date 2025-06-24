<?php

namespace App\Models\Accounts;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Account extends Model
{
    /** @use HasFactory<\Database\Factories\Accounts\AccountFactory> */
    use HasFactory;

    protected $fillable = [
        'business_name',
        'company_name',
        'database',
        'logo',
        'owner',
        'timezone_iana',
        'stripe_id',
        'address',
        'address1',
        'mobile',
        'phone',
        'city',
        'state',
        'zip',
        'country',
        'status',
    ];
}
