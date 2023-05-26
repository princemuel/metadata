'use client';

// import * as React from 'react';
// import { AiOutlineMenu } from 'react-icons/ai';
// import { Avatar } from '../atoms';

interface Props {
  label: 'Login' | 'Register';
  onClick: () => void;
}

const MenuItem = ({ label, onClick }: Props) => {
  return (
    <button
      type='button'
      className='px-4 py-3 font-semibold transition hover:bg-neutral-100'
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export { MenuItem };
