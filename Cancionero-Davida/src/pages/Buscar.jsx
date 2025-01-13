import React, { useContext, useEffect } from 'react'
import Context from '../context/Context';
import {getLista} from "../backend/client.js"
import {Link, useSearchParams } from 'react-router-dom';

const Buscar = () => {
    
    const {busqueda, dispatch} = useContext(Context)
    const [searchParams] = useSearchParams()
    
    useEffect(() => {
        const tipo = searchParams.get("type")
        const valor = searchParams.get("valor")
        
        if (tipo && valor) {
            const response = getLista(tipo, valor)
            .then(response => {
                dispatch({ type: "SET_ITEMS", payload: response });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            })
        }}, [dispatch, searchParams]);

    return (
        <div className='bodyInicio'>
  {busqueda.items.length > 0 ? (
    <div>
      <h1>Canciones encontradas</h1>
      <div className='grid-container'>
        <h2>Título</h2>
        <h2>Autor</h2>
        {busqueda.items.map((cancion, index) => (
          <React.Fragment key={cancion.id}>
              <Link className="canciones-encontradas" to={`/cancion?nombre=${cancion.nombre}`}>{cancion.nombre}</Link>

            <div className="autores-encontrados">{cancion.autor}</div>
          </React.Fragment>
        ))}
      </div>
    </div>
  ) : (
    <div>
      <h1>No se han encontrado canciones</h1>
    </div>
  )}
</div>
    );
};

export default Buscar