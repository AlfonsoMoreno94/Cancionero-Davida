import React, { useContext, useEffect } from 'react'
import axios from 'axios';
import Context from '../context/Context';
import {Link, useSearchParams } from 'react-router-dom';

const Buscar = () => {
    
    const {busqueda, dispatch} = useContext(Context)
    const [searchParams] = useSearchParams()
    
    useEffect(() => {
        const tipo = searchParams.get("type")
        const valor = searchParams.get("valor")
        
        if (tipo && valor) {
            axios.get('http://localhost:5000/api/buscar', {
                params: {
                    type: tipo,
                    valor: valor
                }
            })
            .then(response => {
                console.log(response)
                dispatch({ type: "SET_ITEMS", payload: response.data });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            })
        }}, [dispatch, searchParams]);

    return (
        <div>
            {busqueda ? (
            <div><h1>Resultados de la Búsqueda</h1>
            <ul> {busqueda.items.map((cancion, index) => (
                <li key={cancion.id}><Link to={`/cancion?nombre=${cancion.nombre}`} >{cancion.nombre}</Link></li>
            ))}
            </ul></div>)
            : (<div><h1>No se han encontrado canciones</h1></div>)}
        </div>
    );
};

export default Buscar