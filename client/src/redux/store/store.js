import{configureStore} from '@reduxjs/toolkit'
import loaderReducer from '../slice-state/loaderSlice'
import profileReducer from '../slice-state/profileSlice'


export default configureStore({
    reducer:{
        progress:loaderReducer, 
        profile:profileReducer    
    }
})