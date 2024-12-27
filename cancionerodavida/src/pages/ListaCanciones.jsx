import React, { useContext, useEffect, useReducer, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Context from '../context/Context'
import axios from 'axios'

const ListaCanciones = () => {
  
    const { perfil, dispatchCancionesLista, ListaCanciones } = useContext(Context)
    const [searchParams] = useSearchParams()


    useEffect (() => {
        const listaNombre = searchParams.get("lista_Nombre")
        const userEmail = perfil.email
        
        axios.get("http://localhost5000/api/listacanciones", {
            params: {
                listaNombre: listaNombre,
                userEmail:userEmail
            }
        })
        .then(response => {
            dispatchCancionesLista({type: "GET_CANCIONES", payload: response.data})
        })
        .catch(error => {
            console.error("Error consiguiendo canciones:", error)
        })
    }, [dispatchCancionesLista])
  
    return (
    <div>ListaCanciones</div>
  )
}

export default ListaCanciones