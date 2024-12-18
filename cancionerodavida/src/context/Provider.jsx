import React, { useEffect, useState } from 'react'
import Context from './Context'
import { useGoogleLogin, googleLogout} from "@react-oauth/google"
import axios from "axios"

//Base de datos provisional

const canciones = [{
    nombre: "Buena Madre",
    letra: "Buena Madre, estoy aquí...",
    autor: "Hermanos maristas"
},{
    nombre: "Bienaventuranzas",
    letra: "Felices somos en la pobreza...",
    autor: "Brotes de Olivo"
}]





const Provider = ({children}) => {
  
  // Login y gestion de perfil
  const [user, setUser ] = useState([]);
  const [ profile, setProfile ] = useState([]);
  
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error) 
  });

  useEffect(
    () => {
      if (user) {
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: "application/json"
          }
      })
      .then((res) => {
        setProfile(res.data);
      })
      .catch((err) => console.log(err));
      }
    }, [ user, setProfile]
  );

  const logout = () => {
    googleLogout();
    setProfile(null);
  };

  
  return (
    <Context.Provider value={{
        canciones, login, logout, profile
    }}>
        {children}
    </Context.Provider>
  )
}

export default Provider