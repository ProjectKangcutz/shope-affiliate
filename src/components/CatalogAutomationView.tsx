import React, { useState, useEffect } from 'react';
import { CatalogSyncLog, InvolveAsiaConfig } from '../types.ts';

interface CatalogAutomationViewProps {
  onRefreshCatalog: () => void;
}

export const CatalogAutomationView: React.FC<CatalogAutomationViewProps> = ({ onRefreshCatalog }) => {
  const [logs, setLogs] = useState<CatalogSyncLog[]>([]);
  const [config, setConfig] = useState<InvolveAsiaConfig | null>(null);
  const [syncing, setSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<any>(null);

  const fetchLogs = async () => {
    try {
      const res = await fetch('/api/catalog/sync-logs');
      if (res.ok) {
        const data = await res.json();
        setLogs(data.logs || []);
        setConfig(data.config || null);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const handleRunSync = async () => {
    try {
      setSyncing(true);
      setSyncResult(null);
      const res = await fetch('/api/catalog/sync', { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        setSyncResult(data);
        fetchLogs();
        onRefreshCatalog();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="w-full py-8 px-4 sm:px-8 bg-[#f7f9fb] min-h-screen">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        {/* Title Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl shadow-xs border border-gray-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-700 text-2xl">sync</span>
              <h1 className="text-2xl font-black text-gray-900 leading-none">
                Automated Product Catalog Engine
              </h1>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                Daemon Active
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Automated scheduler polling Involve Asia Shopee Product Feeds, checking price parity, updating flash discounts, and recording 90-day price trends.
            </p>
          </div>

          <button
            onClick={handleRunSync}
            disabled={syncing}
            className="bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all"
          >
            <span className={`material-symbols-outlined text-base ${syncing ? 'animate-spin' : ''}`}>
              refresh
            </span>
            <span>{syncing ? 'Syncing Catalog...' : 'Run Catalog Sync Now'}</span>
          </button>
        </div>

        {/* Sync Status Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl shadow-xs border border-gray-200 flex flex-col gap-2">
            <div className="flex items-center justify-between text-gray-500">
              <span className="text-[11px] font-bold uppercase">Scheduler Status</span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
            <span className="text-xl font-black text-gray-900">Every 6 Hours (Cron)</span>
            <span className="text-xs text-gray-500">
              In Laravel: <code className="bg-gray-100 px-1 py-0.5 rounded text-[#b22204] font-mono">shopee:sync-catalog</code>
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-xs border border-gray-200 flex flex-col gap-2">
            <span className="text-[11px] font-bold text-gray-500 uppercase">Last Synchronized</span>
            <span className="text-xl font-black text-gray-900">
              {config?.lastSyncTime || '2026-10-24 19:45:00'}
            </span>
            <span className="text-xs text-emerald-700 font-semibold">
              ✓ Parity verified with Shopee Mall API
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-xs border border-gray-200 flex flex-col gap-2">
            <span className="text-[11px] font-bold text-gray-500 uppercase">Next Scheduled Sync</span>
            <span className="text-xl font-black text-[#b22204]">
              {config?.nextSyncTime || '2026-10-25 01:45:00'}
            </span>
            <span className="text-xs text-gray-400">Automatic background queue</span>
          </div>
        </div>

        {/* Sync Result Banner */}
        {syncResult && (
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-emerald-700 text-2xl">check_circle</span>
              <div>
                <p className="text-xs font-bold text-emerald-900">
                  Catalog Synchronized Successfully in {syncResult.log.durationMs}ms!
                </p>
                <p className="text-[11px] text-emerald-700">
                  {syncResult.log.summary}
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-white px-3 py-1 rounded-lg border border-emerald-200 shadow-xs">
              {syncResult.updatedProductsCount} SKUs Checked
            </span>
          </div>
        )}

        {/* Sync Automation Pipeline Details */}
        <div className="bg-white p-5 rounded-2xl shadow-xs border border-gray-200 flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#b22204] text-xl">account_tree</span>
              <h2 className="text-base font-bold text-gray-900">Automated Pipeline Workflow</h2>
            </div>
            <span className="text-xs text-gray-400">Executed on schedule</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
            <div className="bg-[#f2f4f6] p-3.5 rounded-xl border border-gray-200 flex flex-col gap-1.5">
              <span className="font-bold text-gray-900 flex items-center gap-1">
                <span className="w-5 h-5 rounded-full bg-[#b22204] text-white flex items-center justify-center text-[10px]">1</span>
                Fetch Product Feeds
              </span>
              <p className="text-gray-500 leading-relaxed text-[11px]">
                Connects to Involve Asia Offer #100412 product feeds endpoint using OAuth headers.
              </p>
            </div>

            <div className="bg-[#f2f4f6] p-3.5 rounded-xl border border-gray-200 flex flex-col gap-1.5">
              <span className="font-bold text-gray-900 flex items-center gap-1">
                <span className="w-5 h-5 rounded-full bg-[#b22204] text-white flex items-center justify-center text-[10px]">2</span>
                Audit Price Changes
              </span>
              <p className="text-gray-500 leading-relaxed text-[11px]">
                Compares new merchant prices against 90-day median; flags fake markups and genuine price drops.
              </p>
            </div>

            <div className="bg-[#f2f4f6] p-3.5 rounded-xl border border-gray-200 flex flex-col gap-1.5">
              <span className="font-bold text-gray-900 flex items-center gap-1">
                <span className="w-5 h-5 rounded-full bg-[#b22204] text-white flex items-center justify-center text-[10px]">3</span>
                Update Price Graph
              </span>
              <p className="text-gray-500 leading-relaxed text-[11px]">
                Appends timestamped data point to the price history table for high-fidelity SVG tracking.
              </p>
            </div>

            <div className="bg-[#f2f4f6] p-3.5 rounded-xl border border-gray-200 flex flex-col gap-1.5">
              <span className="font-bold text-gray-900 flex items-center gap-1">
                <span className="w-5 h-5 rounded-full bg-[#b22204] text-white flex items-center justify-center text-[10px]">4</span>
                Stock & Vouchers Parity
              </span>
              <p className="text-gray-500 leading-relaxed text-[11px]">
                Refreshes stock urgency meters and verifies remaining quota for stackable promo codes.
              </p>
            </div>
          </div>
        </div>

        {/* Sync Execution History Logs */}
        <div className="bg-white p-5 rounded-2xl shadow-xs border border-gray-200 flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-gray-700 text-xl">history</span>
              <h2 className="text-base font-bold text-gray-900">Sync Execution Logs</h2>
            </div>
            <span className="text-xs text-gray-500">{logs.length} logged events</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-700">
              <thead className="bg-[#f2f4f6] text-gray-600 font-bold uppercase text-[10px]">
                <tr>
                  <th className="py-2.5 px-3 rounded-l-lg">Timestamp</th>
                  <th className="py-2.5 px-3">Products Checked</th>
                  <th className="py-2.5 px-3">Price Deltas</th>
                  <th className="py-2.5 px-3">Execution Time</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 rounded-r-lg">Summary</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-3 font-mono text-gray-900">{log.timestamp}</td>
                    <td className="py-3 px-3 font-bold">{log.productsChecked} SKUs</td>
                    <td className="py-3 px-3">
                      <span className="text-emerald-700 font-bold">
                        {log.pricesUpdated} updated ({log.priceDropsDetected} drops)
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono text-gray-500">{log.durationMs}ms</td>
                    <td className="py-3 px-3">
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                        {log.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-gray-600 text-[11px] leading-tight">
                      {log.summary}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
