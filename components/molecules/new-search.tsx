'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

export function SearchNew() {
  const pathname = usePathname();
  const { replace } = useRouter();

  const [isFocused, setIsFocused] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(window.location.search);

    if (term) params.set('search', term);
    else params.delete('search');

    params.delete('page');

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <div>
      <input
        type='text'
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(true)}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />

      {isPending && <p className='aspect-square w-4 animate-spin'></p>}
    </div>
  );
}
