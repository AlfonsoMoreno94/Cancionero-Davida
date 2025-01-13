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
import {postUsuario, postFavoritos, getFavoritos, getListas, postCancionesLista, deleteFavoritos, deleteCancionesLista, postLista, deleteLista } from "../backend/client.js"


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
      console.log("UserInfo:", userInfo.data)
      setPerfil(userInfo.data);
      setCookie('perfil', userInfo.data, {path:"/"});
      postUsuario(userInfo.data.name, userInfo.data.email)},
      
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

    try {

    await postFavoritos(email, id)
    const response = await getFavoritos(email)
    dispatchFav({ type: "GET_FAV", payload: response });
    } catch (error) {
        console.error('Error al marcar como favorito:', error); }}

    // Desmarcar favorito

  const desmarcarFavorito = async (cancion_id) => {
    if (!perfil) {
      alert("No has iniciado sesión");
      return;
    }
    try  {
    const id = cancion_id;
    await deleteFavoritos(perfil.email, id)
    console.log('Canción desmarcada como favorita:');
    dispatchFav({ type: "DELETE_FAV", payload: id});
    } catch (error) {
      console.error('Error al desmarcar como favorito:', error);
    };}
    
    // El renderizado de la lista está en el componente
        
  // LISTAS

    const [listas, dispatchLista] = useReducer(listaReducer, { items: []})

    // CREAR LISTA

  const [nombreLista, setNombreLista] = useState("");

  const nombreListaChange = (event) => {
  setNombreLista(event.target.value);
}

  // Crear lista

  const [isCrearListaOpen, setCrearListaOpen] = useState(false); // Para el Popup

  const crearLista = async (email, nombreLista) => {

    await postLista(email, nombreLista)
    
    const response2 = await getListas(perfil.email)
    console.log("response2:", response2)
    dispatchLista({ type: "GET_LISTS", payload: response2});
  }    
  
  const handleSubmitCrearLista = (e) => {
    e.preventDefault();
    crearLista(perfil.email, nombreLista);
    };

  // Borrar Lista

  const borrarLista = async (lista_id) => {
    const id = lista_id
    try {
    await deleteLista(id)
    dispatchLista({type: "DELETE_LIST", payload: id})
      console.log("Lista borrada con éxito")
    } catch (error) {
      console.error("Error al borrar lista:", error)
    }}

  // Canciones dentro de la lista

  const [cancionesLista, dispatchCancionesLista] = useReducer(cancionesListaReducer, { items: []})
  const [selectLista, setSelectLista] = useState("");



  const quitarCancion = async (cancionID, listaNombre) => {
    try {
      await deleteCancionesLista(listaNombre, cancionID, perfil.email)
      dispatchCancionesLista({type: "DELETE_CANCIONES", payload: cancionID})
      console.log("Canción borrada con éxito")
    } catch (error) {
      console.error("Error al borrar lista:", error)
    }
  }

  const añadirCancion = async (cancionID) => {
    if (!perfil) {
      alert("No has iniciado sesión");
      return;
    }
  
    const cancion_id = cancionID;
    const listaID = selectLista;
  
    try {
      await postCancionesLista(listaID, cancion_id)
  
      console.log('Canción añadida');
      alert("Canción añadida con éxito");
  
    } catch (error) {
      console.error('Error al añadir la canción:', error);
    }
  };
      

  const handleSubmitAgregarALista = (e, cancionID) => {
    e.preventDefault();
    añadirCancion(cancionID);
  }

  return (
    <Context.Provider value={{
        login, logout, inputValue, setInputValue, selectValue, setSelectValue, handleInputChange, handleSelectChange,
        navigate, busqueda, dispatch, marcarFavorito, desmarcarFavorito, cookies, perfil, setPerfil, crearLista, nombreListaChange, listaFavoritos, dispatchFav,
        listas, dispatchLista, borrarLista, setNombreLista, cancionesLista, dispatchCancionesLista, quitarCancion, handleSubmitCrearLista, handleSubmitAgregarALista,
        isCrearListaOpen, setCrearListaOpen, setSelectLista, selectLista
    }}>
        {children}
    </Context.Provider>
  )
}

export default Provider