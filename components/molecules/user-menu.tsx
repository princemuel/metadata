'use client';

interface Props {}

function UserMenu({}: Props) {
  return (
    <div className='relative '>
      <div className='flex items-center gap-3'>
        <button
          type='button'
          className='hidden rounded-full px-4 py-3 text-sm font-semibold transition hover:bg-neutral-100 md:block'
        >
          Airbnb your home
        </button>
      </div>
    </div>
  );
}

export { UserMenu };
