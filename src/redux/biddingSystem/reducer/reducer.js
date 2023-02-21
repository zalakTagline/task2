import {
  GENERATE_USER,
  GENERATE_COINS,
  ADD_CARD,
  LUB,
} from "../action/actionType";

const initialState = {
  users: [],
  currentUserId: "",
  LUB: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GENERATE_COINS:
      const newUsers = action.generatingCoins(state, action.payload);
      return { ...state, users: [...newUsers] };

    case GENERATE_USER:
      const user = action.generateUserFun(state);
      return { ...state,users: [...state.users, user], currentUserId: user.id };
    case ADD_CARD:
      const cardAddedUser = action.addCardFunc(
        state,
        action.userId,
        action.fees,
        action.cardValues
      );
      return { ...state, users: [...cardAddedUser] };
    case LUB:
      const lub = action.calLUBfunc(state)     
      return { ...state, LUB: lub};

    default:
      return state;
  }
}
