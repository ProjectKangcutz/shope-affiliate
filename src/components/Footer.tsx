import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-200 text-gray-800 mt-12">
      {/* Top Banner Notice */}
      <div className="bg-[#f2f4f6] py-3.5 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-start md:items-center gap-2.5">
            <span className="material-symbols-outlined text-[#b22204] text-xl flex-shrink-0">policy</span>
            <p className="text-xs text-gray-600 leading-relaxed">
              <strong className="text-gray-900 font-semibold">Affiliate Transparency:</strong> As an Involve Asia verified publisher for Shopee, we earn qualifying commissions from purchases made through our links at no extra cost to you. Pricing, stock, and promo voucher availability are synced in real-time.
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Data Source</span>
            <span className="bg-gray-200 px-2 py-0.5 rounded text-[10px] font-bold text-gray-800">
              Involve Asia Product API
            </span>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-3 pr-0 lg:pr-6">
          <div className="flex items-center gap-2">
            <img
              alt="ShopeePicks Affiliate Logo"
              className="h-7 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida/AEtjO1XKE-XY4I90M61mEOWSiMj1OeBOkhszuuD7XSEcyRjm3WNEPl6H_7W1ssW-uJV6S4so1t0lqekavLaP87AnTmvXH4SzyRLvhUZ963ewuBhLVPS2o8z4W6CMWa2lY8um3y2Sl_uh0UbaaRil-vE1wCAPV2j83rE9lsuVw6mxyKxpnEx7HTeeMNnhI9f_YU67TJhSr4wGyGLOVsHVex1wFgeBdz9k8mmWbaSb1Pz5ONANap_MTUUVlfOZWA4"
            />
            <span className="text-lg font-black text-[#b22204]">ShopeePicks</span>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed">
            The premier curator of verified discounts, daily price drops, and stacked discount codes for smart shoppers across Southeast Asia. Every deal is manually verified by our team of shopping insiders.
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
              Verified Involve Asia Publisher
            </span>
            <span className="bg-gray-100 text-gray-700 text-[10px] font-bold px-2 py-0.5 rounded">
              Pub ID: PUB-894103
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Top Categories</h4>
          <ul className="flex flex-col gap-1.5 text-xs text-gray-500">
            <li className="hover:text-[#b22204] cursor-pointer transition-colors">Smartphone Accessories</li>
            <li className="hover:text-[#b22204] cursor-pointer transition-colors">Smart Kitchen Appliances</li>
            <li className="hover:text-[#b22204] cursor-pointer transition-colors">Korean Skincare Essentials</li>
            <li className="hover:text-[#b22204] cursor-pointer transition-colors">Ergonomic Desk Setups</li>
            <li className="hover:text-[#b22204] cursor-pointer transition-colors">Minimalist Streetwear</li>
          </ul>
        </div>

        <div className="flex flex-col gap-2">
          <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Voucher Guides</h4>
          <ul className="flex flex-col gap-1.5 text-xs text-gray-500">
            <li className="hover:text-[#b22204] cursor-pointer transition-colors">How to Stack 3 Vouchers</li>
            <li className="hover:text-[#b22204] cursor-pointer transition-colors">Free Shipping Claiming Schedule</li>
            <li className="hover:text-[#b22204] cursor-pointer transition-colors">ShopeePay Coins Cashback Tips</li>
            <li className="hover:text-[#b22204] cursor-pointer transition-colors">Midnight Flash Sale Cheatsheet</li>
            <li className="hover:text-[#b22204] cursor-pointer transition-colors">Brand Box Opening Deals</li>
          </ul>
        </div>

        <div className="flex flex-col gap-2">
          <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Community Hub</h4>
          <ul className="flex flex-col gap-1.5 text-xs text-gray-500">
            <li className="hover:text-[#b22204] cursor-pointer transition-colors">Telegram Broadcast (24/7)</li>
            <li className="hover:text-[#b22204] cursor-pointer transition-colors">Discord Deal Hunters</li>
            <li className="hover:text-[#b22204] cursor-pointer transition-colors">Curator Verification Portal</li>
            <li className="hover:text-[#b22204] cursor-pointer transition-colors">Report Expired Link</li>
            <li className="hover:text-[#b22204] cursor-pointer transition-colors">Affiliate Partnership Inquiries</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <p>© 2026 ShopeePicks. All rights reserved. Independent affiliate portal.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-[#b22204] cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-[#b22204] cursor-pointer transition-colors">Terms of Use</span>
            <span className="hover:text-[#b22204] cursor-pointer transition-colors">Affiliate Disclosure</span>
            <span className="hover:text-[#b22204] cursor-pointer transition-colors">Contact Team</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
