import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import { Checkbox } from '@/components/form/checkbox';
import { Input, Password } from '@/components/form/input';
import SubmitButton from '@/components/form/submit-button';
import { Label } from '@/components/ui/label';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import SocialAuthButtons, { AlternateLogin } from './social-buttons';

export default function Login({ status }: { status?: string }) {
  const form = useForm({
    email: '',
    password: '',
    remember: false,
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    form.post(store().url);
  };

  return (
    <>
      <Head title="Log in" />

      <form className="w-full" onSubmit={handleSubmit}>
        {status && (
          <div className="mb-5 rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm leading-5 text-destructive">
            {status}
          </div>
        )}

        <div className="grid gap-5">
          <Input
            type="email"
            name="email"
            label="Email address"
            placeholder="email@example.com"
            autoComplete="email"
            form={form}
            tabIndex={1}
          />

          <Password
            name="password"
            tabIndex={2}
            label={<Label htmlFor="password">Password</Label>}
            placeholder="Enter your password"
            autoComplete="current-password"
            form={form}
          />

          <div className="grid gap-3 sm:flex-row sm:items-center sm:justify-between lg:grid-cols-2">
            <Checkbox
              name="remember"
              tabIndex={3}
              isBoolean
              label="Remember me"
              form={form}
              classNames={{
                field: {
                  wrapper:
                    'flex items-center space-x-3 border-none has-data-[state=checked]:border-none has-data-[state=checked]:bg-background',
                  container: 'p-0!',
                },
              }}
            />

            <Link
              href={request()}
              className="text-right text-sm font-semibold text-primary transition-colors hover:text-primary/80 hover:underline"
              tabIndex={4}
            >
              Forgot password?
            </Link>
          </div>

          <SubmitButton
            label="Log in"
            className="w-full rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90"
            form={form}
            tabIndex={5}
          />
        </div>

        <AlternateLogin />

        <SocialAuthButtons />

        <p className="mt-6 text-center text-sm text-muted-foreground">
          New to Reservatr?{' '}
          <Link
            href={register()}
            tabIndex={6}
            className="font-bold text-primary transition-colors hover:text-primary/80 hover:underline"
          >
            Create an account
          </Link>
        </p>
      </form>
    </>
  );
}

Login.layout = {
  asDirectChild: false,
  title: 'Welcome back',
  // classNames: {
  //   wrapper: 'lg:min-h-[70dvh]',
  // },
  description:
    'Log in to keep your schedule moving and your day feeling clear.',
};
