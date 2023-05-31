type Suffix = 'trips' | 'favorites' | 'reservations' | 'properties';
interface Props {
  label: 'Register' | 'Login' | 'Logout' | 'Airbnb your home' | `My ${Suffix}`;
  onClick: () => void;
}

const MenuItem = ({ label, onClick }: Props) => {
  return (
    <button
      type='button'
      className='px-4 py-3 font-semibold transition hover:bg-neutral-100'
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export { MenuItem };
