import { cn } from '@/lib';

interface Props {
  title: string;
  subtitle?: string;
  center?: boolean;
  className?: string;
}

const Heading = ({ title, subtitle, center, className }: Props) => {
  return (
    <div className={cn(className, center ? 'text-center' : 'text-start')}>
      <h2 className='text-2xl font-bold'>{title}</h2>
      <p className='mt-2 font-light text-neutral-500'>{subtitle}</p>
    </div>
  );
};

export { Heading };
