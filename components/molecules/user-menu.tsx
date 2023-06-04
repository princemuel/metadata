'use client';

import { useLoginModal, useRegisterModal, useRentModal } from '@/lib';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { Avatar } from '../atoms';
import { MenuItem } from './menu-item';

interface Props {
  currentUser: SafeUser | null;
}

function UserMenu({ currentUser }: Props) {
  const router = useRouter();

  const [isOpen, setIsOpen] = React.useState(false);

  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();

  const toggleOpen = React.useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const handleRentModal = React.useCallback(() => {
    if (!currentUser) return loginModal.open();

    rentModal.open();
  }, [currentUser, loginModal, rentModal]);

  return (
    <div className='relative '>
      <div className='flex items-center gap-3'>
        <button
          type='button'
          className='hidden rounded-full px-4 py-3 text-sm font-semibold transition hover:bg-neutral-100 md:block'
          onClick={handleRentModal}
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
            <Avatar src={currentUser?.image} />
          </div>
        </button>
      </div>

      {isOpen && (
        <div className='absolute right-0 top-12 w-[40vw] overflow-hidden rounded-xl bg-white text-sm shadow-md md:w-3/4'>
          <div className='flex cursor-pointer flex-col'>
            {currentUser ? (
              <React.Fragment>
                <MenuItem
                  label='My trips'
                  onClick={() => router.push('/trips')}
                />
                <MenuItem
                  label='My favorites'
                  onClick={() => router.push('/favorites')}
                />
                <MenuItem
                  label='My reservations'
                  onClick={() => router.push('/reservations')}
                />
                <MenuItem
                  label='My properties'
                  onClick={() => router.push('/properties')}
                />
                <MenuItem
                  label='Airbnb your home'
                  onClick={rentModal.open}
                />
                <hr />
                <MenuItem
                  label='Logout'
                  onClick={() => signOut()}
                />
              </React.Fragment>
            ) : (
              <React.Fragment>
                <MenuItem
                  label='Login'
                  onClick={loginModal.open}
                />
                <MenuItem
                  label='Register'
                  onClick={registerModal.open}
                />
              </React.Fragment>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export { UserMenu };
