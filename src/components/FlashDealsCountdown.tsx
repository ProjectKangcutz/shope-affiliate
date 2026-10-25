import React, { useState, useEffect } from 'react';
import { Product } from '../types.ts';

interface FlashDealsCountdownProps {
  flashProducts: Product[];
  onOpenProductModal: (product: Product) => void;
  onTrackClick: (productId: string, placement: string) => void;
}

export const FlashDealsCountdown: React.FC<FlashDealsCountdownProps> = ({
  flashProducts,
  onOpenProductModal,
  onTrackClick,
}) => {
  const [timeLeft, setTimeLeft] = useState(3 * 3600 + 24 * 60 + 18);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 12 * 3600));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <section className="w-full bg-[#eceef0]/70 py-12 px-4 sm:px-8 border-y border-gray-200">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        {/* Section Header with Realtime Countdown Clock */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white p-5 rounded-2xl shadow-xs border border-gray-100">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-[#ffdad3] flex items-center justify-center text-[#b22204]">
              <span className="material-symbols-outlined text-2xl material-symbols-fill">bolt</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-gray-900 leading-none">Midnight Flash Rush</h2>
                <span className="bg-[#b22204] text-white text-[11px] font-bold px-2 py-0.5 rounded-full uppercase animate-pulse">
                  Live
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Prices reset when timer reaches zero. Limited quantity vouchers auto-applied via Involve Asia affiliate tracking.
              </p>
            </div>
          </div>

          {/* Countdown Clock */}
          <div className="flex items-center gap-1.5 self-center sm:self-auto">
            <div className="flex flex-col items-center bg-[#f2f4f6] px-3.5 py-2 rounded-xl min-w-[56px] border border-gray-200">
              <span className="text-xl sm:text-2xl font-black text-[#b22204] leading-none">
                {pad(hours)}
              </span>
              <span className="text-[10px] font-bold text-gray-500 uppercase mt-1">HRS</span>
            </div>
            <span className="text-xl font-black text-[#b22204]">:</span>
            <div className="flex flex-col items-center bg-[#f2f4f6] px-3.5 py-2 rounded-xl min-w-[56px] border border-gray-200">
              <span className="text-xl sm:text-2xl font-black text-[#b22204] leading-none">
                {pad(minutes)}
              </span>
              <span className="text-[10px] font-bold text-gray-500 uppercase mt-1">MIN</span>
            </div>
            <span className="text-xl font-black text-[#b22204]">:</span>
            <div className="flex flex-col items-center bg-[#f2f4f6] px-3.5 py-2 rounded-xl min-w-[56px] border border-gray-200">
              <span className="text-xl sm:text-2xl font-black text-[#b22204] leading-none">
                {pad(seconds)}
              </span>
              <span className="text-[10px] font-bold text-gray-500 uppercase mt-1">SEC</span>
            </div>
          </div>
        </div>

        {/* 4-Column Flash Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {flashProducts.slice(0, 4).map((deal) => (
            <div
              key={deal.id}
              className="bg-white rounded-2xl shadow-xs border border-gray-100 p-4 flex flex-col justify-between hover:shadow-lg transition-all group"
            >
              <div className="flex flex-col gap-2.5">
                {/* Image */}
                <div
                  className="relative w-full h-48 bg-[#f7f9fb] rounded-xl overflow-hidden flex items-center justify-center cursor-pointer"
                  onClick={() => onOpenProductModal(deal)}
                >
                  <img
                    src={deal.mainImage}
                    alt={deal.name}
                    className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2 left-2 bg-[#b22204] text-white text-[10px] font-black px-2 py-0.5 rounded-lg">
                    -{deal.discountPercent}% OFF
                  </span>
                  <span className="absolute top-2 right-2 bg-white/95 text-gray-800 text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs">
                    {deal.storeBadge}
                  </span>
                </div>

                {/* Rating & Claimed */}
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <span className="text-emerald-700 flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-xs material-symbols-fill">star</span>
                    {deal.rating} ({deal.reviewsCount})
                  </span>
                  <span className="text-gray-500">{deal.stockPercent}% Claimed</span>
                </div>

                {/* Title */}
                <h3
                  onClick={() => onOpenProductModal(deal)}
                  className="text-sm font-bold text-gray-900 line-clamp-2 leading-tight hover:text-[#b22204] cursor-pointer transition-colors"
                >
                  {deal.name}
                </h3>

                {/* Prices */}
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-black text-[#b22204]">₱{deal.price.toLocaleString()}</span>
                  <span className="text-xs text-gray-400 line-through font-semibold">
                    ₱{deal.originalPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Progress & Outbound CTA */}
              <div className="mt-4 flex flex-col gap-2">
                <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#b22204] h-full rounded-full transition-all duration-500"
                    style={{ width: `${deal.stockPercent}%` }}
                  ></div>
                </div>
                <div className="grid grid-cols-2 gap-1.5 pt-1">
                  <button
                    onClick={() => onOpenProductModal(deal)}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-xl text-xs font-bold transition-colors"
                  >
                    Tracker
                  </button>
                  <button
                    onClick={() => onTrackClick(deal.id, 'flash_sales')}
                    className="w-full bg-[#b22204] hover:bg-[#d63c1e] text-white py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 shadow-xs transition-colors"
                  >
                    <span>Buy</span>
                    <span className="material-symbols-outlined text-xs">open_in_new</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
