import { PuffLoader } from 'react-spinners';

const LoadingSkeleton = () => {
  return (
    <div className='flex h-[70vh] flex-col items-center justify-center'>
      <PuffLoader
        size={100}
        color='red'
      />
    </div>
  );
};

export { LoadingSkeleton };
