import React, { useState } from 'react';
import { Product } from '../types.ts';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
  onTrackClick: (productId: string, placement: string) => void;
  onCopyVoucher: (code: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onTrackClick,
  onCopyVoucher,
}) => {
  const [selectedImage, setSelectedImage] = useState(product.mainImage);
  const [copiedCode, setCopiedCode] = useState(false);
  const [alertSet, setAlertSet] = useState(false);
  const [shared, setShared] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const handleCopyCode = () => {
    onCopyVoucher(product.voucherCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2200);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${product.name} - ₱${product.netPrice} Shopee Deal`,
        text: `Verified deal on Shopee Mall via ShopeePicks Involve Asia hub!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Blurred Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="relative min-h-screen sm:min-h-0 flex items-center justify-center p-2 sm:p-4 my-0 sm:my-6">
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-6xl overflow-hidden border border-gray-200 z-10 flex flex-col max-h-[92vh]">
          {/* 1. Modal Top Bar */}
          <div className="bg-[#f2f4f6] px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 flex-shrink-0">
            <div className="flex items-center gap-2 flex-wrap min-w-0">
              <nav className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                <span className="hover:text-[#b22204] cursor-pointer transition-colors capitalize">
                  {product.category}
                </span>
                <span className="material-symbols-outlined text-xs">chevron_right</span>
                <span className="hover:text-[#b22204] cursor-pointer transition-colors">
                  {product.brand}
                </span>
                <span className="material-symbols-outlined text-xs">chevron_right</span>
                <span className="font-bold text-gray-900 truncate max-w-[200px]">
                  {product.shortName}
                </span>
              </nav>
              <div className="inline-flex items-center gap-1 bg-[#006947] text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-xs">
                <span className="material-symbols-outlined text-xs">verified</span>
                <span>Curator Lab Tested • Official Shopee {product.storeBadge}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={handleShare}
                className="flex items-center gap-1 bg-white hover:bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border border-gray-200 active:scale-95"
              >
                <span className="material-symbols-outlined text-sm text-gray-500">
                  {shared ? 'done' : 'share'}
                </span>
                <span className="hidden sm:inline">{shared ? 'Link Copied!' : 'Share Deal'}</span>
              </button>
              <button
                onClick={() => setBookmarked(!bookmarked)}
                className={`flex items-center justify-center w-8 h-8 rounded-lg text-gray-700 transition-all border border-gray-200 active:scale-95 ${
                  bookmarked ? 'bg-amber-100 text-amber-700 border-amber-300' : 'bg-white hover:bg-gray-100'
                }`}
                title="Save Deal"
              >
                <span className="material-symbols-outlined text-base">
                  {bookmarked ? 'bookmark' : 'bookmark_border'}
                </span>
              </button>
              <button
                onClick={onClose}
                className="flex items-center justify-center w-8 h-8 rounded-lg bg-white hover:bg-red-50 hover:text-red-700 text-gray-600 transition-all border border-gray-200"
                title="Close Modal"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>
          </div>

          {/* Scrollable Inner Body */}
          <div className="p-4 sm:p-6 lg:p-8 flex flex-col gap-8 overflow-y-auto">
            {/* 2. Main Product & Buying Bar (Top Split Grid) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              {/* Left: Product Gallery Preview */}
              <div className="lg:col-span-5 flex flex-col gap-3">
                <div className="relative w-full aspect-square bg-[#f7f9fb] rounded-xl overflow-hidden shadow-xs border border-gray-200 flex items-center justify-center p-4 group">
                  {/* Floating Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                    <span className="bg-[#b22204] text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow-md uppercase tracking-wider flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">local_fire_department</span> -{product.discountPercent}% OFF
                    </span>
                    <span className="bg-white/95 backdrop-blur text-[#b22204] text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1 border border-gray-100">
                      <span className="material-symbols-outlined text-xs">verified</span> Shopee {product.storeBadge} Guarantee
                    </span>
                    <span className="bg-emerald-700 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs">
                      Lowest in 90 Days
                    </span>
                  </div>

                  <div className="absolute top-3 right-3 z-10">
                    <span className="bg-white/90 backdrop-blur rounded-full px-2 py-1 text-[10px] font-bold text-gray-600 flex items-center gap-1 shadow-xs border border-gray-100">
                      <span className="material-symbols-outlined text-xs text-[#b22204]">visibility</span> 4.2k viewing
                    </span>
                  </div>

                  {/* Main Preview Image */}
                  <img
                    src={selectedImage}
                    alt={product.name}
                    className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Thumbnail Selector */}
                {product.galleryImages && product.galleryImages.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {product.galleryImages.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(img)}
                        className={`aspect-square bg-gray-50 rounded-lg p-1 overflow-hidden transition-all border ${
                          selectedImage === img
                            ? 'ring-2 ring-[#b22204] border-[#b22204]'
                            : 'border-gray-200 hover:border-gray-400'
                        }`}
                      >
                        <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-contain" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Fast Spec Badges Grid */}
                <div className="grid grid-cols-2 gap-2 pt-1 text-xs text-gray-700">
                  <div className="flex items-center gap-2 bg-[#f2f4f6] p-2 rounded-lg">
                    <span className="material-symbols-outlined text-emerald-700 text-base">bolt</span>
                    <span className="font-semibold">65W Max Single Port</span>
                  </div>
                  <div className="flex items-center gap-2 bg-[#f2f4f6] p-2 rounded-lg">
                    <span className="material-symbols-outlined text-emerald-700 text-base">electric_bolt</span>
                    <span className="font-semibold">GaN 5th Gen Tech</span>
                  </div>
                  <div className="flex items-center gap-2 bg-[#f2f4f6] p-2 rounded-lg">
                    <span className="material-symbols-outlined text-emerald-700 text-base">security</span>
                    <span className="font-semibold">12-Mo Official Warranty</span>
                  </div>
                  <div className="flex items-center gap-2 bg-[#f2f4f6] p-2 rounded-lg">
                    <span className="material-symbols-outlined text-emerald-700 text-base">local_shipping</span>
                    <span className="font-semibold">Shopee Xpress 2-Day</span>
                  </div>
                </div>
              </div>

              {/* Right: Deal Title, Merchant Trust, Stacked Price, CTAs */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                {/* Seller info block */}
                <div className="flex flex-wrap items-center justify-between gap-2 bg-[#f2f4f6] px-3.5 py-2.5 rounded-xl border border-gray-200">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#b22204] flex items-center justify-center text-white font-black text-xs uppercase shadow-xs">
                      {product.brand.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-gray-900 text-xs sm:text-sm">
                          {product.storeName}
                        </span>
                        <span className="bg-[#b22204] text-white text-[9px] px-1.5 py-0.2 rounded font-black uppercase">
                          {product.storeBadge}
                        </span>
                        <span className="bg-emerald-100 text-emerald-800 text-[9px] px-1.5 py-0.2 rounded font-bold">
                          Preferred+
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-500 pt-0.5">
                        <span className="flex items-center text-[#b22204] font-bold">
                          <span className="material-symbols-outlined text-xs material-symbols-fill mr-0.5">star</span>
                          {product.storeRating}
                        </span>
                        <span>{product.storeRatingsCount} Ratings</span>
                        <span>{product.storeChatResponse} Chat Response</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-emerald-800 font-bold text-[11px] bg-white px-2 py-1 rounded-md shadow-xs border border-gray-200">
                    Verified Direct Merchant
                  </span>
                </div>

                {/* Product Title */}
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight leading-snug">
                    {product.name}
                  </h1>
                  {product.compatibilityNote && (
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                      Model: {product.modelCode || 'CCGAN65E5'} • {product.compatibilityNote}
                    </p>
                  )}
                </div>

                {/* Pricing Calculation Card */}
                <div className="bg-[#f2f4f6] p-4 sm:p-5 rounded-xl shadow-xs border border-gray-200 flex flex-col gap-3">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <span className="text-xs text-gray-500 uppercase tracking-wider font-bold">
                      Promo Deal Price
                    </span>
                    <span className="text-3xl sm:text-4xl text-[#b22204] font-black tracking-tight">
                      ₱{product.price.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-400 line-through font-semibold">
                      ₱{product.originalPrice.toLocaleString()}
                    </span>
                    <span className="bg-[#ffdad3] text-[#8d1600] text-xs px-2 py-0.5 rounded-full font-bold">
                      SAVE ₱{(product.originalPrice - product.price).toLocaleString()} (-{product.discountPercent}%)
                    </span>
                  </div>

                  {/* Rebates & Shipping tags */}
                  <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                    <span className="bg-white px-2.5 py-1 rounded-lg text-emerald-800 font-semibold flex items-center gap-1 shadow-xs border border-gray-100">
                      <span className="material-symbols-outlined text-sm">toll</span> +70 Shopee Coins Rebate
                    </span>
                    <span className="bg-white px-2.5 py-1 rounded-lg text-emerald-800 font-semibold flex items-center gap-1 shadow-xs border border-gray-100">
                      <span className="material-symbols-outlined text-sm">local_shipping</span> Free Shipping (Min. Spend ₱0)
                    </span>
                    <span className="bg-white px-2.5 py-1 rounded-lg text-gray-700 font-semibold flex items-center gap-1 shadow-xs border border-gray-100">
                      <span className="material-symbols-outlined text-sm">assignment_return</span> 7 Days Free Return
                    </span>
                  </div>

                  {/* Urgent Stock Progress Bar */}
                  <div className="bg-white p-3 rounded-xl flex flex-col gap-1.5 shadow-xs border border-gray-100">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#b22204] font-bold flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs animate-pulse">local_fire_department</span>
                        Only {product.stockLeft} left in stock at this promo price!
                      </span>
                      <span className="text-gray-500 font-semibold">{product.stockPercent}% Claimed</span>
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-[#d63c1e] to-[#b22204] h-full rounded-full transition-all duration-500"
                        style={{ width: `${product.stockPercent}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Stackable Voucher Selector Panel */}
                  <div className="bg-white p-3.5 rounded-xl flex flex-col gap-2.5 shadow-xs border border-gray-100">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-gray-900 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[#b22204] text-base">confirmation_number</span>
                        Stackable Vouchers Applied
                      </span>
                      <span className="text-emerald-700">2 Vouchers Active</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center justify-between bg-[#f2f4f6] p-2 rounded-lg border border-gray-200">
                        <div className="flex items-center gap-1.5 font-bold text-gray-800">
                          <span className="material-symbols-outlined text-emerald-700 text-sm">check_circle</span>
                          <span>{product.voucherCode}</span>
                        </div>
                        <span className="text-[#b22204] font-black">-₱{product.voucherDiscountValue} OFF</span>
                      </div>
                      <div className="flex items-center justify-between bg-[#f2f4f6] p-2 rounded-lg border border-gray-200">
                        <div className="flex items-center gap-1.5 font-bold text-gray-800">
                          <span className="material-symbols-outlined text-emerald-700 text-sm">check_circle</span>
                          <span>{product.brand} Store Follow</span>
                        </div>
                        <span className="text-[#b22204] font-black">-₱{product.storeVoucherValue} OFF</span>
                      </div>
                    </div>

                    {/* Net Effective Price Highlight */}
                    <div className="flex items-center justify-between pt-1 border-t border-gray-100">
                      <span className="text-xs text-gray-500 font-medium">Net Effective Checkout Price:</span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xs text-gray-400 font-semibold">
                          ₱{product.price} - ₱{product.voucherDiscountValue + product.storeVoucherValue} =
                        </span>
                        <span className="text-2xl font-black text-emerald-700">
                          ₱{product.netPrice}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Primary Outbound Action Buttons */}
                <div className="flex flex-col gap-2.5 pt-1">
                  <button
                    onClick={() => onTrackClick(product.id, 'modal_primary_buy')}
                    className="w-full bg-[#b22204] hover:bg-[#d63c1e] active:scale-[0.99] text-white py-3.5 px-6 rounded-xl text-base font-black flex items-center justify-center gap-2 shadow-lg shadow-[#b22204]/20 transition-all"
                  >
                    <span>Buy on Shopee for ₱{product.netPrice}</span>
                    <span className="font-normal text-xs opacity-90">(Involve Asia Tracking Deeplink)</span>
                    <span className="material-symbols-outlined text-lg">open_in_new</span>
                  </button>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                      onClick={handleCopyCode}
                      className="flex items-center justify-center gap-2 bg-[#f2f4f6] hover:bg-[#e6e8ea] text-gray-800 py-2.5 px-4 rounded-xl text-xs font-bold transition-all border border-gray-200 active:scale-95"
                    >
                      <span className="material-symbols-outlined text-base text-[#b22204]">
                        {copiedCode ? 'check' : 'content_copy'}
                      </span>
                      <span>{copiedCode ? 'Code Copied!' : `Copy Code: ${product.voucherCode}`}</span>
                    </button>
                    <button
                      onClick={() => setAlertSet(!alertSet)}
                      className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold transition-all border active:scale-95 ${
                        alertSet
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : 'bg-[#f2f4f6] hover:bg-[#e6e8ea] text-gray-800 border-gray-200'
                      }`}
                    >
                      <span className="material-symbols-outlined text-base text-gray-600">
                        {alertSet ? 'done' : 'notifications_active'}
                      </span>
                      <span>{alertSet ? 'Alert Active: ≤ ₱500' : 'Set Price Drop Alert'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. 90-Day Interactive Price History Graph Section */}
            <div className="bg-[#f2f4f6] p-4 sm:p-6 rounded-xl border border-gray-200 flex flex-col gap-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#b22204] text-xl">monitoring</span>
                  <h3 className="text-lg font-black text-gray-900">90-Day Verified Price History</h3>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-md">
                    Real Shopee Price Tracker
                  </span>
                </div>
                <div className="text-xs text-gray-500">
                  Updated 2 hours ago from Involve Asia Catalog API
                </div>
              </div>

              {/* Key Metrics Ribbon */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-white p-3.5 rounded-xl shadow-xs border border-gray-100 flex flex-col">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">All-Time Record Low</span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-xl font-black text-emerald-700">₱{product.recordLowPrice}</span>
                    <span className="text-[11px] text-gray-400">(During 6.6 Mega Sale)</span>
                  </div>
                </div>
                <div className="bg-white p-3.5 rounded-xl shadow-xs border border-gray-100 flex flex-col">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">90-Day Median Price</span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-xl font-black text-gray-900">₱{product.medianPrice}</span>
                    <span className="text-[11px] text-gray-400">(Typical Non-Sale)</span>
                  </div>
                </div>
                <div className="bg-white p-3.5 rounded-xl shadow-xs border border-gray-100 flex flex-col">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Current Deal Rating</span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-xl font-black text-[#b22204]">₱{product.price}</span>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded">
                      Great Buy: -39% vs Median
                    </span>
                  </div>
                </div>
              </div>

              {/* High-Fidelity SVG Chart */}
              <div className="bg-white p-4 sm:p-5 rounded-xl shadow-xs border border-gray-100 flex flex-col gap-3">
                <div className="flex items-center justify-between text-[11px] text-gray-400 font-bold">
                  <span>May 10</span>
                  <span>June 6 (6.6)</span>
                  <span>July 7 (7.7)</span>
                  <span>July 25 (Payday)</span>
                  <span>August 8 (8.8 Mega Live)</span>
                </div>

                <div className="relative w-full h-48 sm:h-56">
                  <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 800 220">
                    <defs>
                      <linearGradient id="priceGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#b22204" stopOpacity="0.25"></stop>
                        <stop offset="100%" stopColor="#b22204" stopOpacity="0.0"></stop>
                      </linearGradient>
                    </defs>
                    {/* Gridlines */}
                    <line stroke="#eceef0" strokeDasharray="4" strokeWidth="1" x1="0" x2="800" y1="30" y2="30"></line>
                    <line stroke="#eceef0" strokeDasharray="4" strokeWidth="1" x1="0" x2="800" y1="90" y2="90"></line>
                    <line stroke="#eceef0" strokeDasharray="4" strokeWidth="1" x1="0" x2="800" y1="150" y2="150"></line>
                    <line stroke="#eceef0" strokeWidth="1" x1="0" x2="800" y1="190" y2="190"></line>

                    {/* Y-Axis Labels */}
                    <text fill="#8f7069" fontFamily="Plus Jakarta Sans" fontSize="10" x="5" y="26">
                      ₱1,899 (Inflated MSRP)
                    </text>
                    <text fill="#565e74" fontFamily="Plus Jakarta Sans" fontSize="10" x="5" y="86">
                      ₱1,250 (Average Plateau)
                    </text>
                    <text fill="#565e74" fontFamily="Plus Jakarta Sans" fontSize="10" x="5" y="146">
                      ₱899 (Payday Deals)
                    </text>
                    <text fill="#006947" fontFamily="Plus Jakarta Sans" fontSize="10" fontWeight="bold" x="5" y="186">
                      ₱699 (Current Flash Deal)
                    </text>

                    {/* Area Fill */}
                    <polygon
                      fill="url(#priceGradient)"
                      points="
                        0,95
                        70,95
                        140,90
                        210,192
                        260,95
                        380,92
                        450,188
                        520,95
                        620,135
                        710,25
                        740,190
                        800,190
                        800,210
                        0,210
                      "
                    ></polygon>

                    {/* Polyline */}
                    <polyline
                      fill="none"
                      points="
                        0,95
                        70,95
                        140,90
                        210,192
                        260,95
                        380,92
                        450,188
                        520,95
                        620,135
                        710,25
                        740,190
                        800,190
                      "
                      stroke="#b22204"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                    ></polyline>

                    {/* Marked Data Points */}
                    <circle cx="210" cy="192" fill="#006947" r="5" stroke="#ffffff" strokeWidth="2"></circle>
                    <circle cx="450" cy="188" fill="#006947" r="5" stroke="#ffffff" strokeWidth="2"></circle>
                    <circle cx="710" cy="25" fill="#ba1a1a" r="5" stroke="#ffffff" strokeWidth="2"></circle>
                    <circle cx="800" cy="190" fill="#b22204" r="7" stroke="#ffffff" strokeWidth="2.5" className="animate-pulse"></circle>
                  </svg>

                  {/* Marker 1: Fake Spike */}
                  <div className="absolute top-2 right-24 hidden sm:flex items-center gap-1 bg-red-50 border border-red-200 px-2 py-1 rounded-md text-[10px] text-red-700 font-bold shadow-xs">
                    <span className="material-symbols-outlined text-xs text-red-600">warning</span>
                    <span>Pre-Sale Markup: ₱1,899 (Avoided)</span>
                  </div>

                  {/* Marker 2: Current price */}
                  <div className="absolute bottom-2 right-2 flex flex-col items-end">
                    <div className="bg-[#b22204] text-white px-2.5 py-1 rounded-lg text-xs font-black shadow-md flex items-center gap-1">
                      <span>NOW: ₱{product.price}</span>
                      <span className="material-symbols-outlined text-xs">south</span>
                    </div>
                  </div>
                </div>

                {/* Tracker Insight Note */}
                <div className="bg-[#f2f4f6] p-3 rounded-lg flex items-start gap-2.5 text-xs text-gray-700 border border-gray-200">
                  <span className="material-symbols-outlined text-emerald-700 text-base flex-shrink-0 mt-0.5">insights</span>
                  <p className="leading-relaxed">
                    <strong className="text-gray-900 font-bold">Curator Anti-Fake Discount Analysis: </strong>
                    {product.priceAnalysisNote}
                  </p>
                </div>
              </div>
            </div>

            {/* 4. Hands-on Curator Lab Review & Testing Verdict */}
            <div className="bg-[#f2f4f6] p-4 sm:p-6 rounded-xl border border-gray-200 flex flex-col gap-5">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#b22204] text-xl">biotech</span>
                    <h3 className="text-lg font-black text-gray-900">Hands-on Curator Lab Review</h3>
                  </div>
                  <p className="text-xs text-gray-500">72-hour benchmark testing in the Manila Gadget Lab</p>
                </div>

                {/* Score */}
                <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl shadow-xs border border-gray-200">
                  <div className="flex flex-col text-right">
                    <span className="text-[10px] font-extrabold text-emerald-800 uppercase">Curator Verdict</span>
                    <span className="text-xs font-bold text-gray-900">Editor's Choice GaN</span>
                  </div>
                  <div className="flex items-center gap-1 bg-[#b22204] text-white px-3 py-1 rounded-lg font-black text-lg">
                    <span>4.8</span>
                    <span className="text-xs font-normal opacity-80">/5</span>
                  </div>
                </div>
              </div>

              {/* Lab Test Results Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="bg-white p-3.5 rounded-xl shadow-xs border border-gray-100 flex flex-col gap-1">
                  <div className="flex items-center justify-between text-gray-500">
                    <span className="text-[10px] font-bold uppercase">Heat Dissipation</span>
                    <span className="material-symbols-outlined text-sm text-emerald-700">device_thermostat</span>
                  </div>
                  <span className="text-sm font-black text-gray-900">41°C Peak Temp</span>
                  <p className="text-[11px] text-gray-500 leading-tight">Sustained 65W load for 2 hours. Well below 65°C threshold.</p>
                </div>

                <div className="bg-white p-3.5 rounded-xl shadow-xs border border-gray-100 flex flex-col gap-1">
                  <div className="flex items-center justify-between text-gray-500">
                    <span className="text-[10px] font-bold uppercase">Charging Speed</span>
                    <span className="material-symbols-outlined text-sm text-[#b22204]">speed</span>
                  </div>
                  <span className="text-sm font-black text-gray-900">50% in 28 Mins</span>
                  <p className="text-[11px] text-gray-500 leading-tight">M2 MacBook Air tested from 0%. Full 100% capacity in 1 hr 14 mins.</p>
                </div>

                <div className="bg-white p-3.5 rounded-xl shadow-xs border border-gray-100 flex flex-col gap-1">
                  <div className="flex items-center justify-between text-gray-500">
                    <span className="text-[10px] font-bold uppercase">Protocol Support</span>
                    <span className="material-symbols-outlined text-sm text-emerald-700">power</span>
                  </div>
                  <span className="text-sm font-black text-gray-900">PD3.0 / QC4+ / PPS</span>
                  <p className="text-[11px] text-gray-500 leading-tight">Triggers 45W Super Fast Charging 2.0 on Samsung S23/S24.</p>
                </div>

                <div className="bg-white p-3.5 rounded-xl shadow-xs border border-gray-100 flex flex-col gap-1">
                  <div className="flex items-center justify-between text-gray-500">
                    <span className="text-[10px] font-bold uppercase">Portability Factor</span>
                    <span className="material-symbols-outlined text-sm text-gray-500">straighten</span>
                  </div>
                  <span className="text-sm font-black text-gray-900">59% Smaller</span>
                  <p className="text-[11px] text-gray-500 leading-tight">Compared directly against OEM standard Apple 67W single brick.</p>
                </div>
              </div>

              {/* Pros & Cons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl shadow-xs border border-gray-100 flex flex-col gap-2">
                  <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-base">thumb_up</span>
                    Curator Praises (Pros)
                  </span>
                  <ul className="flex flex-col gap-2 text-xs text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-emerald-700 text-sm mt-0.5">check</span>
                      <span><strong>Dynamic BPS II Power Split:</strong> Intelligently drops to 45W + 20W when plugging phone and laptop concurrently.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-emerald-700 text-sm mt-0.5">check</span>
                      <span><strong>Foldable Plug Prongs:</strong> Fits effortlessly into backpack pen-sleeves without scratching laptops.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-emerald-700 text-sm mt-0.5">check</span>
                      <span><strong>Free 100W E-Marker Cable:</strong> High quality braided cable included in box (saves extra ₱250).</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-xs border border-gray-100 flex flex-col gap-2">
                  <span className="text-xs font-bold text-red-600 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-base">thumb_down</span>
                    Points to Consider (Cons)
                  </span>
                  <ul className="flex flex-col gap-2 text-xs text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-red-600 text-sm mt-0.5">close</span>
                      <span><strong>Brief Power Reset:</strong> Disconnects for 1-2 seconds when a 2nd device is plugged in as chip renegotiates wattage.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-red-600 text-sm mt-0.5">close</span>
                      <span><strong>Faint Coil Noise:</strong> Minimal high-frequency buzz detectable in dead-silent rooms under 65W max load.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-red-600 text-sm mt-0.5">close</span>
                      <span><strong>3-Port Split:</strong> Plugging 3 items splits output to 45W + 15W shared, which slows simultaneous laptop charging.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Curator Signature */}
              <div className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-xs border border-gray-100">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1s4AOS9uIZ29Y_v9gF4UZxnd9M2Fc2HIsYusN-xTMj_FUyVzjFndyH0fO1_PHPAK66nyIHTiZZrk1Q0conBrffSlRW7xC7BCmGiJ4n6ZoEs104cC5H4R4JbbuDiQjmNf3yWisUO6ngXZQvbm_O2FGAHM923POVphw74rrHmlUdmptMaaKkOFtj3BvTG7fF0fzpHRewaTyzue10A9w8NHjnGkEouUoTG_G3uH-_186DjMdHrPMi3O05Q"
                  alt="David V."
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-200"
                />
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-gray-900">David V.</span>
                    <span className="text-[10px] text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded font-bold">
                      Lead Hardware Curator
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 leading-tight mt-0.5">
                    "If you are still carrying the bulky brick that came with your work laptop, this deal is an absolute no-brainer at ₱544 net. Tested and verified authentic Shopee Mall inventory."
                  </p>
                </div>
              </div>
            </div>

            {/* 5. Stackable Voucher Stacking Cheat-Sheet */}
            <div className="bg-[#f2f4f6] p-4 sm:p-6 rounded-xl border border-gray-200 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#b22204] text-xl">account_balance_wallet</span>
                <h3 className="text-lg font-black text-gray-900">Voucher Stacking Cheat-Sheet</h3>
                <span className="bg-white px-2 py-0.5 rounded text-xs text-gray-600 font-bold border border-gray-200">
                  How to get ₱544
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-white p-4 rounded-xl shadow-xs border border-gray-100 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="w-6 h-6 rounded-full bg-[#b22204] text-white flex items-center justify-center font-bold text-xs">1</span>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded">Platform Level</span>
                  </div>
                  <span className="text-xs font-bold text-gray-900">Claim Free Shipping ₱0 Min Spend</span>
                  <p className="text-[11px] text-gray-500 leading-relaxed">
                    Claim via the Shopee 8.8 Homepage voucher portal before checking out. Eliminates standard ₱55 delivery fee.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-xs border border-gray-100 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="w-6 h-6 rounded-full bg-[#b22204] text-white flex items-center justify-center font-bold text-xs">2</span>
                    <span className="text-[10px] font-bold text-[#b22204] bg-[#ffdad3] px-1.5 py-0.2 rounded">ShopeePicks Code</span>
                  </div>
                  <span className="text-xs font-bold text-gray-900">Apply '{product.voucherCode}'</span>
                  <p className="text-[11px] text-gray-500 leading-relaxed">
                    Input in the voucher promo box. Deducts 15% capped at ₱105 for tech & electronics category products.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-xs border border-gray-100 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="w-6 h-6 rounded-full bg-[#b22204] text-white flex items-center justify-center font-bold text-xs">3</span>
                    <span className="text-[10px] font-bold text-gray-700 bg-gray-200 px-1.5 py-0.2 rounded">Shop Follow Voucher</span>
                  </div>
                  <span className="text-xs font-bold text-gray-900">Collect {product.brand} Follow Voucher</span>
                  <p className="text-[11px] text-gray-500 leading-relaxed">
                    Click 'Follow' on the {product.brand} Official Mall landing page to redeem immediate ₱50 off voucher.
                  </p>
                </div>
              </div>

              {/* Total Calculation Breakdown Banner */}
              <div className="bg-white p-4 rounded-xl shadow-xs border border-gray-100 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-400 uppercase font-black tracking-wider">Final Calculation</span>
                  <span className="text-xs text-gray-800 font-semibold">
                    Original Retail (₱{product.originalPrice}) → Flash Deal (₱{product.price}) → Stacked Vouchers (-₱{product.voucherDiscountValue + product.storeVoucherValue})
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex flex-col text-right">
                    <span className="text-[10px] font-bold text-emerald-800">Total Accumulated Savings</span>
                    <span className="text-xl text-[#b22204] font-black">
                      ₱{(product.originalPrice - product.netPrice).toLocaleString()} Saved
                    </span>
                  </div>
                  <button
                    onClick={handleCopyCode}
                    className="bg-[#b22204] hover:bg-[#d63c1e] text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm transition-all"
                  >
                    <span>{copiedCode ? 'Codes Copied!' : 'Copy Code'}</span>
                    <span className="material-symbols-outlined text-sm">done_all</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 6. Verified Shopee Buyer Feedback */}
            <div className="bg-[#f2f4f6] p-4 sm:p-6 rounded-xl border border-gray-200 flex flex-col gap-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#b22204] text-xl">reviews</span>
                  <h3 className="text-lg font-black text-gray-900">Verified Shopee Buyer Feedback</h3>
                  <span className="bg-white px-2 py-0.5 rounded text-xs font-bold text-gray-800 border border-gray-200">
                    4.9 ★ (185k Shopee Mall reviews)
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <span className="material-symbols-outlined text-emerald-700 text-sm">verified</span>
                  <span>All reviews pulled from Shopee verified orders</span>
                </div>
              </div>

              {/* Review Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-white p-4 rounded-xl shadow-xs border border-gray-100 flex flex-col justify-between gap-3">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-900">m*****8 (Quezon City)</span>
                      <div className="flex text-[#b22204] text-xs">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="material-symbols-outlined text-xs material-symbols-fill">star</span>
                        ))}
                      </div>
                    </div>
                    <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">verified</span> Verified Buyer • 2 Days via Shopee Xpress
                    </span>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      "Legit Baseus! Super bilis mag-charge ng Dell XPS 13 ko and iPhone sabay. Hindi umiinit masyado unlike my generic charger before. Best 8.8 purchase so far."
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-gray-400">
                    <span className="material-symbols-outlined text-xs">photo_camera</span>
                    <span>Photo review verified</span>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-xs border border-gray-100 flex flex-col justify-between gap-3">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-900">krizza_tech (Cebu City)</span>
                      <div className="flex text-[#b22204] text-xs">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="material-symbols-outlined text-xs material-symbols-fill">star</span>
                        ))}
                      </div>
                    </div>
                    <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">verified</span> Verified Buyer • Shopee Mall Official
                    </span>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      "Tested with USB power meter: clean 64.2W sustained output on my MacBook Pro. Super compact design. Free 100W cable included is very thick and durable."
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-gray-400">
                    <span className="material-symbols-outlined text-xs">thumb_up</span>
                    <span>48 shoppers found this helpful</span>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-xs border border-gray-100 flex flex-col justify-between gap-3">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-900">j_delacruz92 (Pampanga)</span>
                      <div className="flex text-[#b22204] text-xs">
                        {[...Array(4)].map((_, i) => (
                          <span key={i} className="material-symbols-outlined text-xs material-symbols-fill">star</span>
                        ))}
                      </div>
                    </div>
                    <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">verified</span> Verified Buyer • Shopee Payday Sale
                    </span>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      "Awesome value with the ShopeePicks voucher! Arrived safely in bubble wrap. It does reset for 1 sec when plugging another phone, but that is normal for BPS chips."
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-gray-400">
                    <span className="material-symbols-outlined text-xs">thumb_up</span>
                    <span>21 shoppers found this helpful</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 7. Sticky Modal Action Footer Bar */}
          <div className="sticky bottom-0 bg-white/95 backdrop-blur-md px-4 sm:px-6 py-3.5 shadow-xl border-t border-gray-200 flex flex-wrap items-center justify-between gap-4 flex-shrink-0">
            <div className="flex items-center gap-2 text-gray-500 text-xs max-w-sm sm:max-w-md">
              <span className="material-symbols-outlined text-gray-400 text-base flex-shrink-0">shield</span>
              <p className="line-clamp-1">
                <strong>Affiliate Disclosure:</strong> ShopeePicks earns qualifying commission via Involve Asia at zero extra cost to you.
              </p>
            </div>

            <div className="flex items-center gap-4 ml-auto">
              <div className="flex flex-col text-right">
                <span className="text-xs text-gray-400">Deal: ₱{product.price}</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-xs text-emerald-800 font-bold">Net:</span>
                  <span className="text-2xl text-[#b22204] font-black leading-none">
                    ₱{product.netPrice}
                  </span>
                </div>
              </div>

              <button
                onClick={() => onTrackClick(product.id, 'modal_sticky_footer')}
                className="bg-[#b22204] hover:bg-[#d63c1e] active:scale-95 text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl shadow-md flex items-center gap-1.5 transition-all"
              >
                <span>Proceed to Shopee</span>
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
