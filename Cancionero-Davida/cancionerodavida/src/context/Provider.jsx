import React, { useEffect, useReducer, useState } from 'react'
import Context from './Context'
import { useGoogleLogin, googleLogout} from "@react-oauth/google"
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import busquedaReducer from '../backend/busquedaReducer'
import favoritosReducer from '../backend/favoritosReducer.jsx'
import listaReducer from "../backend/listaReducer.jsx"
import cancionesListaReducer from '../backend/cancionesListaReducer.jsx'
import { useCookies } from 'react-cookie'


const Provider = ({children}) => {
  
  // Login y gestion de perfil
  const [cookies, setCookie, removeCookie] = useCookies("perfil")
  const [perfil, setPerfil] = useState(cookies.perfil || null)
  

  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      const userInfo = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${codeResponse.access_token}`,
            Accept: 'application/json'
          }
        }
      );
      setPerfil(userInfo.data);
      setCookie('perfil', userInfo.data, {path:"/"});},
    onError: (error) => console.log("Login Failed:", error)
  });

  const logout = () => {
    googleLogout();
    setPerfil(null)
    removeCookie("perfil", { path: "/"})
  };

  useEffect(() => {
    if (cookies.perfil) {
      setPerfil(cookies.perfil);
    }
  }, [cookies])

  // Buscador 

  const [inputValue, setInputValue] = useState("");
  const [selectValue, setSelectValue] = useState("nombre");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  }

  const handleSelectChange = (event) => {
    setSelectValue(event.target.value);
  }

  const navigate = useNavigate()

  // Resultado de búsqueda

  const [busqueda, dispatch] = useReducer(busquedaReducer, { items: [] });

  // Renderizado en el componente

  // Favoritos

    // Lista de favoritos

  const [listaFavoritos, dispatchFav] = useReducer(favoritosReducer, { items: [] });


    // Marcar Favorito

  const marcarFavorito = async (cancion_id) => {
  

    if (!perfil) {
      alert("No has iniciado sesión")
      return
    }

      const id = cancion_id;
      const email = perfil.email
      axios.post("http://localhost:5000/api/favoritos", {
        email: email,
        songID: id,
      })
      .then (response => {
      console.log('Canción marcada como favorita:', response.data);
      dispatchFav({ type: "SET_FAVS", payload: response.data})
      })
      .catch (error => {
        console.error('Error al marcar como favorito:', error); })}

    // Desmarcar favorito

  const desmarcarFavorito = (cancion_id) => {
    if (!perfil) {
      alert("No has iniciado sesión");
      return;
    }
    const id = cancion_id;
    console.log(id);
          
    axios.delete("http://localhost:5000/api/favoritos", {
    headers: { 'Content-Type': 'application/json' },
    data: {
      email: perfil.email,
      songID: id,
    }
    })
    .then(response => {
      console.log('Canción desmarcada como favorita:', response.data);
      dispatchFav({ type: "DELETE_FAV", payload: id});
    })
    .catch(error => {
      console.error('Error al desmarcar como favorito:', error);
    });
    };
    
    // El renderizado de la lista está en el componente
        
  // LISTAS

    const [listas, dispatchLista] = useReducer(listaReducer, { items: []})

    // CREAR LISTA

  const [nombreLista, setNombreLista] = useState("");

  const nombreListaChange = (event) => {
  setNombreLista(event.target.value);
}

  // Crear lista

  const crearLista = () => {

    axios.post('http://localhost:5000/api/listas', {
      userEmail: perfil.email,
      nombreLista: nombreLista 
    })
    .then(response => {
      console.log("Lista creada con éxito:", response.data)
      dispatchLista({type: "ADD_LIST", payload: response.data})
    })
    .catch(error => {
      console.error("Error al crear lista:", error)
    })
  }      

  // Borrar Lista

  const borrarLista = (lista_id) => {
    const id = lista_id
    axios.delete("http://localhost:5000/api/listas", {
      headers: { "Content-Type": "application/json" },
      data: { listaID: id }
    })
    .then(response => {
      dispatchLista({type: "DELETE_LIST", payload: id})
      console.log("Lista borrada con éxito")
    })
    .catch(error => {
      console.error("Error al borrar lista:", error)
    })
  }

  // Canciones dentro de la lista

  const [cancionesLista, dispatchCancionesLista] = useReducer(cancionesListaReducer, { items: []})

  return (
    <Context.Provider value={{
        login, logout, inputValue, setInputValue, selectValue, setSelectValue, handleInputChange, handleSelectChange,
        navigate, busqueda, dispatch, marcarFavorito, desmarcarFavorito, cookies, perfil, setPerfil, crearLista, nombreListaChange, listaFavoritos, dispatchFav,
        listas, dispatchLista, borrarLista, setNombreLista, cancionesLista, dispatchCancionesLista
    }}>
        {children}
    </Context.Provider>
  )
}

export default Provider