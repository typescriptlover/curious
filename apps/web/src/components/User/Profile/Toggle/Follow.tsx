const Follow = () => {
   return (
      <button className="text-sm font-semibold py-2 px-4 rounded-lg bg-rose-500 hover:ring-2 hover:ring-rose-500 transition duration-200 ease-linear">
         Follow
         <span className="ml-2 -mr-1 text-xs text-rose-200">
            <i className="fa-solid fa-fw fa-user-plus" />
         </span>
      </button>
   );
};

export default Follow;
