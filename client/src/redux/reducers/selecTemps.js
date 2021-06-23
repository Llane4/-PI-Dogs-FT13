import { ActionTypes } from "../constants/actionsType";



const initialState={
    temps:[]
};
export const selectsReducer=(state=initialState, {type, payload}) =>{
    switch (type) {
        case ActionTypes.SELECT_TEMPS:
            return {...state,temps:[...state.temps, payload]};
        case ActionTypes.RESET_TEMPS:
            return {temps:""};
        default:
            return state
    }
}