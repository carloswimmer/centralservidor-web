import React, { createContext, useCallback, useContext, useState } from 'react';
import api from '../../services/api';
import { getUser, UserData } from './getUser';

import { SignInFormData } from '../../pages/SignIn/SingInForm';

interface AuthState {
  token: string;
  user: UserData;
}

interface AuthContextData {
  token: string;
  user: UserData;
  signIn(credentials: SignInFormData): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = sessionStorage.getItem('@Central:token');
    const user = sessionStorage.getItem('@Central:user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ sshd, password }) => {
    const flatData = `${sshd.toUpperCase()}:${password}`;
    const encodedData = btoa(flatData);

    const response = await api.post('login', null, {
      headers: {
        Authorization: `Basic ${encodedData}`,
      },
    });

    const { token } = response.data;

    const user = getUser(token);

    sessionStorage.setItem('@Central:token', token);
    sessionStorage.setItem('@Central:user', JSON.stringify(user));
    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    sessionStorage.removeItem('@Central:token');
    sessionStorage.removeItem('@Central:user');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{ token: data.token, user: data.user, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
