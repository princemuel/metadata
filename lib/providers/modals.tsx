import { LoginForm, RegisterForm, RentalForm } from "@/components";
import * as React from "react";

interface Props {}

const ModalsProvider = (props: Props) => {
  return (
    <React.Fragment>
      <LoginForm />
      <RegisterForm />
      <RentalForm />
    </React.Fragment>
  );
};

export { ModalsProvider };
