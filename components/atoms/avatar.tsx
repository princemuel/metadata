'use client';

'use  client';

import Image from 'next/image';

interface Props {}

function Avatar({}: Props) {
  return (
    <Image
      src={'/assets/placeholder.jpg'}
      className='rounded-full'
      height={30}
      width={30}
      alt='Avatar'
    />
  );
}

export { Avatar };
