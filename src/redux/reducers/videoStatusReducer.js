import { GLOBALTYPES } from '../actions/globalTypes'


const videoStatusReducer = (state = false, action) => {
    switch (action.type){
        case GLOBALTYPES.VIDEOSTATUS:
            return action.payload;
        default:
            return state;
    }
}


export default videoStatusReducer