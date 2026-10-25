import React, { useState } from 'react';
import { Product } from '../types.ts';

interface CuratedDealsGridProps {
  products: Product[];
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  onOpenProductModal: (product: Product) => void;
  onTrackClick: (productId: string, placement: string) => void;
  onCopyVoucher: (code: string) => void;
}

export const CuratedDealsGrid: React.FC<CuratedDealsGridProps> = ({
  products,
  selectedCategory,
  setSelectedCategory,
  onOpenProductModal,
  onTrackClick,
  onCopyVoucher,
}) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onCopyVoucher(code);
    setCopiedCode(code);
    setTimeout(() => {
      setCopiedCode(null);
    }, 2000);
  };

  const categories = [
    { id: 'all', label: 'All Picks' },
    { id: 'tech', label: '💻 Tech & Gadgets' },
    { id: 'home', label: '🏡 Home & Living' },
    { id: 'beauty', label: '💄 Beauty & Skincare' },
    { id: 'kitchen', label: '🍳 Kitchen & Dining' },
  ];

  return (
    <section className="w-full py-12 px-4 sm:px-8 bg-[#f7f9fb]" id="curated-grid">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        {/* Header & Filter Pills */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-wider text-[#b22204] font-extrabold">
              Tested & Evaluated
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
              Curated Affiliate Picks for Today
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Direct official links with verified stackable coin vouchers & merchant authenticity checks.
            </p>
          </div>

          {/* Filter Pills Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap shadow-xs transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-gray-900 text-white shadow-sm'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 6+ Card Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-xs border border-gray-200 p-4 sm:p-5 flex flex-col justify-between hover:shadow-xl transition-all group"
            >
              <div className="flex flex-col gap-3">
                {/* Product Image */}
                <div
                  className="relative w-full h-56 bg-[#f7f9fb] rounded-xl overflow-hidden flex items-center justify-center cursor-pointer"
                  onClick={() => onOpenProductModal(item)}
                >
                  <img
                    src={item.mainImage}
                    alt={item.name}
                    className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2 left-2 bg-[#b22204] text-white text-[10px] font-black px-2 py-0.5 rounded-lg shadow-xs">
                    -{item.discountPercent}%
                  </span>
                  <span className="absolute top-2 right-2 bg-emerald-700 text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-0.5 shadow-xs">
                    <span className="material-symbols-outlined text-[10px]">workspace_premium</span>
                    {item.storeBadge}
                  </span>
                  <div className="absolute bottom-2 right-2 bg-black/75 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">analytics</span>
                    <span>View 90d Price History</span>
                  </div>
                </div>

                {/* Sub-Badges */}
                <div className="flex items-center gap-2">
                  <span className="bg-[#eceef0] text-gray-700 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                    {item.category.toUpperCase()}
                  </span>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-xs">toll</span>
                    +{item.coinRebatePercent || 10}% Coins
                  </span>
                  {item.freeShipping && (
                    <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded">
                      Free Shipping
                    </span>
                  )}
                </div>

                {/* Product Title */}
                <h3
                  onClick={() => onOpenProductModal(item)}
                  className="text-base font-bold text-gray-900 leading-snug hover:text-[#b22204] cursor-pointer transition-colors"
                >
                  {item.name}
                </h3>

                {/* Curator Review Snippet */}
                <div
                  className="bg-[#f2f4f6] p-2.5 rounded-xl cursor-pointer hover:bg-[#e6e8ea] transition-colors"
                  onClick={() => onOpenProductModal(item)}
                >
                  <p className="text-xs text-gray-600 italic leading-relaxed">
                    <strong className="text-gray-900 font-bold not-italic">Curator Review: </strong>
                    "{item.curatorSummary}"
                  </p>
                </div>
              </div>

              {/* Pricing & Outbound Affiliate CTAs */}
              <div className="mt-4 flex flex-col gap-3">
                <div className="flex items-baseline justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-[#b22204]">₱{item.price.toLocaleString()}</span>
                    <span className="text-xs text-gray-400 line-through font-semibold">
                      ₱{item.originalPrice.toLocaleString()}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-emerald-700">
                    {item.rating} ★ ({item.reviewsCount} reviews)
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={(e) => handleCopy(item.voucherCode, e)}
                    className="bg-[#f2f4f6] hover:bg-[#e6e8ea] text-gray-800 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-colors border border-gray-200"
                  >
                    <span className="material-symbols-outlined text-sm">
                      {copiedCode === item.voucherCode ? 'check' : 'content_copy'}
                    </span>
                    <span>
                      {copiedCode === item.voucherCode ? 'Copied!' : `Code: ${item.voucherCode}`}
                    </span>
                  </button>

                  <button
                    onClick={() => onTrackClick(item.id, 'curated_grid')}
                    className="bg-[#b22204] hover:bg-[#d63c1e] text-white py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1 shadow-sm transition-all"
                  >
                    <span>Buy on Shopee</span>
                    <span className="material-symbols-outlined text-sm">arrow_outward</span>
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
