import React from 'react';

export const TrustAndReviews: React.FC = () => {
  return (
    <section className="w-full bg-[#f7f9fb] py-14 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        {/* How We Pick */}
        <div className="flex flex-col gap-2 text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-wider text-[#b22204] font-extrabold">
            Zero Sponsored Bias
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
            How We Test, Verify & Select Every Product
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            We reject 94% of trending products. Only items that meet strict quality, verified customer sentiment, and unmanipulated price baselines make our hub.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-2xl shadow-xs border border-gray-100 flex flex-col gap-2">
            <div className="w-12 h-12 rounded-xl bg-[#ffdad3] flex items-center justify-center text-[#b22204]">
              <span className="material-symbols-outlined text-2xl">history_toggle_off</span>
            </div>
            <h3 className="text-base font-bold text-gray-900">Real Price History Tracking</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Sellers often artificially double prices before a campaign to make discounts look huge. Our database tracks 90-day pricing history to ensure genuine discounts.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-xs border border-gray-100 flex flex-col gap-2">
            <div className="w-12 h-12 rounded-xl bg-[#6ffbbe]/40 flex items-center justify-center text-[#005236]">
              <span className="material-symbols-outlined text-2xl">verified_user</span>
            </div>
            <h3 className="text-base font-bold text-gray-900">Store Reputation Standard</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              We only index merchants with a minimum 4.5+ star rating, 98% chat response rate, and proven track record of authentic warranty servicing.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-xs border border-gray-100 flex flex-col gap-2">
            <div className="w-12 h-12 rounded-xl bg-[#dae2fd] flex items-center justify-center text-[#131b2e]">
              <span className="material-symbols-outlined text-2xl">rate_review</span>
            </div>
            <h3 className="text-base font-bold text-gray-900">Hands-On Curator Testing</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Our team purchases viral trending products with our own funds. We evaluate build quality, durability, battery life, and true ergonomics before writing our notes.
            </p>
          </div>
        </div>

        {/* Real Shopper Reviews */}
        <div className="flex flex-col gap-4 pt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-gray-900">
              From Our Community of 250,000+ Smart Shoppers
            </h3>
            <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">verified</span> 100% Genuine Testimonials
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-2xl shadow-xs border border-gray-100 flex flex-col justify-between gap-3">
              <div className="flex flex-col gap-1.5">
                <div className="flex text-emerald-600 text-xs">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-sm material-symbols-fill">star</span>
                  ))}
                </div>
                <p className="text-xs text-gray-700 leading-relaxed">
                  "Saved ₱2,400 on the Sihoo chair just by copying the SHOPEEPICKS stacked voucher during midnight flash sale! Delivery was within 3 days. Incredible hub."
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#ffdad3] flex items-center justify-center font-bold text-[#b22204] text-xs">
                  MR
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900 leading-none">Marcus R.</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">Verified Telegram Member • Manila</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-xs border border-gray-100 flex flex-col justify-between gap-3">
              <div className="flex flex-col gap-1.5">
                <div className="flex text-emerald-600 text-xs">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-sm material-symbols-fill">star</span>
                  ))}
                </div>
                <p className="text-xs text-gray-700 leading-relaxed">
                  "I used to get scammed by fake flash discounts on Shopee. The price history feature on this site saved me from buying a fake marked-up mechanical keyboard."
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#dae2fd] flex items-center justify-center font-bold text-[#131b2e] text-xs">
                  KL
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900 leading-none">Kimberly L.</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">Software Engineer • Cebu City</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-xs border border-gray-100 flex flex-col justify-between gap-3">
              <div className="flex flex-col gap-1.5">
                <div className="flex text-emerald-600 text-xs">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-sm material-symbols-fill">star</span>
                  ))}
                </div>
                <p className="text-xs text-gray-700 leading-relaxed">
                  "The GaN charger recommendation was 100% accurate. Clean design, charges my phone and laptop simultaneously, and arrived with warranty registration."
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#6ffbbe]/40 flex items-center justify-center font-bold text-[#005236] text-xs">
                  DV
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900 leading-none">David V.</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">Tech Enthusiast • Davao</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Affiliate Transparency Shield Box */}
        <div className="bg-[#f2f4f6] p-4 sm:p-5 rounded-2xl shadow-xs border border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#b22204] shadow-xs flex-shrink-0">
              <span className="material-symbols-outlined text-xl">shield</span>
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-gray-900">
                100% Reader-Supported & Involve Asia Verified
              </h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                When you click our links and make a purchase on Shopee, we earn an affiliate commission via Involve Asia at absolutely no additional cost to you. You always get the lowest publicly available or exclusive voucher price.
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-[#b22204] whitespace-nowrap">
            FTC / DTI Compliant Disclosure →
          </span>
        </div>
      </div>
    </section>
  );
};
