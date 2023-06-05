import { VIDEO_TYPES } from '../actions/videoAction'
import { EditData } from '../actions/globalTypes'

const detailVideoReducer = (state = [], action) => {
    switch (action.type){
        case VIDEO_TYPES.GET_VIDEO:
            return [...state, action.payload]
        case VIDEO_TYPES.UPDATE_VIDEO:
            return EditData(state, action.payload._id, action.payload)
        default:
            return state;
    }
}


export default detailVideoReducer