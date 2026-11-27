import { Download, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import type { InstallPromptEvent } from '@/pwa';

export default function PwaInstallPrompt() {
  const [installPrompt, setInstallPrompt] = useState<InstallPromptEvent | null>(
    null,
  );
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as InstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () =>
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt,
      );
  }, []);

  if (!installPrompt || isDismissed) {
    return null;
  }

  const handleInstall = async () => {
    await installPrompt.prompt();
    await installPrompt.userChoice;
    setInstallPrompt(null);
  };

  return (
    <aside className="fixed right-4 bottom-4 z-50 flex max-w-sm items-center gap-3 rounded-2xl border border-border bg-background p-4 shadow-lg">
      <Download className="size-5 shrink-0 text-primary" aria-hidden="true" />
      <p className="flex-1 text-sm font-medium">
        Install Reservatr for a faster app experience.
      </p>
      <Button size="sm" onClick={handleInstall}>
        Install
      </Button>
      <Button
        size="icon-xs"
        variant="ghost"
        aria-label="Dismiss install prompt"
        onClick={() => setIsDismissed(true)}
      >
        <X aria-hidden="true" />
      </Button>
    </aside>
  );
}
