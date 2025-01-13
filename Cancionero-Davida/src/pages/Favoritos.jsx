import React, { useContext, useEffect } from 'react'
import Context from '../context/Context';
import {Link } from 'react-router-dom';
import { getFavoritos } from '../backend/client';

const Favoritos = () => {
    
    const {listaFavoritos, dispatchFav, perfil, desmarcarFavorito} = useContext(Context)
    
    useEffect(() => {
      const fetchData = async () => {
        try {
        const response = await getFavoritos(perfil.email)
        dispatchFav({ type: "GET_FAV", payload: response });
      } catch (error) {
        console.error('Error fetching data:', error);
      }};

      fetchData()
    }, [dispatchFav, perfil.email]);
    
    return (
        <div className='bodyInicio'>
            {listaFavoritos?.items?.length ? (
            <div><h1>Canciones favoritas</h1>
            <div className='grid-container-2'>
              <h2>Título</h2>
              <h2>Autor</h2></div>
              <div className="grid-container-2">
            {listaFavoritos.items.map((cancion) => (
                <React.Fragment key={cancion.id}>
                <Link className="canciones-encontradas" to={`/cancion?nombre=${cancion.nombre}`}>{cancion.nombre}</Link>
                <div className="autores-encontrados">{cancion.autor}</div>
                <button className="button2" onClick={() => desmarcarFavorito(cancion.id)}>Desmarcar favorito</button>
              </React.Fragment>
                
            ))}
            </div></div>)
            : (<div><h1>No se han encontrado canciones</h1></div>)}
        </div>
    );
}

export default Favoritos