import { RESET_SEARCH_TERM } from "../constants/actionTypes";
const initialState = {}


export default (state = initialState, { type, payload }) => {
    switch (type) {

        case RESET_SEARCH_TERM:
            console.log('reset_search_term');
            return [...state, { searchTerm: '' }];

        default:
            return state
    }
}
