import React, { useState, useEffect } from 'react';
import { ConversionRecord, ClickRecord, InvolveAsiaConfig, Product } from '../types.ts';

interface InvolveAsiaDashboardProps {
  products: Product[];
  onTrackClick: (productId: string, placement: string) => void;
}

export const InvolveAsiaDashboard: React.FC<InvolveAsiaDashboardProps> = ({ products, onTrackClick }) => {
  const [conversions, setConversions] = useState<ConversionRecord[]>([]);
  const [stats, setStats] = useState<any>({
    totalOrders: 0,
    totalOrderValue: 0,
    totalCommissions: 0,
    approvedCommissions: 0,
    pendingCommissions: 0,
    totalClicks: 0,
    conversionRate: '0.00%',
  });
  const [recentClicks, setRecentClicks] = useState<ClickRecord[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [loading, setLoading] = useState(false);

  // Link Generator State
  const [inputUrl, setInputUrl] = useState('https://shopee.ph/product/268482083/17859382103');
  const [sub1, setSub1] = useState('telegram_blast_morning');
  const [sub2, setSub2] = useState('baseus-65w-gan5');
  const [sub3, setSub3] = useState('shopee_mega_88');
  const [generatedLink, setGeneratedLink] = useState('');
  const [linkCopied, setLinkCopied] = useState(false);

  // Simulator State
  const [simProduct, setSimProduct] = useState(products[0]?.id || 'baseus-65w-gan5');
  const [simAmount, setSimAmount] = useState('699');
  const [simStatus, setSimStatus] = useState<'pending' | 'approved' | 'rejected'>('approved');
  const [simSuccessMsg, setSimSuccessMsg] = useState('');

  // API Config State
  const [config, setConfig] = useState<InvolveAsiaConfig>({
    apiKey: 'ia_live_79428b1e4c88df30291ba',
    apiSecret: 'sec_89304128f9ac120489',
    publisherId: 'PUB-894103',
    defaultOfferId: '100412',
    syncIntervalHours: 6,
    autoSyncEnabled: true,
    lastSyncTime: '2026-10-24 19:45:00',
    nextSyncTime: '2026-10-25 01:45:00',
    autoPriceDropAlerts: true,
  });
  const [configSaved, setConfigSaved] = useState(false);

  const fetchConversions = async () => {
    try {
      const res = await fetch('/api/conversions');
      if (res.ok) {
        const data = await res.json();
        setConversions(data.conversions || []);
        setStats(data.stats || {});
        setRecentClicks(data.recentClicks || []);
      }
    } catch (e) {
      console.error('Failed to fetch conversions', e);
    }
  };

  useEffect(() => {
    fetchConversions();
    const interval = setInterval(fetchConversions, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleGenerateLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUrl) return;
    try {
      setLoading(true);
      const res = await fetch('/api/involve-asia/generate-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: inputUrl,
          subId1: sub1,
          subId2: sub2,
          subId3: sub3,
          offerId: config.defaultOfferId,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setGeneratedLink(data.trackingUrl);
        fetchConversions();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyGeneratedLink = () => {
    if (!generatedLink) return;
    navigator.clipboard.writeText(generatedLink);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const handleSimulateConversion = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/conversions/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: simProduct,
          amount: simAmount,
          status: simStatus,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSimSuccessMsg(`✓ S2S Postback Simulated! Order: ${data.conversion.orderId} (+₱${data.conversion.commissionAmount.toFixed(2)} payout)`);
        fetchConversions();
        setTimeout(() => setSimSuccessMsg(''), 4500);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/involve-asia/config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });
      if (res.ok) {
        setConfigSaved(true);
        setTimeout(() => setConfigSaved(false), 2500);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredConversions = conversions.filter((c) => {
    if (filterStatus === 'all') return true;
    return c.status === filterStatus;
  });

  return (
    <div className="w-full py-8 px-4 sm:px-8 bg-[#f7f9fb] min-h-screen">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        {/* Title Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl shadow-xs border border-gray-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#b22204] text-2xl">currency_exchange</span>
              <h1 className="text-2xl font-black text-gray-900 leading-none">Involve Asia Affiliate Hub</h1>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                Active S2S Postback
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Automated Deeplink generation, Sub-ID parameter attribution, real-time Shopee conversion tracking, and commission reconciliation.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchConversions}
              className="bg-[#f2f4f6] hover:bg-[#e6e8ea] text-gray-700 px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors border border-gray-200"
            >
              <span className="material-symbols-outlined text-sm">refresh</span>
              <span>Refresh Metrics</span>
            </button>
          </div>
        </div>

        {/* 5-Metrics KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
          <div className="bg-white p-4 rounded-2xl shadow-xs border border-gray-200 flex flex-col">
            <span className="text-[11px] font-bold text-gray-500 uppercase">Tracked Orders</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-black text-gray-900">{stats.totalOrders || 0}</span>
              <span className="text-[10px] text-emerald-700 font-bold">conversions</span>
            </div>
            <span className="text-[10px] text-gray-400 mt-1">From Involve Asia network</span>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow-xs border border-gray-200 flex flex-col">
            <span className="text-[11px] font-bold text-gray-500 uppercase">Gross Merchandise Value</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-black text-gray-900">₱{(stats.totalOrderValue || 0).toLocaleString()}</span>
            </div>
            <span className="text-[10px] text-gray-400 mt-1">Total customer purchases</span>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow-xs border border-gray-200 flex flex-col">
            <span className="text-[11px] font-bold text-[#b22204] uppercase">Total Commission</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-black text-[#b22204]">₱{(stats.totalCommissions || 0).toFixed(2)}</span>
            </div>
            <span className="text-[10px] text-emerald-700 font-bold mt-1">
              ₱{(stats.approvedCommissions || 0).toFixed(2)} approved
            </span>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow-xs border border-gray-200 flex flex-col">
            <span className="text-[11px] font-bold text-gray-500 uppercase">Tracked Clicks</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-black text-gray-900">{stats.totalClicks || 0}</span>
              <span className="text-[10px] text-gray-400">clicks</span>
            </div>
            <span className="text-[10px] text-gray-400 mt-1">With Sub-ID attribution</span>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow-xs border border-gray-200 flex flex-col">
            <span className="text-[11px] font-bold text-gray-500 uppercase">Conversion Rate</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-black text-emerald-700">{stats.conversionRate || '0.00%'}</span>
            </div>
            <span className="text-[10px] text-gray-400 mt-1">Clicks to Completed Orders</span>
          </div>
        </div>

        {/* 2-Column Split: Involve Asia Link Generator & Postback Simulator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Link Generator Tool */}
          <div className="lg:col-span-7 bg-white p-5 rounded-2xl shadow-xs border border-gray-200 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#b22204] text-xl">link</span>
                <h2 className="text-base font-bold text-gray-900">Involve Asia Deeplink Generator</h2>
              </div>
              <span className="text-[11px] font-bold text-gray-500">
                Offer ID: #{config.defaultOfferId} (Shopee PH)
              </span>
            </div>

            <form onSubmit={handleGenerateLink} className="flex flex-col gap-3">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Destination Shopee Product / Category URL
                </label>
                <input
                  type="url"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  placeholder="https://shopee.ph/product/..."
                  required
                  className="w-full bg-[#f2f4f6] border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#b22204]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div>
                  <label className="text-[11px] font-bold text-gray-600 block mb-1">
                    Sub-ID 1 (Traffic / Source)
                  </label>
                  <input
                    type="text"
                    value={sub1}
                    onChange={(e) => setSub1(e.target.value)}
                    placeholder="e.g. telegram_morning"
                    className="w-full bg-[#f2f4f6] border border-gray-200 rounded-xl px-2.5 py-1.5 text-xs text-gray-900 focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-600 block mb-1">
                    Sub-ID 2 (Product SKU)
                  </label>
                  <input
                    type="text"
                    value={sub2}
                    onChange={(e) => setSub2(e.target.value)}
                    placeholder="e.g. baseus-65w-gan5"
                    className="w-full bg-[#f2f4f6] border border-gray-200 rounded-xl px-2.5 py-1.5 text-xs text-gray-900 focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-600 block mb-1">
                    Sub-ID 3 (Campaign / Medium)
                  </label>
                  <input
                    type="text"
                    value={sub3}
                    onChange={(e) => setSub3(e.target.value)}
                    placeholder="e.g. shopee_mega_88"
                    className="w-full bg-[#f2f4f6] border border-gray-200 rounded-xl px-2.5 py-1.5 text-xs text-gray-900 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-[#b22204] hover:bg-[#d63c1e] text-white py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all mt-1"
              >
                <span className="material-symbols-outlined text-sm">bolt</span>
                <span>{loading ? 'Generating Deeplink...' : 'Generate Tracking Deeplink'}</span>
              </button>
            </form>

            {/* Generated Link Display */}
            {generatedLink && (
              <div className="bg-[#f2f4f6] p-3 rounded-xl border border-gray-200 flex flex-col gap-2">
                <span className="text-[11px] font-bold text-gray-600">Generated Affiliate Deeplink:</span>
                <div className="bg-white p-2.5 rounded-lg border border-gray-200 font-mono text-xs text-gray-800 break-all select-all">
                  {generatedLink}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyGeneratedLink}
                    className="bg-emerald-700 hover:bg-emerald-800 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">
                      {linkCopied ? 'check' : 'content_copy'}
                    </span>
                    <span>{linkCopied ? 'Link Copied!' : 'Copy Tracking Link'}</span>
                  </button>
                  <a
                    href={generatedLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white hover:bg-gray-100 text-gray-800 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 border border-gray-200 transition-colors"
                  >
                    <span>Test Open</span>
                    <span className="material-symbols-outlined text-sm">open_in_new</span>
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Right: S2S Postback Webhook Simulator */}
          <div className="lg:col-span-5 bg-white p-5 rounded-2xl shadow-xs border border-gray-200 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-700 text-xl">webhook</span>
                <h2 className="text-base font-bold text-gray-900">Postback Webhook Tester</h2>
              </div>
              <span className="bg-emerald-50 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded border border-emerald-200">
                S2S Endpoint Live
              </span>
            </div>

            <p className="text-xs text-gray-500 leading-relaxed">
              Involve Asia sends server-to-server HTTP POST notifications to your webhook when an order completes. Test conversion ingestion below:
            </p>

            <form onSubmit={handleSimulateConversion} className="flex flex-col gap-2.5">
              <div>
                <label className="text-[11px] font-bold text-gray-600 block mb-1">Target Product</label>
                <select
                  value={simProduct}
                  onChange={(e) => setSimProduct(e.target.value)}
                  className="w-full bg-[#f2f4f6] border border-gray-200 rounded-xl px-2.5 py-1.5 text-xs text-gray-900 focus:bg-white focus:outline-none"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name.substring(0, 45)}... (₱{p.price})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-bold text-gray-600 block mb-1">Sale Amount (₱)</label>
                  <input
                    type="number"
                    value={simAmount}
                    onChange={(e) => setSimAmount(e.target.value)}
                    className="w-full bg-[#f2f4f6] border border-gray-200 rounded-xl px-2.5 py-1.5 text-xs text-gray-900 focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-600 block mb-1">Status</label>
                  <select
                    value={simStatus}
                    onChange={(e) => setSimStatus(e.target.value as any)}
                    className="w-full bg-[#f2f4f6] border border-gray-200 rounded-xl px-2.5 py-1.5 text-xs text-gray-900 focus:bg-white focus:outline-none"
                  >
                    <option value="approved">Approved</option>
                    <option value="pending">Pending</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="bg-emerald-700 hover:bg-emerald-800 text-white py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all mt-1"
              >
                <span className="material-symbols-outlined text-sm">send</span>
                <span>Simulate Involve Asia Postback</span>
              </button>

              {simSuccessMsg && (
                <div className="bg-emerald-50 text-emerald-800 p-2.5 rounded-xl text-xs font-bold border border-emerald-200 text-center animate-fade-in">
                  {simSuccessMsg}
                </div>
              )}
            </form>

            <div className="bg-[#f2f4f6] p-2.5 rounded-xl border border-gray-200 text-[11px] text-gray-600">
              <span className="font-bold text-gray-800">Live Postback URL: </span>
              <code className="text-[#b22204] font-mono font-bold">/api/involve-asia/postback</code>
            </div>
          </div>
        </div>

        {/* Conversions Table */}
        <div className="bg-white p-5 rounded-2xl shadow-xs border border-gray-200 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#b22204] text-xl">table_chart</span>
              <h2 className="text-base font-bold text-gray-900">Tracked Conversions Feed</h2>
              <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full font-bold">
                {filteredConversions.length} records
              </span>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5">
              {['all', 'approved', 'pending', 'rejected'].map((st) => (
                <button
                  key={st}
                  onClick={() => setFilterStatus(st)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold capitalize transition-colors ${
                    filterStatus === st
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-700">
              <thead className="bg-[#f2f4f6] text-gray-600 font-bold uppercase text-[10px]">
                <tr>
                  <th className="py-2.5 px-3 rounded-l-lg">Order ID</th>
                  <th className="py-2.5 px-3">Product & Merchant</th>
                  <th className="py-2.5 px-3">Sub-IDs (Attribution)</th>
                  <th className="py-2.5 px-3">Sale Amount</th>
                  <th className="py-2.5 px-3">Est. Commission</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 rounded-r-lg">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                {filteredConversions.map((conv) => (
                  <tr key={conv.conversionId} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-gray-900">
                      {conv.orderId}
                      <span className="block text-[10px] text-gray-400 font-normal">
                        {conv.conversionId}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-bold text-gray-900 line-clamp-1">{conv.productName}</span>
                      <span className="text-[10px] text-gray-400">{conv.merchant}</span>
                    </td>
                    <td className="py-3 px-3 font-mono text-[11px]">
                      <span className="text-gray-900 font-semibold">{conv.subId1}</span>
                      <span className="block text-gray-400 text-[10px]">
                        p: {conv.subId2} | ch: {conv.subId3}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-bold text-gray-900">
                      ₱{conv.orderAmount.toLocaleString()}
                    </td>
                    <td className="py-3 px-3 font-black text-[#b22204]">
                      ₱{conv.commissionAmount.toFixed(2)}
                      <span className="block text-[10px] text-gray-400 font-normal">
                        ({(conv.commissionRate * 100).toFixed(1)}%)
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${
                          conv.status === 'approved'
                            ? 'bg-emerald-100 text-emerald-800'
                            : conv.status === 'pending'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {conv.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-gray-400 text-[11px] whitespace-nowrap">
                      {conv.createdAt}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* API Credentials Configuration Panel */}
        <div className="bg-white p-5 rounded-2xl shadow-xs border border-gray-200 flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-gray-700 text-xl">settings</span>
              <h2 className="text-base font-bold text-gray-900">Involve Asia API Settings</h2>
            </div>
            <span className="text-xs text-gray-500">Configures connection headers & Publisher ID</span>
          </div>

          <form onSubmit={handleSaveConfig} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-[11px] font-bold text-gray-600 block mb-1">Publisher ID</label>
              <input
                type="text"
                value={config.publisherId}
                onChange={(e) => setConfig({ ...config, publisherId: e.target.value })}
                className="w-full bg-[#f2f4f6] border border-gray-200 rounded-xl px-2.5 py-1.5 text-xs text-gray-900 focus:bg-white focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-gray-600 block mb-1">Involve API Key</label>
              <input
                type="password"
                value={config.apiKey}
                onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
                className="w-full bg-[#f2f4f6] border border-gray-200 rounded-xl px-2.5 py-1.5 text-xs text-gray-900 focus:bg-white focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-gray-600 block mb-1">Default Campaign ID</label>
              <input
                type="text"
                value={config.defaultOfferId}
                onChange={(e) => setConfig({ ...config, defaultOfferId: e.target.value })}
                className="w-full bg-[#f2f4f6] border border-gray-200 rounded-xl px-2.5 py-1.5 text-xs text-gray-900 focus:bg-white focus:outline-none"
              />
            </div>
            <div className="sm:col-span-3 flex items-center justify-between pt-2">
              <span className="text-xs text-gray-500">
                Connected to Involve Asia Regional API endpoint. All deeplinks will use this Publisher ID.
              </span>
              <button
                type="submit"
                className="bg-gray-900 hover:bg-black text-white px-5 py-2 rounded-xl text-xs font-bold transition-colors"
              >
                {configSaved ? '✓ Saved!' : 'Save Credentials'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
