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
                    'mb-4 flex h-16 w-16 items-center justify-center rounded-full text-card-foreground transition-colors',
                    form.data.type === 'client' ? 'bg-primary/10' : '',
                  )}
                >
                  <User aria-hidden="true" className="size-8" />
                </div>
                <h2 className="font-semibold text-lg mb-2 text-center text-foreground">
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
                    'mb-6 flex h-16 w-16 items-center justify-center rounded-full text-card-foreground transition-colors',
                    form.data.type === 'provider' ? 'bg-primary/10' : '',
                  )}
                >
                  <Store aria-hidden="true" className="size-8" />
                </div>
                <h2 className="font-semibold text-lg mb-2 text-center text-foreground">
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
          container: 'flex flex-row gap-5',
          field: {
            wrapper: 'bg-muted lg:p-8',
            container: 'p-0! bg-overflow-hidden',
            label: 'overflow-hidden border-none font-semibold',
            description: 'text-center text-normal text-foreground',
          },
        }}
      />
    </>
  );
}
