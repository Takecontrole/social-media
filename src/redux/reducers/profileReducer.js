import { PROFILE_TYPES } from '../actions/profileAction'
import { EditData } from '../actions/globalTypes'

const initialState = {
    loading: false,
    ids: [],
    users: [],
    posts: [],
    videos: [],
    photos: []
}

const profileReducer = (state = initialState, action) => {
    switch (action.type){
        case PROFILE_TYPES.LOADING:
            return {
                ...state,
                loading: action.payload
            };
        case PROFILE_TYPES.GET_USER:
            return {
                ...state,
                users: [...state.users, action.payload.user]
            };
        case PROFILE_TYPES.FOLLOW:
            return {
                ...state,
                users: EditData(state.users, action.payload._id, action.payload)
            };
        case PROFILE_TYPES.UNFOLLOW:
            return {
                ...state,
                users: EditData(state.users, action.payload._id, action.payload)
            };
        case PROFILE_TYPES.GET_ID:
            return {
                ...state,
                ids: [...state.ids, action.payload]
            };
            
        case PROFILE_TYPES.GET_POSTS:
            return {
                ...state,
                posts: [...state.posts, action.payload]
            };

        case PROFILE_TYPES.UPDATE_POST:
            return {
                ...state,
                posts: EditData(state.posts, action.payload._id, action.payload)
            }; 
            
             case PROFILE_TYPES.GET_VIDEOS:
            return {
                ...state,
                videos: [...state.videos, action.payload]
            };
        case PROFILE_TYPES.UPDATE_VIDEO:
            return {
                ...state,
                videos: EditData(state.videos, action.payload._id, action.payload)
            };
             case PROFILE_TYPES.GET_PHOTOS:
            return {
                ...state,
                photos: [...state.photos, action.payload]
            };
        case PROFILE_TYPES.UPDATE_PHOTO:
            return {
                ...state,
                photos: EditData(state.photos, action.payload._id, action.payload)
            };
        default:
            return state;
    }
}

export default profileReducer