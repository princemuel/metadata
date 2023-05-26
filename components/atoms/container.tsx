interface Props {
  children: React.ReactNode;
}

const Container = ({ children }: Props) => {
  return <div>{children}</div>;
};

export { Container };
