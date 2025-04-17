import {AuthContext} from './AuthContext';
//import { ReactNode } from 'react';

interface authProviderProps {
  children: React.ReactNode;
}
// Se indica que Children es un nodo de React. 
export const AuthProvider = ({ children }: authProviderProps) => {
  return (
    <AuthContext.Provider value={{}}>
      {children}
    </AuthContext.Provider>
  );
}