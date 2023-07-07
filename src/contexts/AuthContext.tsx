"use client";

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
} from "react";
import {
  EmailAuthProvider,
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { firebaseApp } from "@/lib/firebase";

interface AuthContextValue {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
}

const authContext = createContext({} as AuthContextValue);

const emailAuthProvider = new EmailAuthProvider();
const auth = getAuth(firebaseApp);

interface AuthContextProviderProps {
  children: ReactNode;
}
export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const signIn = useCallback(async (email: string, password: string) => {
    const a = await signInWithEmailAndPassword(auth, email, password);
  }, []);
  const signUp = useCallback(async (email: string, password: string) => {
    const a = await createUserWithEmailAndPassword(auth, email, password);
    console.log(a);
  }, []);
  return (
    <authContext.Provider value={{ signIn, signUp }}>
      {children}
    </authContext.Provider>
  );
}

export function useAuth() {
  return useContext(authContext);
}
