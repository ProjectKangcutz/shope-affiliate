import React from 'react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  activeView: 'store' | 'involve-asia' | 'automation' | 'laravel';
  setActiveView: (view: 'store' | 'involve-asia' | 'automation' | 'laravel') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  onOpenSyncModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  activeView,
  setActiveView,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  onOpenSyncModal,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.06)] border-b border-gray-100">
      {/* Top Banner */}
      <div className="bg-[#b22204] text-white py-1.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-semibold">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">bolt</span>
            <span>⚡ 8.8 Mega Flash Sale Live! Up to 80% Off + Free Shipping Vouchers</span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-xs font-medium opacity-90">
            <span>Verified Price Drop Tracking</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse"></span>
              Auto-Updated Daily via Involve Asia API
            </span>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="h-20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-8 flex items-center justify-between gap-4">
          {/* Logo & Subtitle */}
          <div
            className="flex items-center gap-3 flex-shrink-0 cursor-pointer"
            onClick={() => setActiveView('store')}
          >
            <img
              alt="ShopeePicks Affiliate Logo"
              className="h-8 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida/AEtjO1XKE-XY4I90M61mEOWSiMj1OeBOkhszuuD7XSEcyRjm3WNEPl6H_7W1ssW-uJV6S4so1t0lqekavLaP87AnTmvXH4SzyRLvhUZ963ewuBhLVPS2o8z4W6CMWa2lY8um3y2Sl_uh0UbaaRil-vE1wCAPV2j83rE9lsuVw6mxyKxpnEx7HTeeMNnhI9f_YU67TJhSr4wGyGLOVsHVex1wFgeBdz9k8mmWbaSb1Pz5ONANap_MTUUVlfOZWA4"
            />
            <div className="flex flex-col">
              <span className="text-xl font-extrabold text-[#b22204] leading-none tracking-tight">
                ShopeePicks
              </span>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">
                Curated Deals Hub
              </span>
            </div>
          </div>

          {/* Search & Trending */}
          <div className="flex-1 max-w-2xl hidden lg:flex flex-col gap-1">
            <div className="flex items-center bg-[#f2f4f6] rounded-xl px-2 py-1.5 focus-within:bg-white focus-within:shadow-[0_0_0_2px_rgba(178,34,4,0.3)] transition-all">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-transparent text-gray-600 font-semibold text-xs px-2 border-r border-gray-300 focus:outline-none cursor-pointer"
              >
                <option value="all">All Categories</option>
                <option value="tech">Tech & Gadgets</option>
                <option value="home">Home & Living</option>
                <option value="beauty">Beauty & Fashion</option>
                <option value="kitchen">Kitchen & Dining</option>
              </select>
              <div className="flex-1 flex items-center px-2">
                <span className="material-symbols-outlined text-gray-400 text-lg mr-2">search</span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search verified Shopee deals, brands, or flash promo codes..."
                  className="w-full bg-transparent text-gray-900 text-xs placeholder:text-gray-400 focus:outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-gray-400 hover:text-gray-600 text-xs mr-1"
                  >
                    ✕
                  </button>
                )}
              </div>
              <button
                onClick={() => setActiveView('store')}
                className="bg-[#b22204] hover:bg-[#d63c1e] text-white px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
              >
                <span>Find Deals</span>
              </button>
            </div>
            {/* Trending tags */}
            <div className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap pt-0.5 text-xs">
              <span className="text-[11px] font-bold text-gray-500 flex items-center gap-0.5">
                <span className="material-symbols-outlined text-xs text-[#b22204]">local_fire_department</span> Trending:
              </span>
              {['Air Fryer', 'Mechanical Keyboard', 'GaN Charger', 'Centella Ampoule', 'Thermal Tumbler'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    setSearchQuery(tag);
                    setActiveView('store');
                  }}
                  className="text-[11px] font-semibold bg-[#eceef0] px-2.5 py-0.5 rounded-full text-gray-600 hover:bg-[#d63c1e] hover:text-white transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Engine & Action Buttons */}
          <div className="flex items-center gap-2.5 flex-shrink-0">
            {/* Engine Tabs */}
            <div className="bg-[#f2f4f6] p-1 rounded-xl flex items-center gap-1">
              <button
                onClick={() => setActiveView('store')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeView === 'store'
                    ? 'bg-white text-[#b22204] shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Deals Store
              </button>
              <button
                onClick={() => setActiveView('involve-asia')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                  activeView === 'involve-asia'
                    ? 'bg-[#b22204] text-white shadow-sm'
                    : 'text-gray-600 hover:text-[#b22204]'
                }`}
              >
                <span className="material-symbols-outlined text-sm">currency_exchange</span>
                <span>Conversions Hub</span>
              </button>
              <button
                onClick={() => setActiveView('automation')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                  activeView === 'automation'
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'text-gray-600 hover:text-emerald-700'
                }`}
              >
                <span className="material-symbols-outlined text-sm">sync</span>
                <span className="hidden sm:inline">Catalog Cron</span>
              </button>
              <button
                onClick={() => setActiveView('laravel')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                  activeView === 'laravel'
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-red-600'
                }`}
                title="View Laravel 11/12 Architecture & Controller Code"
              >
                <span className="font-mono text-[11px] font-black">PHP</span>
                <span className="hidden sm:inline">Laravel Code</span>
              </button>
            </div>

            {/* Telegram Deals button */}
            <a
              href="https://t.me"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden xl:flex items-center gap-1.5 bg-[#00855b] hover:bg-[#006947] text-white px-3.5 py-2 rounded-xl transition-colors text-xs font-bold shadow-sm"
            >
              <span className="material-symbols-outlined text-base">send</span>
              <span>Telegram Deals</span>
              <span className="bg-white text-[#006947] text-[10px] font-extrabold px-1.5 py-0.2 rounded-full uppercase leading-tight">
                Live
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Categories subnav */}
      <div className="bg-white/80 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <nav className="flex items-center gap-6 overflow-x-auto whitespace-nowrap text-xs font-bold py-1">
            {[
              { id: 'top-deals', label: 'Top Deals', category: 'all' },
              { id: 'flash-sales', label: 'Flash Sales', category: 'all' },
              { id: 'tech-gadgets', label: 'Tech & Gadgets', category: 'tech' },
              { id: 'home-living', label: 'Home & Living', category: 'home' },
              { id: 'beauty-fashion', label: 'Beauty & Fashion', category: 'beauty' },
              { id: 'kitchen-dining', label: 'Kitchen & Dining', category: 'kitchen' },
              { id: 'vouchers-codes', label: 'Vouchers & Codes', category: 'all' },
            ].map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSelectedCategory(item.category);
                    setActiveView('store');
                    if (item.id === 'vouchers-codes') {
                      const el = document.getElementById('vouchers-station');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className={`py-2 transition-colors flex items-center gap-1.5 ${
                    isActive
                      ? 'text-[#b22204] border-b-2 border-[#b22204]'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};
