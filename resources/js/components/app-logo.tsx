import AppLogoIcon from '@/components/app-logo-icon';

export function AppLogo() {
  return (
    <div className="flex items-center gap-1">
      <AppLogoIcon className="size-10" />
      <span className="text-[1.15rem] font-bold tracking-[-0.04em] text-[#162d35] dark:text-white">
        Reservatr
      </span>
    </div>
  );
}

export default AppLogo;
