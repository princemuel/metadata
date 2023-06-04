'use client';

import { EmptyState } from '@/components';
import { useEffect } from 'react';

interface Props {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <EmptyState
      title='Uh Oh'
      subtitle='Something went wrong!'
      showReset
      reset={reset}
    />
  );
}
