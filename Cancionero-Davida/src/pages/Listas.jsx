import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import Context from '../context/Context';
import {Link } from 'react-router-dom';
import PopupCrearLista from '../components/PopupCrearLista';
import { getListas } from '../backend/client';

const Listas = () => {
    
  const {listas, dispatchLista, perfil, borrarLista, crearLista} = useContext(Context)

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const response = await getListas(perfil.email)
        dispatchLista({ type: "GET_LISTS", payload: response});
      
      } catch (error) {
        console.error("Error getting lists:", error);
    }
  };
  
  fetchDatos();
}, [dispatchLista, perfil.email]);


    return (
      <div className='bodyInicio'>
          {listas?.items?.length ? (
          <div className='bodyListas'><h1>Tus listas</h1>
            {listas.items.map((lista, index) => (
              <div className='grid-container-3'>
                <div key={lista.id}><Link to={`/listas/${lista.nombre}`} className='canciones-encontradas'>{lista.nombre}</Link></div>
                <div><button className="button2" onClick={() => borrarLista(lista.id)}>Borrar lista</button></div>
              </div>
          ))}
          </div>)
          : (<div><h1>No se han encontrado listas</h1></div>)}
          <PopupCrearLista/>
          <div id="portal"></div>
      </div>
  );
}

export default Listas