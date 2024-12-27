import React, { useContext, useEffect } from 'react'
import Context from '../context/Context'
import Login from './Login'

const Inicio = () => {
  const {handleInputChange, handleSelectChange, navigate, inputValue, selectValue} = useContext(Context)
  
const handleSubmit = (event) => {
  event.preventDefault();
  navigate(`/buscar?type=${selectValue}&valor=${inputValue}`)
  
}

  return (
    <div className='bodyInicio'>
      <div className="cajaInicio">
        <form onSubmit={handleSubmit}>
          <label>¿Qué canción buscas?</label>
          <input type="text" placeholder='Busca una cancion' onChange={handleInputChange}/>
          <select id="type" name="type" onChange={handleSelectChange} defaultValue={"nombre"}>
            <option value="nombre" >Nombre</option>
            <option value="autor">Autor</option>
            <option value="tipo">Otras categorías</option>
            </select>
          <button type="submit">Buscar</button>
        </form>
      </div>
      <br/>
      <br/>
      <Login/>
    </div>
  )
}

export default Inicio