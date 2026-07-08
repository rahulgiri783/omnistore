<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Seller extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'store_name',
        'store_slug',
        'description',
        'logo',
        'banner',
        'kyc_status',
        'commission_rate',
        'bank_details_json',
    ];

    protected function casts(): array
    {
        return [
            'bank_details_json' => 'array',
            'commission_rate' => 'decimal:2',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function products()
    {
        return $this->hasMany(Product::class);
    }

    public function payouts()
    {
        return $this->hasMany(SellerPayout::class);
    }

    public function orders()
    {
        return $this->hasMany(SellerOrder::class);
    }
}
