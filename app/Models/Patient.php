<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Patient extends Model
{
    use HasFactory;

    protected $fillable = [
        'first_name',
        'last_name',
        'dob',
        'phone_number',
        'created_by',
        'updated_by',
        'user_id',
        'email',
        'password',
    ];
    public function user():BelongsTo{
        return $this->belongsTo(User::class);
    }
}
