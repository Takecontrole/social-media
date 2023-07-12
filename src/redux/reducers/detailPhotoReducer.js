import { PHOTO_TYPES } from '../actions/photoAction'
import { EditData } from '../actions/globalTypes'

const detailPhotoReducer = (state = [], action) => {
    switch (action.type){
        case PHOTO_TYPES.GET_PHOTO:
            return [...state, action.payload]
        case PHOTO_TYPES.UPDATE_PHOTO:
            return EditData(state, action.payload._id, action.payload)
        default:
            return state;
    }
}


export default detailPhotoReducer