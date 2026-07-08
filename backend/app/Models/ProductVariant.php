<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductVariant extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'sku',
        'price',
        'stock_qty',
        'attributes_json',
    ];

    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'attributes_json' => 'array',
        ];
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
