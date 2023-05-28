'use client';

import * as React from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { Avatar } from '../atoms';
import { MenuItem } from './menu-item';

interface Props {}

function UserMenu({}: Props) {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleOpen = React.useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  return (
    <div className='relative '>
      <div className='flex items-center gap-3'>
        <button
          type='button'
          className='hidden rounded-full px-4 py-3 text-sm font-semibold transition hover:bg-neutral-100 md:block'
        >
          Airbnb your home
        </button>

        <button
          type='button'
          className='flex items-center gap-3 rounded-full border border-neutral-200 p-4 transition hover:shadow-md md:px-2 md:py-1'
          onClick={toggleOpen}
        >
          <AiOutlineMenu />
          <div className='hidden md:block'>
            <Avatar />
          </div>
        </button>
      </div>

      {isOpen && (
        <div className='absolute right-0 top-12 w-[40vw] overflow-hidden rounded-xl bg-white text-sm shadow-md md:w-3/4'>
          <div className='flex cursor-pointer flex-col'>
            <React.Fragment>
              <MenuItem label={'Login'} onClick={() => {}} />
              <MenuItem label={'Register'} onClick={() => {}} />
            </React.Fragment>
          </div>
        </div>
      )}
    </div>
  );
}

export { UserMenu };
