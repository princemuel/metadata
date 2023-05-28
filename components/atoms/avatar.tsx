import Image from 'next/image';

interface Props {
  src?: string;
}

function Avatar({ src }: Props) {
  return (
    <Image
      src={src || '/assets/placeholder.jpg'}
      className='rounded-full'
      height={30}
      width={30}
      alt='Avatar'
    />
  );
}

export { Avatar };
