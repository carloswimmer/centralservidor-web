import React, { createContext, useCallback, useContext, useState } from 'react';
import api from '../services/api';

import { SignInFormData } from '../pages/SignIn/SingInForm';

interface AuthState {
  token: string;
}

interface AuthContextData {
  token: string;
  signIn(credentials: SignInFormData): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = sessionStorage.getItem('@Central:token');

    if (token) {
      return { token };
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

    sessionStorage.setItem('@Central:token', token);
    setData({ token });
  }, []);

  return (
    <AuthContext.Provider value={{ token: data.token, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
