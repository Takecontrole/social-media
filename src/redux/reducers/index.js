import { combineReducers } from 'redux'
import auth from './authReducer'
import alert from './alertReducer'
import theme from './themeReducer'
import profile from './profileReducer'
import status from './statusReducer'
import videostatus from './videoStatusReducer'
import photostatus from './photoStatusReducer'
import homePosts from './postReducer'
import homeVideos from './videoReducer'
import homePhotos from './photoReducer'
import modal from './modalReducer'
import detailPost from './detailPostReducer'
import detailVideo from './detailVideoReducer'
import detailPhoto from './detailPhotoReducer'
import discover from './discoverReducer'
import suggestions from './suggestionsReducer'
import socket from './socketReducer'
import notify from './notifyReducer'
import message from './messageReducer'
import online from './onlineReducer'
import call from './callReducer'
import peer from './peerReducer'


export default combineReducers({
    auth,
    alert,
    theme,
    profile,
    status,
    videostatus,
    photostatus,
    homePosts,
    homeVideos,
    homePhotos,
    modal,
    detailPost,
    detailVideo,
    detailPhoto,
    discover,
    suggestions,
    socket,
    notify,
    message,
    online,
    call,
    peer
})