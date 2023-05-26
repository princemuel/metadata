'use client';

import { Container } from '../atoms';

interface Props {}

export function Navbar(props: Props) {
  return (
    <div className='fixed w-full bg-white z-10 shadow-sm'>
      <div className='py-4 border-b-[1px]'>
        <Container>Hello</Container>
      </div>
    </div>
  );
}
