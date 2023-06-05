import { GLOBALTYPES } from './globalTypes'
import { imageUpload } from '../../utils/imageUpload'
import { postDataAPI, getDataAPI, patchDataAPI, deleteDataAPI } from '../../utils/fetchData'
import { createNotify, removeNotify } from './notifyAction'

export const VIDEO_TYPES = {
    CREATE_VIDEO: 'CREATE_VIDEO',
    LOADING_VIDEO: 'LOADING_VIDEO',
    GET_VIDEOS: 'GET_VIDEOS', 
    UPDATE_VIDEO: 'UPDATE_VIDEO',
    GET_VIDEO: 'GET_VIDEO',
    DELETE_VIDEO: 'DELETE_VIDEO'
}

export const createVideo = ({content, images, auth, socket}) => async (dispatch) => {
    let media = []
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: {loading: true} })
        if(images.length > 0) media = await imageUpload(images)

        const res = await postDataAPI('videos', { content, images: media }, auth.token)

        dispatch({ 
            type: VIDEO_TYPES.CREATE_VIDEO, 
            payload: {...res.data.newVideo, user: auth.user} 
        })

        dispatch({ type: GLOBALTYPES.ALERT, payload: {loading: false} })

        // Notify

        const msg = {
            id: res.data.newVideo._id,
            text: 'added a new video.',
            recipients: res.data.newVideo.user.followers,
            url: `/video/${res.data.newVideo._id}`,
            content, 
            image: media[0].url
        }
        
         dispatch(createNotify({msg, auth, socket}))

    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: err.response.data.msg}
        })
    }
} 
export const getVideos = (token) => async (dispatch) => {
    try {
        dispatch({ type: VIDEO_TYPES.LOADING_VIDEO, payload: true })
        const res = await getDataAPI('videos', token)
        
        dispatch({
            type: VIDEO_TYPES.GET_VIDEOS,
            payload: {...res.data, page: 2}
        })

        dispatch({ type: VIDEO_TYPES.LOADING_VIDEO, payload: false })
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: err.response.data.msg}
        })
    }
}
export const updateVideo = ({content, images, auth, videostatus}) => async (dispatch) => {
    let media = []
    const imgNewUrl = images.filter(img => !img.url)
    const imgOldUrl = images.filter(img => img.url)

    if(videostatus.content === content 
        && imgNewUrl.length === 0
        && imgOldUrl.length === videostatus.images.length
    ) return;

    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: {loading: true} })
        if(imgNewUrl.length > 0) media = await imageUpload(imgNewUrl)

        const res = await patchDataAPI(`video/${videostatus._id}`, { 
            content, images: [...imgOldUrl, ...media] 
        }, auth.token)

        dispatch({ type: VIDEO_TYPES.UPDATE_VIDEO, payload: res.data.newVideo })

        dispatch({ type: GLOBALTYPES.ALERT, payload: {success: res.data.msg} })
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: err.response.data.msg}
        })
    }
}
export const getVideo = ({detailVideo, id, auth}) => async (dispatch) => {
    if(detailVideo.every(video => video._id !== id)){
        try {
            const res = await getDataAPI(`video/${id}`, auth.token)
            dispatch({ type: VIDEO_TYPES.GET_VIDEO, payload: res.data.video })
        } catch (err) {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: {error: err.response.data.msg}
            })
        }
    }
}
export const likeVideo = ({video, auth, socket}) => async (dispatch) => {
    const newVideo = {...video, likes: [...video.likes, auth.user]}
    dispatch({ type: VIDEO_TYPES.UPDATE_VIDEO, payload: newVideo})

    //socket.emit('likeVideo', newVideo)

    try {
        await patchDataAPI(`video/${video._id}/like`, null, auth.token)
        
      // Notify
        const msg = {
            id: auth.user._id,
            text: 'like.',
            recipients: [video.user._id],
            url: `/video/${video._id}`,
            content: video.content, 
            image: video.images[0].url
        }

        dispatch(createNotify({msg, auth, socket}))

    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: err.response.data.msg}
        })
    }
}

export const unLikeVideo = ({video, auth, socket}) => async (dispatch) => {
    const newVideo = {...video, likes: video.likes.filter(like => like._id !== auth.user._id)}
    dispatch({ type: VIDEO_TYPES.UPDATE_VIDEO, payload: newVideo})

   // socket.emit('unLikeVideo', newVideo)

    try {
        await patchDataAPI(`video/${video._id}/unlike`, null, auth.token)

        // Notify
        const msg = {
            id: auth.user._id,
            text: 'like your video.',
            recipients: [video.user._id],
            url: `/video/${video._id}`,
        }
        dispatch(removeNotify({msg, auth, socket}))

    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: err.response.data.msg}
        })
    }
}
export const deleteVideo = ({video, auth, socket}) => async (dispatch) => {
    dispatch({ type: VIDEO_TYPES.DELETE_VIDEO, payload: video })

    try {
        const res = await deleteDataAPI(`video/${video._id}`, auth.token)

        // Notify
/*
        const msg = {
            id: video._id,
            text: 'added a new vid.',
            recipients: res.data.newVideo.user.followers,
            url: `/video/${video._id}`,
        }
        dispatch(removeNotify({msg, auth, socket}))
        */
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: err.response.data.msg}
        })
    }
}
export const saveVideo = ({video, auth}) => async (dispatch) => {
    const newUser = {...auth.user, savedVideo: [...auth.user.savedVideo, video._id]}
    dispatch({ type: GLOBALTYPES.AUTH, payload: {...auth, user: newUser}})

    try {
        await patchDataAPI(`saveVideo/${video._id}`, null, auth.token)
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: err.response.data.msg}
        })
    }
}

export const unSaveVideo = ({video, auth}) => async (dispatch) => {
    const newUser = {...auth.user, savedVideo: auth.user.savedVideo.filter(id => id !== video._id) }
    dispatch({ type: GLOBALTYPES.AUTH, payload: {...auth, user: newUser}})

    try {
        await patchDataAPI(`unSaveVideo/${video._id}`, null, auth.token)
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: err.response.data.msg}
        })
    }
}