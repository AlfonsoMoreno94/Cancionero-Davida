import React from 'react'

const cancionesListaReducer = (state, action) => {
    switch (action.type) {
    case "ADD_CANCIONES":
        return { ...state, items: action.payload};
    case "GET_CANCIONES":
        return {items: action.payload};
    case "DELETE_CANCIONES":
        return {...state, items: state.items.filter(item => item.id !== action.payload)}
    default: return state;
  }
};

export default cancionesListaReducer