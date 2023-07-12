import { GLOBALTYPES } from '../actions/globalTypes'


const photoStatusReducer = (state = false, action) => {
    switch (action.type){
        case GLOBALTYPES.PHOTOSTATUS:
            return action.payload;
        default:
            return state;
    }
}


export default photoStatusReducer