import React, { useContext, useEffect } from 'react'
import axios from 'axios';
import Context from '../context/Context';
import {Link } from 'react-router-dom';

const Favoritos = () => {
    
    const {listaFavoritos, dispatchFav, cookies, perfil, desmarcarFavorito} = useContext(Context)
    
    useEffect(() => {
     
      const userEmail = perfil.email;
    
      axios.get('http://localhost:5000/api/conseguirfavoritos', {
          params: {
            userEmail: userEmail
          }
      })
      .then(response => {
        dispatchFav({ type: "GET_FAV", payload: response.data });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    }, [dispatchFav]);
    
    return (
        <div>
            {listaFavoritos?.items?.length ? (
            <div><h1>Resultados de la Búsqueda</h1>
            <ul> {listaFavoritos.items.map((cancion) => (
                <li key={cancion.id}><Link to={`/cancion?nombre=${cancion.nombre}`} >{cancion.nombre}, {cancion.autor}</Link>
                <button onClick={() => desmarcarFavorito(cancion.id)}>Desmarcar favorito</button></li>
            ))}
            </ul></div>)
            : (<div><h1>No se han encontrado canciones</h1></div>)}
        </div>
    );
}

export default Favoritos