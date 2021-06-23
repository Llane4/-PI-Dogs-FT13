import { ActionTypes } from "../constants/actionsType"


export const setDogs= (dogs) => {
    return{
        type: ActionTypes.SET_DOGS,
        payload: dogs
    }
}
export const setTemps= (temps) => {
    return{
        type: ActionTypes.SET_TEMPS,
        payload: temps
    }
}

export const selectDogs= (dogs) => {
    return{
        type: ActionTypes.SELECT_DOGS,
        payload: dogs
    }
}
export const selectTemps= (temps) => {
    return{
        type: ActionTypes.SELECT_TEMPS,
        payload: temps
    }
}
export const resetTemps= () => {
    return{
        type: ActionTypes.RESET_TEMPS,
        
    }
}