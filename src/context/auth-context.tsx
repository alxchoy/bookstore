import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import {
  UserForm,
  IAuthContext,
  IAuthStatus,
  IUserState,
} from '../components/auth';

type AuthProviderProps = { children: React.ReactNode };

const AuthContext = React.createContext<IAuthContext | null>(null);

function AuthProvider({ children }: AuthProviderProps) {
  const [authStatus, setAuthStatus] = React.useState<IAuthStatus>({
    isLoading: false,
  });
  const [user, setUser] = React.useState<IUserState | null>(null);

  console.log(user);

  const authLogin = async ({ email, password }: UserForm) => {
    setAuthStatus({ isLoading: true });
    const userResponse = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    console.log(userResponse);
    setAuthStatus({ isLoading: false });
  };

  const authRegister = async ({ email, password }: UserForm) => {
    setAuthStatus({ isLoading: true });
    const userResponse = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    console.log(userResponse);
    setAuthStatus({ isLoading: false });
  };

  const authLogout = async () => {
    console.log('logout');
    await firebase.auth().signOut();
    setUser(null);
  };

  React.useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((res) => {
      console.log(res);
      if (res) {
        const user: IUserState = {
          email: res.email || '',
          emailVerified: res.emailVerified,
          uid: res.uid,
        };
        setUser(user);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{ authLogin, authRegister, authLogout, user, authStatus }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
}

export { useAuth, AuthProvider };
