'use client';

interface Props {
  children: React.ReactNode;
}

const Container = ({ children }: Props) => {
  return (
    <div className='mx-auto max-w-[157.5rem] px-4 sm:px-2 md:px-10 xl:px-20'>
      {children}
    </div>
  );
};

export { Container };
