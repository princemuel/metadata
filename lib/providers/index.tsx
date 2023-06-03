import * as React from "react";
import { ModalsProvider } from "./modals";
import { ToastProvider } from "./toast";

interface Props {}

const Providers = (props: Props) => {
  return (
    <React.Fragment>
      <ToastProvider />
      <ModalsProvider />
    </React.Fragment>
  );
};

export { Providers };
