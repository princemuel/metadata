import { RentalForm, SearchForm } from '@/components';

interface Props {}

const ModalsProvider = (props: Props) => {
  return (
    <>
      <RentalForm />
      <SearchForm />
    </>
  );
};

export { ModalsProvider };
