const Search = () => {
   return (
      <div className="relative flex-1 group">
         <input
            type="text"
            placeholder="Find a user"
            className="w-full py-1.5 pl-9 pr-3 placeholder-zinc-500 transition duration-200 ease-linear focus:border-rose-500 focus:outline-none font-medium border-2 rounded-lg border-base-700 bg-base-800 focus:bg-base-750 hover:bg-base-750"
         />
         <div className="absolute inset-y-0 flex items-center left-3">
            <span className="text-sm transition duration-200 ease-linear text-zinc-400 group-focus-within:text-rose-400">
               <i className="fa-sharp fa-solid fa-magnifying-glass"></i>
            </span>
         </div>
      </div>
   );
};

export default Search;
