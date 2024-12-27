import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import Context from '../context/Context';
import {Link } from 'react-router-dom';

const Listas = () => {
    
  const {listas, dispatchLista, setNombreLista, cookies, perfil, crearLista, borrarLista} = useContext(Context)

  useEffect(() => {

    const userEmail = perfil.email;
    
    axios.get('http://localhost:5000/api/conseguirlistas', {
      params: {userEmail: userEmail}
    })
    .then(response => {
      dispatchLista({ type: "GET_LISTS", payload: response.data});
    })
    .catch(error => {
      console.error("Error getting lists:", error);
    })
  }, [dispatchLista]);
    

  const nombreListaChange = (event) => {
  setNombreLista(event.target.value);
}


    return (
      <div>
          {listas ? (
          <div><h1>Resultados de la Búsqueda</h1>
          <ul> {listas.items.map((lista, index) => (
              <li key={index}><Link to={`/listas?nombre=${lista.nombre}`} >{lista.nombre}</Link><button onClick={() => borrarLista(lista.id)}>Borrar lista</button></li>
          ))}
          </ul></div>)
          : (<div><h1>No se han encontrado listas</h1></div>)}
          <form onSubmit={crearLista}>
            <input type="text" placeholder="Nombre de la lista" onChange={nombreListaChange}/>
            <button type="submit">Crear nueva lista</button>
          </form>
      </div>
  );
}

export default Listas