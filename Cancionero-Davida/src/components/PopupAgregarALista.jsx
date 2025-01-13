import React, { useContext, useState } from 'react';
import { createPortal } from "react-dom";
import Context from '../context/Context';
import PopupCrearLista from "./PopupCrearLista";

const PopupAgregarALista = ({cancionID}) => {
  const { listas, handleSubmitAgregarALista,isCrearListaOpen, setCrearListaOpen, setSelectLista, selectLista } = useContext(Context);
  
  const [isPopupOpen, setPopupOpen] = useState(false);

  const openPopup = () => {
    setPopupOpen(true);
    document.body.classList.add('open');
  };

  const closePopup = () => {
    setPopupOpen(false);
    setCrearListaOpen(false);
    document.body.classList.remove('open');
  };

  const handleCrearLista = (e) => {
    e.stopPropagation();
    setCrearListaOpen(true);
    setPopupOpen(false);
  };

  const handleSelectListaChange = (event) => {
    setSelectLista(event.target.value);
  }

  const modalContent = (
    <form className='ventana-popup' onSubmit={(e) => {
      handleSubmitAgregarALista(e, cancionID);
      closePopup();
    }}>
      <div className='contenido-popup'>
        {listas?.items?.length ? (
          <>
            <select value={selectLista} onChange={handleSelectListaChange}>
              <option value="" disabled hidden>Selecciona una opción</option>
              {listas.items.map((lista, index) => (
                <option value={lista.id} key={index}>{lista.nombre}</option>
              ))}
            </select> 
            <button className='button2' type="submit">Añadir a lista</button>
          </>
        ) : (
          <>
            No hay listas creadas
            <button className="button2" onClick={handleCrearLista}>Crear Lista</button>
          </>
        )}
        <div></div>
        <button className="button2" onClick={closePopup}>Cancelar</button>
      </div>
    </form>
  );

  return (
    <>
      <button className="button2" onClick={openPopup}>Añadir a lista</button>
      {isPopupOpen && createPortal(
        <>
          {React.cloneElement(modalContent, { className: "ventana-popup open" })}
          <div className='backdrop open' onClick={closePopup}></div>
        </>,
        document.getElementById('portal')
      )}
      {isCrearListaOpen && createPortal(
        <>
        <PopupCrearLista segundoPopup={true}/>
        <div className='backdrop open' onClick={closePopup}></div>
        </>,
        document.getElementById("portal")
      )}
    </>
  );
}

export default PopupAgregarALista;