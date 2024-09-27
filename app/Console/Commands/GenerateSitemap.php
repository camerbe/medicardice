<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Spatie\Sitemap\SitemapGenerator;
use Psr\Http\Message\UriInterface;

class GenerateSitemap extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sitemap:generate';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate the sitemap';

    /**
     * Execute the console command.
     */
    public function handle()
    {


        SitemapGenerator::create(config('app.url'))
            ->shouldCrawl(function (UriInterface $url) {
                $dontCrawl=['/register','/resetpassword','/modalLogin','/contact'];
                return in_array($url->getPath(),$dontCrawl)===false;
            })
            ->writeToFile(public_path('sitemap.xml'));
        $this->info('Sitemap generated successfully.');
    }
}
