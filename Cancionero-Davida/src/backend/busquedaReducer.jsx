import React from 'react'

const busquedaReducer = (state, action) => {
    switch (action.type) {
    case "SET_ITEMS":
        return { ...state, items: action.payload};
    case "GET_ITEMS":
        return {items: action.payload};
    default: return state;
  }
};

export default busquedaReducer