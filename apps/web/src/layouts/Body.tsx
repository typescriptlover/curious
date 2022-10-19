interface Props {
   children: React.ReactNode;
}

const Body: React.FC<Props> = ({ children }) => {
   return (
      <body className="antialiased text-white font-satoshi opacity-95 bg-base-900">
         {children}
      </body>
   );
};

export default Body;
