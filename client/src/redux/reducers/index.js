import {combineReducers} from 'redux'
import { dogsReducer } from './dogsReducers'
import { tempsReducer } from './tempsReducer'
import { selectsReducer } from './selecTemps'
import { selectReducer } from './selectedDog'

const reducers= combineReducers({
    allDogs: dogsReducer,
    allTemps: tempsReducer,
    allSelects: selectsReducer,
    selectDog: selectReducer
})

export default reducers 