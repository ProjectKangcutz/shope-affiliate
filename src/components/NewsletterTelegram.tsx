import React, { useState } from 'react';

export const NewsletterTelegram: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setTimeout(() => {
      setEmail('');
      setSubmitted(false);
    }, 3000);
  };

  return (
    <section className="w-full bg-[#e6e8ea] py-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto bg-gradient-to-r from-[#b22204] to-[#d63c1e] rounded-3xl shadow-xl overflow-hidden p-6 sm:p-10 text-white relative">
        {/* Subtle decorative glow */}
        <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-white/10 blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex flex-col gap-2.5 max-w-2xl text-left">
            <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full w-fit text-[11px] font-bold text-white uppercase tracking-wider">
              <span className="material-symbols-outlined text-xs">notifications_active</span> Live Deal Alerts Community
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              Get Instant Midnight Price Drops on Telegram & WhatsApp
            </h2>
            <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
              Join 140,000+ Southeast Asian deal hunters. We send zero spam: only verified price drop glitches, 12AM flash code alerts, and restock notifications for high-demand viral electronics.
            </p>
          </div>

          {/* Action / Input Block */}
          <div className="w-full lg:w-auto flex flex-col sm:flex-row items-center gap-2.5">
            <form onSubmit={handleSubmit} className="flex items-center bg-white rounded-xl p-1 shadow-md w-full sm:w-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={submitted ? '✓ You are subscribed!' : 'Enter your email for drops...'}
                disabled={submitted}
                className="px-3.5 py-2 text-xs text-gray-900 bg-transparent focus:outline-none w-full sm:w-64 placeholder:text-gray-400"
              />
              <button
                type="submit"
                className="bg-[#b22204] hover:bg-[#8d1600] text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors whitespace-nowrap"
              >
                {submitted ? 'Subscribed' : 'Notify Me'}
              </button>
            </form>
            <span className="text-white text-xs font-bold uppercase sm:block hidden">OR</span>
            <a
              href="https://t.me"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-white hover:bg-gray-100 text-[#b22204] px-5 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all whitespace-nowrap"
            >
              <span className="material-symbols-outlined text-base">send</span>
              <span>Join Telegram (140k+)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
