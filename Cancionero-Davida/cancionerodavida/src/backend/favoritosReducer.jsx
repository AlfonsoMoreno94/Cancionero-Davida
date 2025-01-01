import React from 'react'

const favoritosReducer = (state = { items: [] }, action) => {
    switch (action.type) {
        case "SET_FAVS":
            return { ...state, items: action.payload};
        case "GET_FAV":
            return {items: action.payload};
        case "DELETE_FAV":
            return {...state, items: state.items.filter(item => item.id !== action.payload)}
        default:
            return state;
  }
};

export default favoritosReducer