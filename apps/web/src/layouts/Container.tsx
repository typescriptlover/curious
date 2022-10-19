interface Props {
   children: React.ReactNode;
}

const Container: React.FC<Props> = ({ children }) => {
   return <div className="flex flex-col flex-1 p-5 mt-20">{children}</div>;
};

export default Container;
