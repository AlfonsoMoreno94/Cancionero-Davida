import React, { useContext } from 'react'
import Context from '../context/Context'

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
          <label className='labelInicio'>¿Qué canción buscas?</label>
          <input type="text" placeholder='Busca una cancion' onChange={handleInputChange} required/>
          <select id="type" name="type" onChange={handleSelectChange} defaultValue={"nombre"}>
            <option value="nombre">Nombre</option>
            <option value="autor">Autor</option>
            </select>
          <button className="button2" type="submit">Buscar</button>
        </form>
      </div>
      <br></br>
      <img className="img-logo" src='/resources/logoconletra.png' alt="logo con letra"/>
    </div>
  )
}

export default Inicio