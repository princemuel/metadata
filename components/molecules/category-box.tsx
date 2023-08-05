'use client';

import { cn } from '@/lib';
import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';
import { useCallback } from 'react';
import { IconType } from 'react-icons';

interface Props {
  icon: IconType;
  label: string;
  selected?: boolean;
}

export const CategoryBox = ({ icon: Icon, label, selected }: Props) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {} satisfies Record<string, any>;
    if (params) currentQuery = qs.parse(params.toString());

    const updatedQuery: Record<string, any> = {
      ...currentQuery,
      category: label,
    };

    if (params?.get('category') === label) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl(
      {
        url: '/',
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [label, params, router]);

  return (
    <div
      onClick={handleClick}
      className={cn(
        'flex cursor-pointer flex-col items-center justify-center gap-2 border-b-2 p-3 transition hover:text-neutral-800',
        selected ? 'border-b-neutral-800' : 'border-transparent',
        selected ? 'text-neutral-800' : 'text-neutral-500'
      )}
    >
      <Icon size={24} />
      <p className='text-sm font-medium'>{label}</p>
    </div>
  );
};
