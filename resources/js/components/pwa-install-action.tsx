import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePwaInstall } from '@/pwa';

export default function PwaInstallAction() {
  const { isInstallable, install } = usePwaInstall();

  if (!isInstallable) {
    return null;
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className="gap-2 text-primary"
      onClick={() => void install()}
    >
      <Download aria-hidden="true" className="size-4" />
      Download app
    </Button>
  );
}
