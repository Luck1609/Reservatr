import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

type PwaInstallContextValue = {
  isInstalled: boolean;
  isInstallable: boolean;
  install: () => Promise<void>;
  installPrompt: InstallPromptEvent | null;
};

const PwaInstallContext = createContext<PwaInstallContextValue | null>(null);

function isRunningStandalone(): boolean {
  const iosNavigator = navigator as Navigator & { standalone?: boolean };

  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    iosNavigator.standalone === true
  );
}

export function PwaInstallProvider({ children }: { children: ReactNode }) {
  const [installPrompt, setInstallPrompt] = useState<InstallPromptEvent | null>(
    null,
  );
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    setIsInstalled(isRunningStandalone());

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as InstallPromptEvent);
    };
    const handleAppInstalled = () => {
      setInstallPrompt(null);
      setIsInstalled(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt,
      );
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const install = async () => {
    if (!installPrompt) {
      return;
    }

    await installPrompt.prompt();
    await installPrompt.userChoice;
    setInstallPrompt(null);
  };

  return (
    <PwaInstallContext.Provider
      value={{
        isInstalled,
        isInstallable: !isInstalled && installPrompt !== null,
        install,
        installPrompt,
      }}
    >
      {children}
    </PwaInstallContext.Provider>
  );
}

export function usePwaInstall(): PwaInstallContextValue {
  const context = useContext(PwaInstallContext);

  if (!context) {
    throw new Error('usePwaInstall must be used within a PwaInstallProvider');
  }

  return context;
}

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
