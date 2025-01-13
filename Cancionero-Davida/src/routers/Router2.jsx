import React, { useContext } from 'react'
import {Navigate, Route, Routes} from "react-router-dom"
import Favoritos from "../pages/Favoritos"
import Listas from "../pages/Listas"
import ListaCanciones from "../pages/ListaCanciones"
import Context from '../context/Context'

const Router2 = () => {

  const {perfil} = useContext(Context)
  return (
    <Routes>
        {perfil ? (
          <>
          <Route path="/favoritos" element={<Favoritos/>}/>
          <Route path="/listas" element={<Listas/>}/>
          <Route path="/listas/:nombre" element={<ListaCanciones/>}/>
          </>
   ) : ( <Route path="/*" element={<Navigate to="/" replace />} />)}
    </Routes>
  )
}

export default Router2