import { ActionTypes } from "../constants/actionsType";



const initialState={
    temps:[]
};
export const tempsReducer=(state=initialState, {type, payload}) =>{
    switch (type) {
        case ActionTypes.SET_TEMPS:
            return {...state, temps:payload};
        default:
            return state
    }
}