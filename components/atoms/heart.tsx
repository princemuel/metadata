'use client';

import useFavorite from '@/lib/hooks/use-favorite';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

interface Props {
  listing: string;
  user?: SafeUser | null;
}

const HeartButton = ({ listing, user }: Props) => {
  const [isFavorite, toggleFavorite] = useFavorite(listing, user);

  return (
    <button
      type='button'
      onClick={toggleFavorite}
      className='relative transition hover:opacity-80'
    >
      <AiOutlineHeart
        size={28}
        className='absolute -right-[2px] -top-[2px] fill-white'
      />
      <AiFillHeart
        size={24}
        className={isFavorite ? 'fill-rose-500' : 'fill-neutral-500/70'}
      />
    </button>
  );
};

export { HeartButton };
