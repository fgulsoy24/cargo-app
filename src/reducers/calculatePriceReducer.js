import {
    CALCULATE_PRICE
  } from "../actions/type";

  const initialState = {
    calculatedResults: []
  };

function calculatePriceReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CALCULATE_PRICE:
      return {...state, calculatedResults: payload} 

    default:
      return state;
  }
};
export default calculatePriceReducer;
