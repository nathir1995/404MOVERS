<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\{Rides};
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class Checkride extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'checkride:cron';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        // return 0;
        try{
            $current_timestamp = Carbon::now()->format('Y-m-d h:i:s');
            $getrides = Rides::where('ride_end_time','<=',$current_timestamp)->where('status','0')->get();
            foreach($getrides as $key=>$updateride_status){
                $updaterides = Rides::where('id',$updateride_status->id)->update(['status'=>'3']);
            }
            Log::info("Ride expire successfully.");
        }catch(Exception $e){
            Log::info('Either something went wrong');
        }
    }
}
