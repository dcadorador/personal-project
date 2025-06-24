<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('accounts', function (Blueprint $table) {
            $table->id();
            $table->string('business_name');
            $table->string('company_name');
            $table->string('database');
            $table->string('logo')->nullable();
            $table->foreignId('owner')->constrained('users')->cascadeOnDelete();
            $table->string('timezone_iana')->default('UTC');
            $table->string('stripe_id')->nullable()->index();
            $table->string('address')->nullable();
            $table->string('address1')->nullable();
            $table->string('mobile')->nullable();
            $table->string('phone')->nullable();
            $table->string('city')->nullable();
            $table->string('state')->nullable();
            $table->string('zip')->nullable();
            $table->string('country')->nullable();
            $table->boolean('status')->default(true)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('accounts');
    }
};
