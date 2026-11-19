import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { initializeTheme } from '@/hooks/use-appearance';
import AppLayout from '@/layouts/app';
import SettingsLayout from '@/layouts/settings';
import AuthLayout from './layouts/auth';
import GuestLayout from './layouts/guest';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
  resolve: (name) =>
    resolvePageComponent(
      `./pages/${name}.tsx`,
      import.meta.glob('./pages/**/*.tsx'),
    ),
  title: (title) => (title ? `${title} - ${appName}` : appName),
  layout: (name) => {
    switch (true) {
      case name.startsWith('auth/') || name.startsWith('onboarding'):
        return AuthLayout;
      case name.startsWith('settings/'):
        return [AppLayout, SettingsLayout];
      case name.startsWith('client/') ||
        name.startsWith('provider/') ||
        name.startsWith('chats/') ||
        name.startsWith('notifications/'):
        return AppLayout;
      default:
        return GuestLayout;
    }
  },
  setup({ el, App, props }) {
    createRoot(el).render(
      <StrictMode>
        <TooltipProvider delayDuration={0}>
          <App {...props} />
          <Toaster />
        </TooltipProvider>
      </StrictMode>,
    );
  },
  progress: {
    color: '#4B5563',
  },
});

// This will set light / dark mode on load...
initializeTheme();
