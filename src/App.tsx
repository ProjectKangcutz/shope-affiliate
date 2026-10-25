import React, { useState, useEffect } from 'react';
import { Header } from './components/Header.tsx';
import { HeroSpotlight } from './components/HeroSpotlight.tsx';
import { FlashDealsCountdown } from './components/FlashDealsCountdown.tsx';
import { CuratedDealsGrid } from './components/CuratedDealsGrid.tsx';
import { VouchersStation } from './components/VouchersStation.tsx';
import { TrustAndReviews } from './components/TrustAndReviews.tsx';
import { NewsletterTelegram } from './components/NewsletterTelegram.tsx';
import { Footer } from './components/Footer.tsx';
import { ProductDetailModal } from './components/ProductDetailModal.tsx';
import { InvolveAsiaDashboard } from './components/InvolveAsiaDashboard.tsx';
import { CatalogAutomationView } from './components/CatalogAutomationView.tsx';
import { LaravelCodebaseView } from './components/LaravelCodebaseView.tsx';
import { Product, Voucher } from './types.ts';
import { INITIAL_PRODUCTS, INITIAL_VOUCHERS } from './data/catalog.ts';

export default function App() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [vouchers, setVouchers] = useState<Voucher[]>(INITIAL_VOUCHERS);
  const [activeView, setActiveView] = useState<'store' | 'involve-asia' | 'automation' | 'laravel'>('store');
  const [activeTab, setActiveTab] = useState<string>('top-deals');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeProductModal, setActiveProductModal] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fetchCatalog = async () => {
    try {
      const res = await fetch(`/api/catalog?category=${selectedCategory}&search=${encodeURIComponent(searchQuery)}`);
      if (res.ok) {
        const data = await res.json();
        if (data.products && data.products.length > 0) {
          setProducts(data.products);
        }
        if (data.vouchers) {
          setVouchers(data.vouchers);
        }
      }
    } catch (e) {
      console.warn('Backend catalog API offline or starting up, using local state.', e);
    }
  };

  useEffect(() => {
    fetchCatalog();
  }, [selectedCategory, searchQuery]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Involve Asia Click Tracking & Redirect
  const handleTrackClick = async (productId: string, placement: string) => {
    try {
      const res = await fetch('/api/track-click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId,
          placement,
          customSubId: `usr_web_${Date.now().toString().slice(-4)}`,
        }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(`⚡ Involve Asia Tracking Activated! (Sub-ID: ${data.subIds.sub1})`);
        // Open destination
        if (data.deeplink) {
          window.open(data.deeplink, '_blank');
        }
      }
    } catch (err) {
      showToast('Redirecting to Shopee via Involve Asia affiliate tracking...');
      window.open('https://shopee.ph', '_blank');
    }
  };

  const handleCopyVoucher = (code: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code);
    }
    showToast(`✓ Voucher "${code}" copied! Paste in your Shopee cart to save.`);
  };

  // Find spotlight product (Baseus GaN5 or first product)
  const spotlightProduct = products.find((p) => p.id === 'baseus-65w-gan5') || products[0];

  // Filter products for the curated grid
  const filteredProducts = products.filter((p) => {
    if (selectedCategory !== 'all' && p.category !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.voucherCode.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="w-full bg-[#f7f9fb] min-h-screen text-[#191c1e] antialiased flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-bold border border-gray-700 animate-slide-up">
          <span className="material-symbols-outlined text-emerald-400 text-base">check_circle</span>
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Global Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeView={activeView}
        setActiveView={setActiveView}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        onOpenSyncModal={() => setActiveView('automation')}
      />

      {/* Main Content Area */}
      <main className="w-full pt-36 min-h-screen flex-1">
        {activeView === 'store' && (
          <div className="flex flex-col w-full">
            {/* Section 1: Hero & Spotlight Deal */}
            <HeroSpotlight
              spotlightProduct={spotlightProduct}
              onOpenProductModal={(p) => setActiveProductModal(p)}
              onTrackClick={handleTrackClick}
            />

            {/* Section 2: Flash Deals Countdown */}
            <FlashDealsCountdown
              flashProducts={products.filter((p) => p.discountPercent >= 55)}
              onOpenProductModal={(p) => setActiveProductModal(p)}
              onTrackClick={handleTrackClick}
            />

            {/* Section 3: Curated Picks Grid */}
            <CuratedDealsGrid
              products={filteredProducts}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              onOpenProductModal={(p) => setActiveProductModal(p)}
              onTrackClick={handleTrackClick}
              onCopyVoucher={handleCopyVoucher}
            />

            {/* Section 4: Vouchers Station */}
            <VouchersStation
              vouchers={vouchers}
              onCopyVoucher={handleCopyVoucher}
              onTrackClick={handleTrackClick}
            />

            {/* Section 5: Trust, Testing & Reviews */}
            <TrustAndReviews />

            {/* Section 6: Telegram Community Alerts */}
            <NewsletterTelegram />
          </div>
        )}

        {activeView === 'involve-asia' && (
          <InvolveAsiaDashboard
            products={products}
            onTrackClick={handleTrackClick}
          />
        )}

        {activeView === 'automation' && (
          <CatalogAutomationView
            onRefreshCatalog={fetchCatalog}
          />
        )}

        {activeView === 'laravel' && (
          <LaravelCodebaseView />
        )}
      </main>

      {/* Product Detail & 90-Day Price Tracker Modal */}
      {activeProductModal && (
        <ProductDetailModal
          product={activeProductModal}
          onClose={() => setActiveProductModal(null)}
          onTrackClick={handleTrackClick}
          onCopyVoucher={handleCopyVoucher}
        />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
