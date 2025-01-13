import React, { useContext, useEffect, useState, useRef } from 'react'
import'../index.css'
import {useSearchParams} from "react-router-dom"
import Context from '../context/Context'
import {getCancion, getFavoritos, getListas} from "../backend/client.js"
import PopupAgregarALista from '../components/PopupAgregarALista'
import axios from 'axios'

const Cancion = () => {
  const {busqueda, dispatch, marcarFavorito, desmarcarFavorito, dispatchFav, perfil, dispatchLista, setPerfil} = useContext(Context)
  const [searchParams] = useSearchParams()
  const botonFavorito = useRef()
  const botonDesfavorito= useRef()
  const [esFav, setEsFav] = useState("false")

  const handleButtons = () => {
    if(botonFavorito.current){
    botonFavorito.current.className = `buttonVisible ${esFav === "true" ? 'button2 buttonHidden' : ''} button2`;}
    if (botonDesfavorito.current) {
    botonDesfavorito.current.className = `buttonVisible ${esFav === "true" ? '' : ' button2 buttonHidden'} button2`;}
  };
  
  
  useEffect(() => {
    const fetchDatos= async () => {
    try {
    

      const nombre = searchParams.get("nombre")

      const response1 = await getCancion(nombre)
      dispatch({ type: "GET_ITEMS", payload: response1 });

      if (perfil) {
        const response2 = await getFavoritos(perfil.email)
          dispatchFav({ type: "GET_FAV", payload: response2 });

        const response3 = await axios.get('http://localhost:5000/api/esfavorito', {
            params: {
              lista: response2,
              cancionID: response1}})
          
        setEsFav(response3.data.toString())
        handleButtons()

        const response4 = await getListas(perfil.email)
            dispatchLista({ type: "GET_LISTS", payload: response4});
        }
            
        } catch (error) {
          console.error('Error en las primeras llamadas:', error);
        }
      };

      fetchDatos();
    }, [searchParams, perfil, dispatchFav, dispatch])

  const toggleFavorite = (cancionId) => {
    if (esFav === "false") {
      marcarFavorito(cancionId);
      setEsFav("true");
    } else {
      desmarcarFavorito(cancionId);
      setEsFav("false");
    }
    handleButtons();
  };

  if (!busqueda) {return <div><p>Canción no encontrada</p></div>;
  }
   else {
     return (
       <div>
         {busqueda.items.map((cancion, index) => (
           <div key={cancion.id} className='song-template'>
             <div><h1>{cancion.nombre} de {cancion.autor}</h1></div>
             <div className='espacio-boton'>
             {perfil && (
               <>
                 {esFav === "false" ? (
                   <button className="button2" ref={botonFavorito} onClick={() => toggleFavorite(cancion.id)}>Marcar como favorito</button>
                 ) : (
                   <button className="button2" ref={botonDesfavorito} onClick={() => toggleFavorite(cancion.id)}>Desmarcar favorito</button>
                 )}
                 <PopupAgregarALista cancionID = {cancion.id}/>
               </>
               )}
             
             </div>
             <div className='caja-letra'>
             {cancion.letra.split("/n").map((line, lineIndex) => (
               <span key={lineIndex}>{line}<br /></span>))}
           </div>
           </div>
         ))}
       </div>
     );
   }}
 
 export default Cancion