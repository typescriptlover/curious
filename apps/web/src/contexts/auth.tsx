import { createContext, useContext, useState } from 'react';
import { IAuthContext, IAuthContextForce } from '../types/interfaces';
import { TAuth } from '../types/types';

export const AuthContext = createContext<any>({
   auth: false,
   updateAuth: () => {},
});

interface Props {
   children: React.ReactNode;
   auth: TAuth;
}

export const AuthProvider: React.FC<Props> = (props) => {
   const [auth, setAuth] = useState<IAuthContext>({
      auth: props.auth ?? false,
      updateAuth: (newAuth) => {
         setAuth({
            ...auth,
            auth: newAuth,
         });
      },
   });

   return (
      <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
   );
};
export const useAuth = <T extends IAuthContext | IAuthContextForce>() =>
   useContext(AuthContext) as T;
export const AuthConsumer = AuthContext.Consumer;
