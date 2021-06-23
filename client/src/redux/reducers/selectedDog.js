import { ActionTypes } from "../constants/actionsType";



const initialState={
    dog:[]
};
export const selectReducer=(state=initialState, {type, payload}) =>{
    switch (type) {
        case ActionTypes.SELECT_DOGS:
            return {...state, dog:payload};
        
        default:
            return state
    }
}
