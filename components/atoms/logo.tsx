'use  client';

import Image from 'next/image';
import Link from 'next/link';

interface Props {}

const Logo = (props: Props) => {
  return (
    <Link href={'/'}>
      <Image
        src='/assets/logo.png'
        width={100}
        height={100}
        alt='Logo'
        className='hidden md:block'
      />
    </Link>
  );
};

export { Logo };
