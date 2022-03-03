import { createContext, ReactNode, useState } from "react";
import { LoginModel } from "../models/loginModel";
import axios from "../services/axios";
import { auth, firebase } from "../services/firebase";

type User = {
  id: string;
  name?: string;
  email?: string;
  admin?: boolean;
  created?: string;
  updated?: string;
  avatar?: string ;
}

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState<User>();

  // useEffect(() => {
  //   async function getUser() {
  //     try {
  //       const { data } = await axios.get('/user');
  //       setUser(data);
  //       console.log(data);
  //       console.log(data)
  //     } catch(e) {
  //       console.log(e)
  //     } 
  //   }
  //   getUser();
  // }, [])

  async function signInWithEmail(email: string, password: string) {
    await axios.post(`/login`, { email, password } as LoginModel).then((response) => {
      const { data } = response;
      let token = `Bearer ${data.token}`;
      axios.defaults.headers.common = {'Authorization': token};
      setUser({
        id: data.user.id,
        name: data.user.name,
      })
    });
  }

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    console.log('provider',provider)

    const result = await auth.signInWithPopup(provider);
    console.log('result',result)
    if (result.user) {
      const { displayName, photoURL, uid } = result.user

      if (!displayName || !photoURL) {
        throw new Error('Missing information from Google Account.');
      }

        axios.defaults.headers.common = {'Authorization': 'google_auth'};
     
      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })
    }
  }
  
  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, signInWithEmail }}>
      {props.children}
    </AuthContext.Provider>
  );
}