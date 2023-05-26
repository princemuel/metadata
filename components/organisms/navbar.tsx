'use client';

import { Container, Logo } from '../atoms';
import { Search, UserMenu } from '../molecules';

interface Props {}

export function Navbar(props: Props) {
  return (
    <div className='fixed z-10 w-full bg-white shadow-sm'>
      <div className='border-b-[1px] py-4'>
        <Container>
          <div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
            <Logo />
            <Search />
            <UserMenu />
          </div>
        </Container>
      </div>
    </div>
  );
}
