interface Props {
   children: React.ReactNode;
}

const Wrapper: React.FC<Props> = ({ children }) => {
   return <div className="flex flex-col w-full min-h-screen">{children}</div>;
};

export default Wrapper;
