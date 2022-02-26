import { REQUEST } from "../constants/actionTypes";

const initialState = [];

export default (state = initialState, { type, payload }) => {
  console.log("loadingReducer");
  const matches = /(.*)_(REQUEST|SUCCESS|FAIL)/.exec(type);
  if (!matches) return state;
  const [, action, actionType] = matches;
  if (actionType === REQUEST) {
    return [...state, { type: action, ...payload }];
  }
  return state.filter((x) => !(x.type === action && x.id === payload?.id));
};
