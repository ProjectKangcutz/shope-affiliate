<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\InvolveAsiaService;

class SyncShopeeCatalogCommand extends Command
{
    protected $signature = 'shopee:sync-catalog';
    protected $description = 'Otomasi update katalog produk Shopee & Price History via Involve Asia API';

    public function handle(InvolveAsiaService $involveAsia): int
    {
        $this->info("Mengambil feed produk dari Involve Asia...");
        $result = $involveAsia->syncProductCatalog();

        $this->info("Sinkronisasi katalog berhasil!");
        $this->table(
            ['Metrik', 'Nilai'],
            [
                ['Produk Di-update', $result['products_synced']],
                ['Penurunan Harga', $result['price_drops']],
                ['Waktu Eksekusi', $result['synced_at']],
            ]
        );

        return Command::SUCCESS;
    }
}