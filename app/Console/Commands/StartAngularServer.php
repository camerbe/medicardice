<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Symfony\Component\Process\Process;

class StartAngularServer extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'angular:serve';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Start the Angular Universal server';


    /**
     * Execute the console command.
     */
    public function handle()
    {
        //
        $process = new Process([
            'node', base_path('angular-ssr/main.server.mjs')
        ]);
        $process->setTimeout(0);
        $process->run();
        $this->info('Angular Universal server started.');
        if (!$process->isSuccessful()) {
            return 1;
        }



    }
}
