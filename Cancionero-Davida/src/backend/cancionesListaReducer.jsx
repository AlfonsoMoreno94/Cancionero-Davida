import React from 'react'

const cancionesListaReducer = (state = { items: [] }, action) => {
    switch (action.type) {
        case "SET_CANCIONES":
            return { ...state, items: action.payload};
        case "GET_CANCIONES":
            return {items: action.payload};
        case "DELETE_CANCIONES":
            state = {...state, items: state.items.filter(item => item.id !== action.payload)}
            return state 
        default:
            return state;
  }
};

export default cancionesListaReducer