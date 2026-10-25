import React from 'react';
import { Product } from '../types.ts';

interface HeroSpotlightProps {
  spotlightProduct: Product;
  onOpenProductModal: (product: Product) => void;
  onTrackClick: (productId: string, placement: string) => void;
}

export const HeroSpotlight: React.FC<HeroSpotlightProps> = ({
  spotlightProduct,
  onOpenProductModal,
  onTrackClick,
}) => {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#f2f4f6] via-[#f7f9fb] to-[#f7f9fb] px-4 sm:px-8 py-10 lg:py-14">
      {/* Decorative ambient subtle glows */}
      <div className="absolute -top-32 left-1/4 w-96 h-96 bg-[#ffdad3]/40 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 right-10 w-80 h-80 bg-[#dae2fd]/50 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-14">
        {/* Left Column: Value Prop & CTAs */}
        <div className="w-full lg:w-7/12 flex flex-col gap-5 text-left">
          <div className="inline-flex items-center gap-2 bg-white shadow-xs rounded-full px-3.5 py-1.5 w-fit border border-gray-100">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#b22204] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#b22204]"></span>
            </span>
            <span className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">
              Shopee 8.8 Mega Campaign • Involve Asia Affiliate Engine
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#191c1e] tracking-tight leading-[1.15]">
            Hand-Picked <span className="text-[#b22204] underline decoration-[#d63c1e] decoration-wavy decoration-2">Shopee Deals</span>, Real Reviews & Verified Vouchers
          </h1>

          <p className="text-sm sm:text-base text-gray-600 max-w-xl leading-relaxed">
            Never miss an authentic price drop. Our community lab rigorously stress-tests viral gadgets and home finds, filtering out fake markups to give you direct affiliate savings and stacked promo codes.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <a
              href="#curated-grid"
              className="inline-flex items-center gap-2 bg-[#b22204] hover:bg-[#d63c1e] text-white font-bold text-sm px-5 py-3 rounded-xl shadow-md transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>🔥 Browse Today's Top 50 Picks</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </a>
            <a
              href="#vouchers-station"
              className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-800 font-bold text-sm px-5 py-3 rounded-xl shadow-xs border border-gray-200 transition-all"
            >
              <span className="material-symbols-outlined text-[#006947] text-base">confirmation_number</span>
              <span>Claim Exclusive Vouchers</span>
            </a>
          </div>

          {/* Trust Statistics Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
            <div className="flex flex-col bg-white p-3 rounded-xl shadow-xs border border-gray-100">
              <span className="text-xl sm:text-2xl text-[#b22204] font-black leading-none">250K+</span>
              <span className="text-xs text-gray-500 mt-1">Monthly Shoppers</span>
            </div>
            <div className="flex flex-col bg-white p-3 rounded-xl shadow-xs border border-gray-100">
              <div className="flex items-center gap-1">
                <span className="text-xl sm:text-2xl text-gray-900 font-black leading-none">4.9</span>
                <span className="material-symbols-outlined text-emerald-600 text-sm material-symbols-fill">star</span>
              </div>
              <span className="text-xs text-gray-500 mt-1">Verified TrustScore</span>
            </div>
            <div className="flex flex-col bg-white p-3 rounded-xl shadow-xs border border-gray-100">
              <span className="text-xl sm:text-2xl text-gray-900 font-black leading-none">1,200+</span>
              <span className="text-xs text-gray-500 mt-1">Active Deal Catalog</span>
            </div>
            <div className="flex flex-col bg-white p-3 rounded-xl shadow-xs border border-gray-100">
              <span className="text-xl sm:text-2xl text-emerald-700 font-black leading-none">5m ago</span>
              <span className="text-xs text-gray-500 mt-1">Auto-Synced Delta</span>
            </div>
          </div>
        </div>

        {/* Right Column: Viral Spotlight Deal Hero Card */}
        <div className="w-full lg:w-5/12">
          <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden p-4 sm:p-5 flex flex-col gap-3.5 border border-gray-100 transition-all hover:shadow-2xl">
            {/* Spotlight Badge Strip */}
            <div className="flex items-center justify-between">
              <span className="bg-[#b22204] text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs">
                <span className="material-symbols-outlined text-xs">local_fire_department</span> #1 VIRAL TECH FIND
              </span>
              <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">verified</span> Official Shopee Mall
              </span>
            </div>

            {/* Product Image View with click to zoom/modal */}
            <div
              className="relative w-full h-64 sm:h-72 rounded-xl overflow-hidden bg-[#f2f4f6] flex items-center justify-center group cursor-pointer"
              onClick={() => onOpenProductModal(spotlightProduct)}
            >
              <img
                src={spotlightProduct.mainImage}
                alt={spotlightProduct.name}
                className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-3 left-3 bg-[#b22204] text-white text-xs font-black px-2.5 py-1 rounded-lg shadow-md">
                -63% OFF
              </div>
              <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-gray-800 text-[11px] font-bold flex items-center gap-1 shadow-xs">
                <span className="material-symbols-outlined text-[#b22204] text-sm">schedule</span> Price valid: 3h remaining
              </div>
              <div className="absolute bottom-3 right-3 bg-gray-900/80 text-white text-[10px] font-bold px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">visibility</span> Open Price Tracker
              </div>
            </div>

            {/* Card Info Details */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                <span className="text-emerald-700 flex items-center">
                  <span className="material-symbols-outlined text-xs material-symbols-fill mr-0.5">star</span> 4.95 (4.8k reviews)
                </span>
                <span>•</span>
                <span className="text-[#b22204] font-semibold">⚡ 42 Sold this hour</span>
              </div>
              <h2
                onClick={() => onOpenProductModal(spotlightProduct)}
                className="text-lg font-bold text-gray-900 leading-tight hover:text-[#b22204] cursor-pointer transition-colors"
              >
                Baseus 65W GaN5 Pro Ultra-Fast Charger (Dual Type-C + USB)
              </h2>
              <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                Verified by ShopeePicks tech team: Powers M2 MacBook Air to 50% in 28 mins with 0 heating issues. Fully supports Samsung Super Fast Charging 2.0.
              </p>
            </div>

            {/* Pricing & Stock Meter */}
            <div className="flex flex-col gap-2 bg-[#f2f4f6] p-3 rounded-xl">
              <div className="flex items-baseline justify-between">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-[#b22204]">₱699</span>
                  <span className="text-xs text-gray-400 line-through font-semibold">₱1,899</span>
                </div>
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                  Save ₱1,200 (-63%)
                </span>
              </div>

              {/* Progress Stock Bar */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-[11px] font-bold text-gray-600">
                  <span>Claimed: 89%</span>
                  <span className="text-[#b22204]">Only 14 left in stock</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-[#d63c1e] to-[#b22204] h-full rounded-full transition-all duration-700 w-[89%]"></div>
                </div>
              </div>
            </div>

            {/* Dual CTAs: Detail Modal & Buy via Involve Asia Deeplink */}
            <div className="grid grid-cols-2 gap-2 pt-0.5">
              <button
                onClick={() => onOpenProductModal(spotlightProduct)}
                className="w-full bg-[#f2f4f6] hover:bg-[#e6e8ea] text-gray-900 py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-gray-200"
              >
                <span className="material-symbols-outlined text-sm text-[#b22204]">insights</span>
                <span>Price Tracker & Lab</span>
              </button>
              <button
                onClick={() => onTrackClick(spotlightProduct.id, 'hero_spotlight')}
                className="w-full bg-[#b22204] hover:bg-[#d63c1e] text-white py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all"
              >
                <span>Get on Shopee</span>
                <span className="material-symbols-outlined text-sm">open_in_new</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
