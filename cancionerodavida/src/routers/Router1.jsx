import {Routes, Route, Navigate} from "react-router-dom"
import Inicio from "../pages/Inicio"
import Cancion from "../pages/Cancion"
import Login from "../pages/Login"
import Router2 from "./Router2"
import NavBar from "../components/NavBar"

const Router1 = () => {
  return (
    <>
    <NavBar/>
    <Routes>
      <Route path="/inicio" element={<Inicio/>}/>
      <Route path="/cancion/:cancion" element={<Cancion/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/*" element={<Router2/>}/>
      <Route path="/" element={<Navigate to="/inicio"/>}/>
    </Routes>
    </>
  )
}

export default Router1