import { combineReducers } from "redux";
import LoginReducer from "./LoginReducer";
import CartReducer from "./CartReducer";

const rootReducer = combineReducers({
  loginReducer: LoginReducer,
  cartReducer: CartReducer,
});

export default rootReducer;
