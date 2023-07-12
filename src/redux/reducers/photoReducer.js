import { PHOTO_TYPES } from '../actions/photoAction'
import { EditData, DeleteData } from '../actions/globalTypes'

const initialState = {
    loading: false,
    photos: [],
    result: 0,
    page: 2
}

const photoReducer = (state = initialState, action) => {
    switch (action.type){
        case PHOTO_TYPES.CREATE_PHOTO:
            return {
                ...state,
                photos: [action.payload, ...state.photos]
            };
        case PHOTO_TYPES.LOADING_PHOTO:
            return {
                ...state,
                loading: action.payload
            };
        case PHOTO_TYPES.GET_PHOTOS:
            return {
                ...state,
                photos: action.payload.photos,
                result: action.payload.result,
                page: action.payload.page
            };
        case PHOTO_TYPES.UPDATE_PHOTO:
            return {
                ...state,
                photos: EditData(state.photos, action.payload._id, action.payload)
            };
        case PHOTO_TYPES.DELETE_PHOTO:
            return {
                ...state,
                photos: DeleteData(state.photos, action.payload._id)
            };
        default:
            return state;
    }
}

export default photoReducer