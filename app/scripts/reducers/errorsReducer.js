import { FAIL } from "../constants/actionTypes";

const initialState = [];

export default (state = initialState, { type, payload }) => {
  console.log("errorsReducer");
  const matches = /(.*)_(REQUEST|FAIL)/.exec(type);
  if (!matches) return state;
  const [, action, actionType] = matches;
  if (actionType === FAIL) {
    return [...state, { type: action, ...payload }];
  }
  return state.filter((x) => !(x.type === action && x.id === payload?.id));
};
