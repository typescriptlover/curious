import Link from '../components/ui/Link';

const Register = () => {
   return (
      <div className="w-full max-w-sm m-auto text-center">
         <h2 className="text-3xl font-bold tracking-tight">
            Create your new account
         </h2>
         <div className="mt-4 text-zinc-400">
            Or <Link href="/login">already have an account</Link>
         </div>
         <div className="w-full mt-8 -space-y-px shadow rounded-xl">
            <input
               autoFocus={true}
               type="text"
               placeholder="Display name"
               className="relative block w-full px-3 py-3 font-medium transition duration-200 ease-linear border focus:z-10 focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-opacity-20 focus:ring-rose-500 rounded-t-xl border-base-700 bg-base-850 hover:bg-base-800 focus:bg-base-800"
            />
            <input
               type="text"
               placeholder="Username"
               className="relative block w-full px-3 py-3 font-medium transition duration-200 ease-linear border focus:z-10 focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-opacity-20 focus:ring-rose-500 border-base-700 bg-base-850 hover:bg-base-800 focus:bg-base-800"
            />
            <input
               type="email"
               placeholder="Email"
               className="relative block w-full px-3 py-3 font-medium transition duration-200 ease-linear border focus:z-10 focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-opacity-20 focus:ring-rose-500 border-base-700 bg-base-850 hover:bg-base-800 focus:bg-base-800"
            />
            <input
               type="password"
               placeholder="Password"
               className="relative block w-full px-3 py-3 font-medium transition duration-200 ease-linear border focus:z-10 focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-opacity-20 focus:ring-rose-500 rounded-b-xl border-base-700 bg-base-850 hover:bg-base-800 focus:bg-base-800"
            />
         </div>
         <div className="mt-7">
            <button className="relative w-full py-3 font-semibold transition duration-200 ease-linear rounded-lg shadow hover:bg-rose-500 bg-rose-600">
               Register
               <div className="absolute inset-y-0 flex items-center right-5">
                  <span className="opacity-75">
                     <i className="fa-regular fa-user-unlock"></i>
                  </span>
               </div>
            </button>
         </div>
      </div>
   );
};

export default Register;
