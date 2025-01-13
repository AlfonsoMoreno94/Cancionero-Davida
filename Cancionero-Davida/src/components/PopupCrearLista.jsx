import React, { useContext } from 'react';
import { createPortal } from "react-dom";
import Context from '../context/Context';

const PopupCrearLista = ({segundoPopup=false}) => {
  const { nombreListaChange, handleSubmitCrearLista,isCrearListaOpen, setCrearListaOpen } = useContext(Context);
  
  const openPopup = () => {
    setCrearListaOpen(true);
  };

  const closePopup = () => {
    setCrearListaOpen(false);
    document.body.classList.remove('open');
  }

  const modalContent = (
    <form className='ventana-popup' onSubmit={(e) => {
      handleSubmitCrearLista(e);
      closePopup();
    }}>
      <div className='contenido-popup'>
        <input 
          placeholder='Nombre de la lista' 
          type="text" 
          onChange={nombreListaChange}
        />
        <button className='button2' type="submit">Crear lista</button>
        <div></div>
        <button className="button2"onClick={closePopup}>Cancelar</button>
      </div>
    </form>
  );

  return (
    <>
      {segundoPopup ? (null) : (
      <button className="button2" onClick={openPopup}>Crear lista</button>)}
      {isCrearListaOpen && (
        <>
          {createPortal(
            React.cloneElement(modalContent, { className: `ventana-popup open` }),
            document.getElementById('portal')
          )}
          {createPortal(
            <div className='backdrop open'></div>,
            document.getElementById('portal')
          )}
        </>
      )}
    </>
  );
}

export default PopupCrearLista;