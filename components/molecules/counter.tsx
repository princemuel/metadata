'use client';

import { useCallback } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

interface Props {
  title: string;
  subtitle: string;
  value: number;
  update: (value: number) => void;
}

const Counter = ({ title, subtitle, value, update }: Props) => {
  const increase = useCallback(() => {
    update(value + 1);
  }, [update, value]);

  const decrease = useCallback(() => {
    if (value <= 1) return;
    update(value - 1);
  }, [update, value]);

  return (
    <blockquote className='flex items-center justify-between'>
      <div className='flex flex-col'>
        <h3 className='font-medium'>{title}</h3>
        <p className='font-light text-gray-600'>{subtitle}</p>
      </div>

      <div className='flex items-center gap-4'>
        <button
          type='button'
          onClick={decrease}
          className='flex aspect-square w-10 items-center justify-center rounded-full border border-neutral-400 text-neutral-600 transition hover:opacity-80'
        >
          <AiOutlineMinus />
        </button>

        <p className='text-xl font-light text-neutral-600'>{value}</p>

        <button
          type='button'
          onClick={increase}
          className='flex aspect-square w-10 items-center justify-center rounded-full border border-neutral-400 text-neutral-600 transition hover:opacity-80'
        >
          <AiOutlinePlus />
        </button>
      </div>
    </blockquote>
  );
};

export { Counter };
