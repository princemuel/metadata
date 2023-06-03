import { LoginForm, RegisterForm, RentalForm, SearchForm } from '@/components';
import * as React from 'react';

interface Props {}

const ModalsProvider = (props: Props) => {
  return (
    <React.Fragment>
      <LoginForm />
      <RegisterForm />
      <RentalForm />
      <SearchForm />
    </React.Fragment>
  );
};

export { ModalsProvider };
