"use client";

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { firebaseApp } from "@/lib/firebase";
import { User } from "@/model/User";
import { FirebaseError } from "firebase/app";

interface AuthContextValue {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  user?: User;
}

const authContext = createContext({} as AuthContextValue);

const auth = getAuth(firebaseApp);

interface AuthContextProviderProps {
  children: ReactNode;
}
export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User | undefined>();
  const signIn = useCallback(async (email: string, password: string) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    setUser({
      displayName: result.user.displayName,
      email: result.user.email,
      uid: result.user.uid,
    });
  }, []);
  const signUp = useCallback(async (email: string, password: string) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    setUser({
      displayName: result.user.displayName,
      email: result.user.email,
      uid: result.user.uid,
    });
  }, []);
  const signOut = useCallback(async () => {
    await firebaseSignOut(auth);
    setUser(undefined);
  }, []);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (snapshot) => {
      if (!!snapshot) {
        setUser({
          displayName: snapshot.displayName,
          email: snapshot.email,
          uid: snapshot.uid,
        });
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <authContext.Provider value={{ signIn, signUp, user, signOut }}>
      {children}
    </authContext.Provider>
  );
}

export function useAuth() {
  return useContext(authContext);
}
