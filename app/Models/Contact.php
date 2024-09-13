<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    use HasFactory;

    protected $fillable = [
        'photo',
        'contact_titre_fr',
        'contact_titre_en',
        'contact_msg_fr',
        'contact_msg_en',
        'contact_keyword_en',
        'contact_keyword_fr',
        'contact_description_en',
        'contact_description_fr',
        'contact_titre_en_slug',
        'contact_titre_fr_slug',

    ];
}
