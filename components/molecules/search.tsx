'use client';

import { BiSearch } from 'react-icons/bi';

interface Props {}

const Search = (props: Props) => {
  return (
    <div className='w-full cursor-pointer rounded-full border py-2 shadow-sm transition hover:shadow-md md:w-auto'>
      <div className='flex items-center justify-between'>
        <p className='px-6 text-sm font-semibold'>Anywhere</p>
        <p className='hidden flex-1 border-x px-6 text-center text-sm font-semibold sm:block'>
          Any Week
        </p>
        <p className='flex items-center gap-3 pl-6 pr-2 text-sm text-gray-600'>
          <span className='hidden sm:block'>Add Guests</span>
          <span className='rounded-full bg-rose-500 p-2 text-white'>
            <BiSearch />
          </span>
        </p>
      </div>
    </div>
  );
};

export { Search };
