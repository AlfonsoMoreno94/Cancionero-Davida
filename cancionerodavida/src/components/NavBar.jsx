import React from 'react'
import {NavLink} from "react-router-dom"
import { googleLogout } from '@react-oauth/google';



const NavBar = () => {
  return (
    <nav>
        <NavLink to="/inicio">Buscar</NavLink>
        <button>Iniciar sesión</button>
        <button onClick={googleLogout()}>Cerrar sesión</button>
        <NavLink to="/favoritos">Favoritos</NavLink>
        <NavLink to="/listas">Listas</NavLink>
    </nav>
  )
}

export default NavBar