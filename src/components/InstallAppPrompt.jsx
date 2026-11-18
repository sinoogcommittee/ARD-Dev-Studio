import { useState, useEffect } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export default function InstallAppPrompt() {
  const { canInstall, isInstalled, isIOS, installApp } = usePWAInstall();
  const [dismissed, setDismissed] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  useEffect(() => {
    // Check if dismissed recently in this session or localStorage
    const isDismissed = sessionStorage.getItem('ard_pwa_dismissed') === 'true';
    if (isDismissed) {
      setDismissed(true);
    }
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem('ard_pwa_dismissed', 'true');
  };

  const handleInstallClick = async () => {
    const res = await installApp();
    if (res.outcome === 'ios-prompt') {
      setShowIOSGuide(true);
    }
  };

  if (isInstalled || dismissed || !canInstall) {
    return null;
  }

  return (
    <>
      {/* Floating PWA Install Notification Bar */}
      <aside
        aria-label="Install ARD Dev Studio application"
        className="fixed bottom-20 lg:bottom-6 right-4 left-4 sm:left-auto sm:max-w-md z-40 bg-[#17191E]/95 backdrop-blur-xl border border-[#D6AD63]/50 rounded-2xl p-4 shadow-[0_16px_40px_rgba(0,0,0,0.8),0_0_24px_rgba(214,173,99,0.15)] animate-fade-in"
      >
        <div className="flex items-center gap-3.5">
          {/* Circular App Icon with Gold Halo */}
          <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-[#D6AD63] shadow-[0_0_12px_rgba(214,173,99,0.35)] bg-[#101114]">
            <img
              src="/images/ARDDevStudioCircleLogo.png"
              alt="ARD Dev Studio App Icon"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="font-display font-bold text-sm text-[#F2F0EB] truncate">
                ARD Dev Studio
              </h4>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-[#D6AD63]/20 text-[#D6AD63] border border-[#D6AD63]/30">
                APP
              </span>
            </div>
            <p className="text-xs text-[#A1A1AA] line-clamp-1 mt-0.5">
              Install for instant mobile home-screen access
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleInstallClick}
              className="px-3.5 py-1.5 rounded-lg bg-[#D6AD63] text-[#101114] font-bold text-xs hover:bg-[#e0bc75] transition-transform active:scale-95 shadow-sm"
            >
              Install
            </button>
            <button
              type="button"
              onClick={handleDismiss}
              aria-label="Dismiss app install prompt"
              className="w-7 h-7 rounded-lg flex items-center justify-center text-[#71717A] hover:text-[#F2F0EB] hover:bg-[#292C32] transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      </aside>

      {/* iOS Safari Home Screen Guide Modal */}
      {showIOSGuide && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="ios-install-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
        >
          <div className="w-full max-w-sm rounded-2xl bg-[#17191E] border border-[#D6AD63]/60 p-6 shadow-2xl relative text-left">
            <button
              type="button"
              onClick={() => setShowIOSGuide(false)}
              className="absolute top-4 right-4 text-[#71717A] hover:text-[#F2F0EB] text-sm w-7 h-7 rounded-lg flex items-center justify-center bg-[#1E2127]"
            >
              ✕
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#D6AD63] shadow-md bg-[#101114]">
                <img
                  src="/images/ARDDevStudioCircleLogo.png"
                  alt="ARD Dev Studio Circle Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 id="ios-install-title" className="font-display font-bold text-base text-[#F2F0EB]">
                  Install on iOS Safari
                </h3>
                <span className="font-mono text-xs text-[#D6AD63]">ARD Dev Studio</span>
              </div>
            </div>

            <ol className="space-y-3 text-xs text-[#A1A1AA] pl-4 list-decimal marker:text-[#D6AD63] mb-6">
              <li>
                Tap the <strong className="text-[#F2F0EB]">Share button</strong>{' '}
                <span className="inline-block px-1.5 py-0.5 rounded bg-[#292C32] text-[#F2F0EB] font-mono">⎋</span> in Safari’s bottom bar.
              </li>
              <li>
                Scroll down and select <strong className="text-[#F2F0EB]">Add to Home Screen</strong>{' '}
                <span className="inline-block px-1.5 py-0.5 rounded bg-[#292C32] text-[#F2F0EB] font-mono">➕</span>.
              </li>
              <li>
                Tap <strong className="text-[#D6AD63]">Add</strong> in the top-right corner to finish.
              </li>
            </ol>

            <button
              type="button"
              onClick={() => setShowIOSGuide(false)}
              className="w-full py-2.5 rounded-lg bg-[#D6AD63] text-[#101114] font-bold text-xs hover:bg-[#e0bc75] transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
}
