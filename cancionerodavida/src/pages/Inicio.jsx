import React from 'react'

const Inicio = () => {
  return (
    <div className='bodyInicio'>
      <div className="cajaInicio">
        <h1>¿Qué canción buscas?</h1>
        <input type="text" placeholder='Busca una cancion'/>
        <button>Buscar</button>
        <button>Iniciar sesión</button>
      </div>
    </div>
  )
}

export default Inicio