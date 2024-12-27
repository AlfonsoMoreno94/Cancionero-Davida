import React, { useContext, useEffect, useState } from 'react'
import {useSearchParams} from "react-router-dom"
import Context from '../context/Context'
import axios from 'axios'

const Cancion = () => {
  const {busqueda, dispatch, marcarFavorito, desmarcarFavorito} = useContext(Context)
  const [searchParams] = useSearchParams()
  
  useEffect(() => {

    const nombre = searchParams.get("nombre")

      axios.get('http://localhost:5000/api/cancion', {
            params: {
                nombre: nombre,
            }
        })
        .then(response => {
            dispatch({ type: "GET_ITEMS", payload: response.data });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        })
    }, [dispatch, searchParams]);



  if (!busqueda) {return <div><p>Canción no encontrada</p></div>;
 }
  else {
  return (
    <div>{busqueda.items.map((cancion, index) => (
    <div key={index}><h1>{cancion.nombre} de {cancion.autor}</h1>
    <button onClick={() => marcarFavorito(cancion.id)}>Favorito</button>
    <button onClick={() => desmarcarFavorito(cancion.id)}>Quitar favorito</button>
    <p>{cancion.letra}</p>
    <p>{cancion.id}</p></div>))} </div>
  )}
}

export default Cancion