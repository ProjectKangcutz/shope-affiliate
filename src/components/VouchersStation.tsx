import React, { useState } from 'react';
import { Voucher } from '../types.ts';

interface VouchersStationProps {
  vouchers: Voucher[];
  onCopyVoucher: (code: string) => void;
  onTrackClick: (productId: string, placement: string) => void;
}

export const VouchersStation: React.FC<VouchersStationProps> = ({
  vouchers,
  onCopyVoucher,
  onTrackClick,
}) => {
  const [copiedVoucherId, setCopiedVoucherId] = useState<string | null>(null);

  const handleClaim = (voucher: Voucher) => {
    onCopyVoucher(voucher.code);
    setCopiedVoucherId(voucher.id);
    onTrackClick(voucher.code, 'voucher_station');
    setTimeout(() => {
      setCopiedVoucherId(null);
    }, 2500);
  };

  return (
    <section className="w-full bg-[#f2f4f6] py-12 px-4 sm:px-8 border-y border-gray-200" id="vouchers-station">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-3">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#b22204] text-xl">confirmation_number</span>
              <span className="text-xs uppercase tracking-wider text-[#b22204] font-extrabold">
                Stack & Save More
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mt-0.5">
              Verified Shopee Voucher Codes
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Codes auto-verified every 30 minutes via Involve Asia feed. Click to copy and instantly apply in your Shopee cart.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl shadow-xs border border-gray-200">
            <span className="material-symbols-outlined text-emerald-700 text-base">check_circle</span>
            <span className="text-xs font-bold text-gray-800">
              Stackable with Free Shipping Vouchers
            </span>
          </div>
        </div>

        {/* 4 Voucher Ticket Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {vouchers.map((voucher) => {
            const isCopied = copiedVoucherId === voucher.id;
            return (
              <div
                key={voucher.id}
                className="relative bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-gray-200 flex flex-col justify-between overflow-hidden"
              >
                {/* Left & Right Ticket Cutouts */}
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#f2f4f6] rounded-full border-l border-gray-200"></div>
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#f2f4f6] rounded-full border-r border-gray-200"></div>

                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-black px-2 py-0.5 rounded ${
                        voucher.themeColor === 'primary'
                          ? 'bg-[#ffdad3] text-[#8d1600]'
                          : voucher.themeColor === 'tertiary'
                          ? 'bg-[#6ffbbe] text-[#005236]'
                          : 'bg-[#dae2fd] text-[#131b2e]'
                      }`}
                    >
                      {voucher.discountBadge}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700">
                      {voucher.successRate}
                    </span>
                  </div>

                  <h3
                    className={`text-2xl font-black mt-1 ${
                      voucher.themeColor === 'primary' ? 'text-[#b22204]' : 'text-emerald-800'
                    }`}
                  >
                    {voucher.title}
                  </h3>
                  <p className="text-xs font-bold text-gray-800">{voucher.subTitle}</p>
                  <p className="text-[11px] text-gray-500">{voucher.minSpendText}</p>
                </div>

                <div className="mt-5 flex flex-col gap-2">
                  <div className="bg-[#eceef0] px-3 py-2 rounded-xl text-center font-mono font-black text-xs text-gray-800 tracking-wider select-all border border-gray-200">
                    {voucher.code}
                  </div>
                  <button
                    onClick={() => handleClaim(voucher)}
                    className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all ${
                      isCopied
                        ? 'bg-emerald-600 text-white'
                        : voucher.themeColor === 'primary'
                        ? 'bg-[#b22204] hover:bg-[#d63c1e] text-white'
                        : 'bg-emerald-800 hover:bg-emerald-900 text-white'
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm">
                      {isCopied ? 'check' : 'content_copy'}
                    </span>
                    <span>{isCopied ? 'Code Copied! Open Shopee' : 'Copy & Claim'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
