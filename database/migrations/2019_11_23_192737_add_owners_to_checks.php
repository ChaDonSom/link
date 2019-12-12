<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use App\Check;
use App\Bill;
use App\User;

class AddOwnersToChecks extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('checks', function (Blueprint $table) {
            $table->bigInteger('owner_ref');
        });
        Schema::table('bills', function (Blueprint $table) {
            $table->bigInteger('owner_ref');
        });
        
        $user = User::first();
	if (!$user) return print("\nNo user, skipping owner assumption of checks/bills...\n");

        Check::all()->each(function ($check) use ($user) {
            $check->fill([ 'owner_ref' => $user->id ])->save();
        });
        Bill::all()->each(function ($bill) use ($user) {
            $bill->fill([ 'owner_ref' => $user->id ])->save();
        });
        $checks = Check::all()->count();
        $bills  = Bill::all()->count();
        
        print("\nUpdated $checks checks and $bills bills to point to first user, {$user->name}.\n");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('checks', function (Blueprint $table) {
            $table->dropColumn('owner_ref');
        });
        Schema::table('bills', function (Blueprint $table) {
            $table->dropColumn('owner_ref');
        });
        
        print("\nRemoved owners from all checks and bills.\n");
    }
}
