import React from 'react'

const favoritosReducer = (state = { items: [] }, action) => {
    switch (action.type) {
        case "GET_LISTS":
            return {items: action.payload};
        case "ADD_LIST":
            return { ...state, items: action.payload};
        case "DELETE_LIST":
            return {...state, items: state.items.filter(item => item.id !== action.payload)}
        default:
            return state;
  }
};

export default favoritosReducer