import {
CALCULATE_PRICE
  } from "./type";
  import cargoService from "../services/cargoService";


  export const calculatePrice = (data) => async (dispatch) => {
    try {
      const res = await cargoService.calculate(data);
  
      dispatch({
        type: CALCULATE_PRICE,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };