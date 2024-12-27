import React, { useContext } from 'react'
import {NavLink} from "react-router-dom"
import { googleLogout } from '@react-oauth/google';
import Context from '../context/Context';

const NavBar = () => {
  const { login } = useContext(Context)
  
  return (
    <nav>
        <NavLink to="/inicio">Buscar</NavLink>
        <button onClick={login}>Iniciar sesión</button>
        <button onClick={googleLogout()}>Cerrar sesión</button>
        <NavLink to="/favoritos">Favoritos</NavLink>
        <NavLink to="/listas">Listas</NavLink>
    </nav>
  )
}

export default NavBar