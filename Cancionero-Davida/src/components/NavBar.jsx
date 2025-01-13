import React, { useContext } from 'react'
import {NavLink} from "react-router-dom"
import Context from '../context/Context';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const { login, logout, perfil} = useContext(Context)
  
  const navigate = useNavigate();
  
  const clickImagen = () => {
    navigate('/inicio')
  }

  return (
    !perfil ? (
    <nav className='navegador-log'>
        <div className='navegador-log1'>
          <img className="logo-navbar" src='/resources/logosinletra.png' alt="logo sin letra" onClick={clickImagen}/>
          <p className='titulo'>Cancionero Davida</p>
        <NavLink className={({ isActive }) => (isActive ? "boton-navbar active" : "boton-navbar")} to="/inicio">Buscar</NavLink>
        </div>
        <button  className="button1" onClick={login}>Iniciar sesión con Google</button>
    </nav>
    ) : (
      <nav className='navegador-log'>
        <div className='navegador-log1'>
        <img className="logo-navbar" src='/resources/logosinletra.png' alt="logo sin letra" onClick={clickImagen}/>
        <p className='titulo'>Cancionero Davida</p>
        <NavLink className={({ isActive }) => (isActive ? "boton-navbar active" : "boton-navbar")} to="/inicio">Buscar</NavLink>
        <NavLink className={({ isActive }) => (isActive ? "boton-navbar active" : "boton-navbar")} to="/favoritos">Favoritos</NavLink>
        <NavLink className={({ isActive }) => (isActive ? "boton-navbar active" : "boton-navbar")} to="/listas">Listas</NavLink>
        </div>

        <div className='titulo'>Bienvenido, {perfil.name}</div>
        <button className="button1" onClick={logout}>Cerrar sesión</button>
        
    </nav>)
  )
}

export default NavBar