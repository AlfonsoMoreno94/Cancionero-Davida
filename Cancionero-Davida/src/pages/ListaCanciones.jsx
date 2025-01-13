import React, { useContext, useEffect } from 'react'
import Context from '../context/Context';
import { Link, useParams } from 'react-router-dom';
import { getCancionesLista } from '../backend/client';

const ListaCanciones = () => {
    const { perfil, cancionesLista, quitarCancion, dispatchCancionesLista} = useContext(Context)
    const {nombre} = useParams()

    useEffect (() => {

        const fetchData = async () => {
            const response = await getCancionesLista(nombre, perfil.email) 
            dispatchCancionesLista({type: "GET_CANCIONES", payload: response})
        }
        fetchData()
    }, [dispatchCancionesLista, perfil.email, nombre])

    return (
    <div className='bodyInicio'>
        {cancionesLista?.items?.length ? (
        <div><h1>Canciones favoritas</h1>
        <div className='grid-container-2'>
            <h2>Título</h2>
            <h2>Autor</h2></div>
            <div className="grid-container-2">
        {cancionesLista.items.map((cancion) => (
            <React.Fragment key={cancion.id}>
            <Link className="canciones-encontradas" to={`/cancion?nombre=${cancion.nombre}`}>{cancion.nombre}</Link>
            <div className="autores-encontrados">{cancion.autor}</div>
            <button className="button2" onClick={() => quitarCancion(cancion.id, nombre)}>Quitar de la lista</button>
            </React.Fragment>    
            ))}
        </div></div>)
        : (<div><h1>La lista está vacía</h1></div>)}
    </div>
    );
}


export default ListaCanciones