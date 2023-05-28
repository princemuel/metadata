import { cx } from 'cva';
import type { IconType } from 'react-icons';

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  label?: string;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
}
const Button = ({
  label,
  onClick,
  outline,
  small,
  icon: Icon,
  ...props
}: Props) => {
  return (
    <button
      className={cx(
        'relative w-full rounded-lg transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-70',
        outline ? 'bg-white' : 'bg-rose-500',
        outline ? 'border-black' : 'border-rose-500',
        outline ? 'text-black' : 'text-white',
        small ? 'py-1' : 'py-3',
        small ? 'text-sm' : 'text-base',
        small ? 'font-light' : 'font-semibold',
        small ? 'border' : 'border-2'
      )}
      onClick={onClick}
      {...props}
    >
      {Icon && <Icon size={24} className='absolute left-4 top-3' />}
      {label}
    </button>
  );
};
export { Button };
