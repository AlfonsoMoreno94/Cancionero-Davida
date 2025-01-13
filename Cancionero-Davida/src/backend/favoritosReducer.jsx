import React from 'react'

const favoritosReducer = (state = { items: [] }, action) => {
    switch (action.type) {
        case "SET_FAVS":
            return { ...state, items: action.payload};
        case "GET_FAV":
            return {items: action.payload};
        case "DELETE_FAV":
            state = {...state, items: state.items.filter(item => item.id !== action.payload)}
            return state 
        default:
            return state;
  }
};

export default favoritosReducer