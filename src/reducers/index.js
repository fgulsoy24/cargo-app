import { combineReducers } from "redux";
import calculatedResults from "./calculatePriceReducer";

export default combineReducers({
    calculatedResults,
});