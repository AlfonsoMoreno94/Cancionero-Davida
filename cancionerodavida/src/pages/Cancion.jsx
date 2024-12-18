import React, { useContext } from 'react'
import {useParams} from "react-router-dom"
import Context from '../context/Context'

const Cancion = () => {
  const {cancion} = useParams()
  const {canciones} = useContext(Context)

  const buscarCancion = (song) => {
    return song.nombre.toLowerCase() === cancion.toLowerCase()
  }

  const cancionEncontrada = canciones.find(song => buscarCancion(song))

  if (!cancionEncontrada) { return <div><p>Canción no encontrada</p></div>; }
  
  console.log(cancion)
  console.log(canciones)
  console.log(cancionEncontrada)
  
  return (
    <div><h1>{cancionEncontrada.nombre} de {cancionEncontrada.autor}</h1>
      <p>{cancionEncontrada.letra}</p></div>
  )
}

export default Cancion