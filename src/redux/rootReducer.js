import { combineReducers } from "redux";
import bidReducer  from "./biddingSystem/reducer/reducer";

export default combineReducers({
  item: bidReducer
});
