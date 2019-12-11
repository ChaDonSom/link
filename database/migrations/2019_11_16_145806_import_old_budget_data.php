<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

use App\Old\Bill as OldBill;
use App\Old\Check as OldCheck;
use App\Bill;
use App\Check;

class ImportOldBudgetData extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $query = "SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME =  ?";
        $db = DB::select($query, ['legacy']);
        if (empty($db)) return print("\nNo legacy datbase.\n\n");

        Schema::table('checks', function (Blueprint $table) {
            $table->boolean('is_legacy')->default(false);
        });
        Schema::table('bills', function (Blueprint $table) {
            $table->boolean('is_legacy')->default(false);
        });
        
        $oldChecks = OldCheck::all();
        if ($oldChecks && $oldChecks->count()) {
            $oldChecks->each(function ($check) {
                Check::create([
                    'date'   => $check->date,
                    'amount' => $check->amount,
                    'is_legacy' => true,
                ]);
            });
        }
        
        $oldBills = OldBill::all();
        if ($oldBills && $oldBills->count()) {
            $oldBills->each(function ($bill) {
                Bill::create([
                   'date'   => $bill->date,
                   'amount' => $bill->amount,
                   'label'  => $bill->label,
                   'is_legacy' => true,
                ]);
            });
        }
        
        $countChecks = Check::where('is_legacy', true)->count();
        $countBills  = Bill::where('is_legacy', true) ->count();
        print("\nAdded $countChecks legacy checks and $countBills legacy bills.\n\n");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        $query = "SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME =  ?";
        $db = DB::select($query, ['legacy']);
        if (empty($db)) return print("\nNo legacy datbase.\n\n");
        
        $countChecks = Check::where('is_legacy', true)->count();
        $countBills  = Bill::where('is_legacy', true) ->count();
        Check::where('is_legacy', true)->each(function ($check) { $check->forceDelete(); });
        Bill::where('is_legacy', true) ->each(function ($bill)  { $bill ->forceDelete(); });
        
        Schema::table('checks', function (Blueprint $table) {
            $table->dropColumn('is_legacy');
        });
        
        print("\nRemoved $countChecks legacy checks and $countBills legacy bills.\n\n");
    }
}
