<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use App\Models\Conversion;

class ConversionPostbackController extends Controller
{
    /**
     * Menangani webhook Server-to-Server (S2S) Postback dari Involve Asia
     */
    public function handlePostback(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'order_id'    => 'required|string',
            'sub_id1'     => 'nullable|string',
            'sub_id2'     => 'nullable|string',
            'sub_id3'     => 'nullable|string',
            'sale_amount' => 'required|numeric',
            'payout'      => 'required|numeric',
            'status'      => 'required|string',
            'currency'    => 'nullable|string',
        ]);

        Log::info("Involve Asia Postback diterima untuk Order ID: " . $validated['order_id']);

        // Simpan atau perbarui status konversi
        $conversion = Conversion::updateOrCreate(
            ['order_id' => $validated['order_id']],
            [
                'click_id'          => $validated['sub_id1'] ?? null,
                'sub_id1'           => $validated['sub_id1'] ?? null,
                'sub_id2'           => $validated['sub_id2'] ?? null,
                'sub_id3'           => $validated['sub_id3'] ?? null,
                'sale_amount'       => $validated['sale_amount'],
                'commission_amount' => $validated['payout'],
                'currency'          => $validated['currency'] ?? 'IDR',
                'status'            => strtolower($validated['status']),
                'raw_payload'       => json_encode($request->all()),
            ]
        );

        return response()->json([
            'status'  => 'success',
            'message' => 'Konversi berhasil diatribusikan ke sub_id1: ' . ($validated['sub_id1'] ?? 'direct'),
            'id'      => $conversion->id,
        ], 200);
    }
}