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
     * @param string $signature
     */
    public function __construct()
    {
        parent::__construct();
    }


    /**
     * Execute the console command.
     */
    public function handle()
    {
        $output = shell_exec('public/angular-ssr/main.server.mjs');
        dd($output);
        $this->info($output);



    }
}
