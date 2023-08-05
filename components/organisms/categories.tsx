'use client';

import { categories } from '@/lib';
import { usePathname, useSearchParams } from 'next/navigation';
import { Container } from '../atoms';
import { CategoryBox } from '../molecules';

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  if (!isHomePage) return null;

  return (
    <Container>
      <div className='flex items-center justify-between overflow-x-auto pt-4'>
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label.toLowerCase()}
            icon={item.icon}
            selected={category?.toLowerCase() === item.label.toLowerCase()}
          />
        ))}
      </div>
    </Container>
  );
};

export { Categories };
