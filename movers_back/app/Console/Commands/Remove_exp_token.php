<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Support\Facades\Artisan;

class Remove_exp_token extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'remove:token';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Remove Expire Tokens';

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
    public function handle(Schedule $schedule)
    {
        \Log::info("Cron Job is working");
        $command = 'auth:clear-resets';
        Artisan::call($command);
        
        // $schedule->command('auth:clear-resets')->everyFifteenMinutes();
        
        // $this->info('Expire Token Deleted Successfully!');
        // return 0;
    }
}
