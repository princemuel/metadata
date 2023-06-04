'use client';

import { useCountries, useSearchModal } from '@/lib';
import { differenceInDays } from 'date-fns';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { BiSearch } from 'react-icons/bi';

const Search = () => {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const [_, fetchByCode] = useCountries();

  const location = params?.get('location');
  const startDate = params?.get('startDate');
  const endDate = params?.get('endDate');
  const guests = params?.get('guests');

  const locationLabel = useMemo(() => {
    if (location) return fetchByCode(location)?.name;
    return 'Anywhere';
  }, [fetchByCode, location]);

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      let diff = differenceInDays(end, start);
      if (diff === 0) diff = 1;

      return `${diff} Days`;
    }

    return 'Any Week';
  }, [endDate, startDate]);

  const guestLabel = useMemo(() => {
    if (guests) return `${guests} Guests`;
    return 'Add Guests';
  }, [guests]);

  return (
    <button
      type='button'
      className='inline-block w-full rounded-full border py-2 shadow-sm transition hover:shadow-md md:w-auto'
      onClick={searchModal.open}
    >
      <div className='flex items-center justify-between'>
        <p className='px-6 text-sm font-semibold'>{locationLabel}</p>
        <p className='hidden flex-1 border-x px-6 text-center text-sm font-semibold sm:block'>
          {durationLabel}
        </p>
        <p className='flex items-center gap-3 pl-6 pr-2 text-sm text-gray-600'>
          <span className='hidden sm:block'>{guestLabel}</span>
          <span className='rounded-full bg-rose-500 p-2 text-white'>
            <BiSearch size={18} />
          </span>
        </p>
      </div>
    </button>
  );
};

export { Search };
