import React from 'react'
import {Route, Routes} from "react-router-dom"
import Favoritos from "../pages/Favoritos"
import Listas from "../pages/Listas"

const Router2 = () => {
  return (
    <>
    <Routes>
        <Route path="/favoritos" element={<Favoritos/>}/>
        <Route path="/listas" element={<Listas/>}/>
    </Routes>
    </>
  )
}

export default Router2