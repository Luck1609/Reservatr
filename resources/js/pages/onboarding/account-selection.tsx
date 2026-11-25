import type { InertiaFormProps } from '@inertiajs/react';
import { User, Store } from 'lucide-react';
import { Checkbox } from '@/components/form/checkbox';
import { cn } from '@/lib/utils';

export default function AccountSelection({
  form,
}: {
  form: InertiaFormProps<Record<string, any>>;
}) {
  return (
    <>
      <Checkbox
        name="type"
        form={form}
        multiple={false}
        options={[
          {
            label: (
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors',
                    form.data.type === 'client'
                      ? 'bg-primary/10 text-primary'
                      : '',
                  )}
                >
                  <User aria-hidden="true" className="size-8" />
                </div>
                <h2 className="mb-2 text-center text-lg font-semibold text-foreground">
                  I am a Client
                </h2>
              </div>
            ),
            value: 'client',
            description:
              'I want to browse services, book appointments, and manage my care plan.',
          },
          {
            label: (
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors',
                    form.data.type === 'provider'
                      ? 'bg-primary/10 text-primary'
                      : '',
                  )}
                >
                  <Store aria-hidden="true" className="size-8" />
                </div>
                <h2 className="mb-2 text-center text-lg font-semibold text-foreground">
                  I am a Service Provider
                </h2>
              </div>
            ),
            value: 'provider',
            description:
              'I want to list my services, manage bookings, and connect with clients.',
          },
        ]}
        classNames={{
          container: 'grid gap-5 lg:grid-cols-2',
          field: {
            wrapper:
              'rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/40 hover:bg-muted/50 has-data-checked:border-primary/50 has-data-checked:bg-primary/5 lg:p-6',
            container: 'overflow-hidden lg:p-0',
            label: 'font-semibold',
            description: 'text-center text-muted-foreground',
          },
        }}
      />
    </>
  );
}
