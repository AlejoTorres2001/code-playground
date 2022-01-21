import { combineReducers } from "redux";
import codeReducer from "./codeReducer";
const reducers = combineReducers({
    code:codeReducer})
export default reducers