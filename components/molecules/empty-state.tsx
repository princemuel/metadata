'use client';

import { useRouter } from 'next/navigation';
import { Button, Heading } from '../atoms';

interface Props {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
  reset?: () => void;
}

const EmptyState = ({
  title = 'No exact matches',
  subtitle = 'Try changing or removing some of your filters.',
  showReset,
  reset,
}: Props) => {
  const router = useRouter();

  return (
    <div className='flex h-[60vh] flex-col items-center justify-center gap-2'>
      <Heading
        center
        title={title}
        subtitle={subtitle}
      />

      <div className='mt-4 w-48'>
        {showReset && (
          <Button
            outline
            label={reset ? 'Try Again' : 'Remove all filters'}
            onClick={() => {
              reset?.() || router.push('/');
            }}
          />
        )}
      </div>
    </div>
  );
};

export { EmptyState };
