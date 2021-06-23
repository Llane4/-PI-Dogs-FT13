import { ActionTypes } from "../constants/actionsType";



const initialState={
    dogs:[]
};
export const dogsReducer=(state=initialState, {type, payload}) =>{
    switch (type) {
        case ActionTypes.SET_DOGS:
            return {...state, dogs:payload};
        
        default:
            return state
    }
}