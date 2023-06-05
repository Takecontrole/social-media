import { VIDEO_TYPES } from '../actions/videoAction'
import { EditData, DeleteData } from '../actions/globalTypes'

const initialState = {
    loading: false,
    videos: [],
    result: 0,
    page: 2
}

const videoReducer = (state = initialState, action) => {
    switch (action.type){
        case VIDEO_TYPES.CREATE_VIDEO:
            return {
                ...state,
                videos: [action.payload, ...state.videos]
            };
            case VIDEO_TYPES.LOADING_VIDEO:
            return {
                ...state,
                loading: action.payload
            };
        case VIDEO_TYPES.GET_VIDEOS:
            return {
                ...state,
                videos: action.payload.videos,
                result: action.payload.result,
                page: action.payload.page
            };
        case VIDEO_TYPES.UPDATE_VIDEO:
            return {
                ...state,
                videos: EditData(state.videos, action.payload._id, action.payload)
            };
        case VIDEO_TYPES.DELETE_VIDEO:
            return {
                ...state,
                videos: DeleteData(state.videos, action.payload._id)
            };
        default:
            return state;
    }
}

export default videoReducer