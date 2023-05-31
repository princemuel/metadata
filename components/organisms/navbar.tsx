import { Container, Logo } from '../atoms';
import { Search, UserMenu } from '../molecules';

interface Props {
  currentUser: SafeUser | null;
}

export function Navbar({ currentUser }: Props) {
  return (
    <div className='fixed z-10 w-full bg-white shadow-sm'>
      <div className='border-b py-4'>
        <Container>
          <div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
    </div>
  );
}
