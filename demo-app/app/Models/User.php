<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    public $timestamps = false;

    protected $appends = ['avatar'];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
        ];
    }

    public function avatar(): Attribute
    {
        return Attribute::get(function () {
            return 'https://i.pravatar.cc/150?u='.md5($this->id);
        });
    }

    public function roles()
    {
        return $this->belongsToMany(Role::class);
    }
}
