import {
  GENERATE_USER,
  GENERATE_COINS,
  ADD_CARD,
  LUB,
} from "../action/actionType";

let initialStateTemplate = {
  users: [],
  currentUserId: "",
  LUB: null,
  cards: [0, 500, 1000, 2000, 3000, 4000].sort((a, b) => a - b),
  
};

const initialState = localStorage.getItem("initialData")
  ? JSON.parse(localStorage.getItem("initialData"))
  : initialStateTemplate;

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GENERATE_COINS:
      const newUsers = action.generatingCoins(state, action.payload);
      localStorage.setItem(
        "initialData",
        JSON.stringify({ ...state, users: [...newUsers] })
      );
      return { ...state, users: [...newUsers] };

    case GENERATE_USER:
      const user = action.generateUserFun(state);
      localStorage.setItem(
        "initialData",
        JSON.stringify({
          ...state,
          users: [...state.users, user],
          currentUserId: user.id,
        })
      );
      return {
        ...state,
        users: [...state.users, user],
        currentUserId: user.id,
      };

    case ADD_CARD:
      const cardAddedUser = action.addCardFunc(
        state,
        action.userId,
        action.fees,
        action.cardValues
      );
      localStorage.setItem(
        "initialData",
        JSON.stringify({ ...state, users: [...cardAddedUser] })
      );
      return { ...state, users: [...cardAddedUser] };
    case LUB:
      action.calLUBfunc(state);
      localStorage.setItem(
        "initialData",
        JSON.stringify({ ...initialStateTemplate})
      );
      return { ...initialStateTemplate };

    default:
      return state;
  }
}
