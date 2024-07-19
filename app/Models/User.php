<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Notifications\VerifyApiEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, Notifiable,HasApiTokens ,SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function roles():BelongsToMany{
        return $this->belongsToMany(Role::class);
    }
    public function hasRole($role):bool
    {
        return $this->roles()->where('role', $role)->exists();
    }
    public function hasPermission($permission):bool
    {
        return $this->roles()->whereHas('permissions', function ($query) use ($permission) {
            $query->where('permission_name', $permission);
        })->exists();
    }
    public function sendApiEmailVerificationNotification():void{
        $this->notify(new VerifyApiEmail());
    }
    public function patients():HasMany{
        return $this->hasMany(Patient::class);
    }
}
