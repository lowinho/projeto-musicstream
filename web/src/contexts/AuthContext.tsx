import { createContext, ReactNode, useState, useEffect } from "react";
import { LoginModel } from "../models/loginModel";
import axios from "../services/axios";
import { auth, firebase } from "../services/firebase";
import { useHistory } from 'react-router-dom'

type User = {
  id?: number;
  uid?: string;
  name?: string;
  email?: string | null;
  admin?: boolean;
  created?: string;
  updated?: string;
  avatar?: string ;
  login: string;
}

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
  const history = useHistory();
  const [user, setUser] = useState<User>();

  // useEffect(() => {
  //   async function getUser() {
  //     try {
  //       const data = localStorage.getItem('data');
  //       const tokenData = localStorage.getItem('token');
  //       console.log('data', data, tokenData);
  //       let token = tokenData;
  //       // axios.defaults.headers.common = {'Authorization': token};
  //       // setUser(data);
  //     } catch(e) {
  //       console.log(e)
  //     } 
  //   }
  //   getUser();
  // }, [])

  async function signInWithEmail(email: string, password: string) {
    await axios.post(`/login`, { email, password } as LoginModel).then(async (response) => {
      const { data } = response;
      let token = `Bearer ${data.token}`;
      axios.defaults.headers.common = {'Authorization': token};
      const avatar = await axios.get(`/avatar/${data.user.id}`);
      const url: string = avatar.data[0].url;
      localStorage.setItem('token', data.token);
      localStorage.setItem('data', data.user);
      console.log('data', avatar.data);
      setUser({
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        admin: data.user.admin,
        avatar: url,
        login: 'local'
      })
    });
  }

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(provider);

    if (result.user) {
      const { displayName, photoURL, uid, email } = result.user

      if (!displayName || !photoURL) {
        throw new Error('Missing information from Google Account.');
      }
      axios.defaults.headers.common = {'Authorization': 'google_auth'};
      
      console.log(photoURL)
      setUser({
        uid: uid,
        name: displayName,
        email: email,
        avatar: photoURL,
        login: 'google'
      })
    }
    // localStorage.setItem('data', user);
  }

  async function logout() {
    delete axios.defaults.headers.common['Authorization'];
    localStorage.removeItem('data');
    localStorage.removeItem('token');
    history.push('/');
  }
  
  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, signInWithEmail, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
}