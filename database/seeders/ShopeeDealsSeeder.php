<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\PriceHistory;

class ShopeeDealsSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            [
                'sku' => 'baseus-65w-gan5',
                'name' => 'Baseus 65W GaN5 Pro Ultra-Fast Charger (Dual Type-C + USB)',
                'category' => 'tech',
                'brand' => 'Baseus',
                'price' => 199000,
                'original_price' => 540000,
                'discount_percent' => 63,
                'record_low_price' => 189000,
                'shopee_url' => 'https://shopee.co.id/product/268482083/17859382103',
                'voucher_code' => 'SHOPEEPICKS15',
                'voucher_discount' => 30000,
                'stock_left' => 14,
                'main_image' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTzOx5upRApAAwtROoQ6x1ysyadNzFYzNyw4UmDWFlk9NzDfFL-8sQ42UuaMKUIxjO2E64IPNW-5ydDvfg0vjxfvOGl8fUS3KNB5fOwb7jJd-hZmAv3MwyoqY9P_PM0tDCSc3MJ_TENmwta57Kxi-Kuro6xrppXHPtMN5gq9sJU6CoqTrwqK_k273Q43OoFG_ZvUwFNBQv_IjjNToGomwyWz2L1FJNblO9zoEZ4qrwojw6bBmhAdPlYA',
            ],
            [
                'sku' => 'sihoo-m57',
                'name' => 'Sihoo M57 Ergonomic Breathable Mesh Chair Kursi Kerja',
                'category' => 'home',
                'brand' => 'Sihoo',
                'price' => 1199000,
                'original_price' => 2600000,
                'discount_percent' => 54,
                'record_low_price' => 1150000,
                'shopee_url' => 'https://shopee.co.id/product/142940291/8920194829',
                'voucher_code' => 'SIHOO100',
                'voucher_discount' => 100000,
                'stock_left' => 22,
                'main_image' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHR5-yVU_9-lgUlCq2fgOpzmSIhUZthGMW-QhMGIr8ZRwRlubvihRB-oW_z1TAH-3AFsOr9MYixoFfiWq0fOV3JuuaFgrcigbkSGBzlXQx1zq3GP5MsxY-ahEs8oKgQDiLSb5ZNtVOlK7hRTJzm48PJVYLV9aYj120zIlBPw7Wka465HNvo3HXG3TBPj96RUsdTGYbkrCcadE-6kwK6L-xDgR9pBYcJRWqZ5rgOvCdrSrszl65idAcVQ',
            ],
            [
                'sku' => 'gaabor-airfryer-55',
                'name' => 'Gaabor Visual 5.5L Digital Touchscreen Air Fryer Multi-Cooker',
                'category' => 'kitchen',
                'brand' => 'Gaabor',
                'price' => 369000,
                'original_price' => 980000,
                'discount_percent' => 62,
                'record_low_price' => 350000,
                'shopee_url' => 'https://shopee.co.id/product/38291048/2019481928',
                'voucher_code' => 'KITCHEN50',
                'voucher_discount' => 50000,
                'stock_left' => 31,
                'main_image' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmkLRpZLUO_QeCqY7Mhg5ZqG7comnwnLCQp2oBPiTuyO_9rs-_vHI3j-2NFNRl4nx-j6elV2gWAjdBi1bwl0_QID3Hu-eb37aG-Gopl_2R9T62ot52V7013w4npWuP2na8qL6saFsmkFL1SeZcye5GS8AjUdR3D5uQtSu446CARTjuvFg8BfHi31HLUa0apb1G1rp3GMDZ32TvoYkbYu6WwEOj2meUb-RbXKcgAIESaYM1YMSw7mD2KQ',
            ],
            [
                'sku' => 'retro-rgb-keyboard',
                'name' => 'Retro Hot-Swappable RGB Mechanical Keyboard Tri-Mode Wireless',
                'category' => 'tech',
                'brand' => 'Royal Kludge',
                'price' => 329000,
                'original_price' => 910000,
                'discount_percent' => 64,
                'record_low_price' => 320000,
                'shopee_url' => 'https://shopee.co.id/product/58291048/1920491829',
                'voucher_code' => 'MECHKEY100',
                'voucher_discount' => 30000,
                'stock_left' => 7,
                'main_image' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqo2qvshlXtBaQgFktOGrAO3yBBU6GsTmO3ohEWlXiq7hYLX8uD8Z8Vp9V9mtHKNevjQ2QENiqtbWz9tbwnVFhm7d6C7EAdhWKy41kwCmvWvHzc10dLjWUFTExCnFplUfvFyxqopDW5KDDJMqjq6AknIYAr-_JS9IXIwCDJqxopS-3zygJv21Pyz1apXGqNQv4fgWvrOJ9HaAJbypYMbvmxRfk1OUcFE2Y1u5Fg5miKkzrNTeFvFcFlA',
            ]
        ];

        foreach ($products as $data) {
            $p = Product::create($data);
            PriceHistory::create([
                'product_id' => $p->id,
                'price' => $p->price,
                'is_lowest' => true,
                'recorded_at' => now(),
            ]);
        }
    }
}