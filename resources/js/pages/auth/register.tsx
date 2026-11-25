import { Head, Link, useForm } from '@inertiajs/react';
import { LockKeyhole, Mail, User } from 'lucide-react';
import type { FormEvent } from 'react';
import { Input, Password } from '@/components/form/input';
import SubmitButton from '@/components/form/submit-button';
import { login, privacy, register, terms } from '@/routes';
import SocialAuthButtons, { AlternateLogin } from './social-buttons';

export default function Register() {
  const form = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    form.post(register().url);
  };

  return (
    <>
      <Head title="Create an account" />

      <form className="w-full" onSubmit={handleSubmit}>
        <div className="grid gap-5 sm:grid-cols-2">
          <Input
            name="name"
            label="Full name"
            placeholder="Nathan Luck"
            autoComplete="name"
            form={form}
            tabIndex={1}
            icons={{
              prefixIcon: User,
            }}
            classNames={{
              wrapper: 'sm:col-span-2',
            }}
          />

          <Input
            type="email"
            name="email"
            label="Email address"
            placeholder="email@example.com"
            autoComplete="email"
            form={form}
            tabIndex={2}
            icons={{
              prefixIcon: Mail,
            }}
            classNames={{
              wrapper: 'sm:col-span-2',
            }}
          />

          <Password
            name="password"
            tabIndex={3}
            label="Password"
            placeholder="Create a password"
            autoComplete="new-password"
            form={form}
            icons={{
              prefixIcon: LockKeyhole,
            }}
            classNames={{
              wrapper: 'sm:col-span-2',
              prependIcon: 'z-1',
            }}
          />

          <Password
            name="password_confirmation"
            tabIndex={4}
            label="Confirm password"
            placeholder="Repeat your password"
            autoComplete="new-password"
            form={form}
            icons={{
              prefixIcon: LockKeyhole,
            }}
            classNames={{
              wrapper: 'sm:col-span-2',
              prependIcon: 'z-1',
            }}
          />

          <div className="sm:col-span-2">
            <SubmitButton
              label="Create my account"
              className="w-full rounded-xl bg-primary text-white shadow-[0_10px_22px_rgba(15,138,98,0.18)] hover:bg-secondary"
              form={form}
              tabIndex={5}
            />
          </div>
        </div>

        <p className="mt-5 text-center text-xs leading-5">
          By creating an account, you agree to our{' '}
          <Link
            className="font-semibold text-primary hover:underline"
            href={terms()}
          >
            Terms
          </Link>{' '}
          and{' '}
          <Link
            className="font-semibold text-primary hover:underline"
            href={privacy()}
          >
            Privacy Policy
          </Link>
          .
        </p>

        <AlternateLogin />

        <SocialAuthButtons />

        <p className="mt-6 text-center text-sm">
          Already have an account?{' '}
          <Link
            href={login()}
            tabIndex={6}
            className="font-bold text-primary transition-colors hover:text-secondary hover:underline"
          >
            Log in
          </Link>
        </p>
      </form>
    </>
  );
}

Register.layout = {
  asDirectChild: false,
  title: 'Create your account',
  // classNames: {
  //   wrapper: "lg:min-h-[70dvh]"
  // },
  description:
    'Set up your Reservatr account and make space for more of the work you love.',
};
