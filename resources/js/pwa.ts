export function registerServiceWorker(): void {
  if (
    typeof window === 'undefined' ||
    !('serviceWorker' in navigator) ||
    import.meta.env.DEV
  ) {
    return;
  }

  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // Service worker support is an enhancement; the app remains usable without it.
    });
  });
}

export type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
};
