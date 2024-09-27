<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Sitemap\SitemapGenerator;
class SitmapController extends Controller
{
    //
    public function index(){
         SitemapGenerator::create('https://example.com')->writeToFile($path);
    }
}
