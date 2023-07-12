import { GLOBALTYPES } from './globalTypes'
import { imageUpload } from '../../utils/imageUpload'
import { postDataAPI, getDataAPI, patchDataAPI, deleteDataAPI } from '../../utils/fetchData'
import { createNotify, removeNotify } from './notifyAction'

export const PHOTO_TYPES = {
    CREATE_PHOTO: 'CREATE_PHOTO',
    LOADING_PHOTO: 'LOADING_PHOTO',
    GET_PHOTOS: 'GET_PHOTOS',
    UPDATE_PHOTO: 'UPDATE_PHOTO',
    GET_PHOTO: 'GET_PHOTO',
    DELETE_PHOTO: 'DELETE_PHOTO'
}


export const createPhoto = ({content, images, auth, socket}) => async (dispatch) => {
    let media = []
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: {loading: true} })
        if(images.length > 0) media = await imageUpload(images)

        const res = await postDataAPI('photos', { content, images: media }, auth.token)

        dispatch({ 
            type: PHOTO_TYPES.CREATE_PHOTO, 
            payload: {...res.data.newPhoto, user: auth.user} 
        })

        dispatch({ type: GLOBALTYPES.ALERT, payload: {loading: false} })

        // Notify
        const msg = {
            id: res.data.newPhoto._id,
            text: 'added a new photo.',
            recipients: res.data.newPhoto.user.followers,
            url: `/photo/${res.data.newPhoto._id}`,
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

export const getPhotos = (token) => async (dispatch) => {
    try {
        dispatch({ type: PHOTO_TYPES.LOADING_PHOTO, payload: true })
        const res = await getDataAPI('photos', token)
        
        dispatch({
            type: PHOTO_TYPES.GET_PHOTOS,
            payload: {...res.data, page: 2}
        })

        dispatch({ type: PHOTO_TYPES.LOADING_PHOTO, payload: false })
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: err.response.data.msg}
        })
    }
}

export const updatePhoto = ({content, images, auth, photostatus}) => async (dispatch) => {
    let media = []
    const imgNewUrl = images.filter(img => !img.url)
    const imgOldUrl = images.filter(img => img.url)

    if(photostatus.content === content 
        && imgNewUrl.length === 0
        && imgOldUrl.length === photostatus.images.length
    ) return;

    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: {loading: true} })
        if(imgNewUrl.length > 0) media = await imageUpload(imgNewUrl)

        const res = await patchDataAPI(`photo/${photostatus._id}`, { 
            content, images: [...imgOldUrl, ...media] 
        }, auth.token)

        dispatch({ type: PHOTO_TYPES.UPDATE_PHOTO, payload: res.data.newPhoto })

        dispatch({ type: GLOBALTYPES.ALERT, payload: {success: res.data.msg} })
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: err.response.data.msg}
        })
    }
}

export const likePhoto = ({photo, auth, socket}) => async (dispatch) => {
    const newPhoto = {...photo, likes: [...photo.likes, auth.user]}
    dispatch({ type: PHOTO_TYPES.UPDATE_PHOTO, payload: newPhoto})

    socket.emit('likePhoto', newPhoto)

    try {
        await patchDataAPI(`photo/${photo._id}/like`, null, auth.token)
        
        // Notify
        const msg = {
            id: auth.user._id,
            text: 'like your photo.',
            recipients: [photo.user._id],
            url: `/photo/${photo._id}`,
            content: photo.content, 
            image: photo.images[0].url
        }

        dispatch(createNotify({msg, auth, socket}))

    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: err.response.data.msg}
        })
    }
}

export const unLikePhoto = ({photo, auth, socket}) => async (dispatch) => {
    const newPhoto = {...photo, likes: photo.likes.filter(like => like._id !== auth.user._id)}
    dispatch({ type: PHOTO_TYPES.UPDATE_PHOTO, payload: newPhoto})

    socket.emit('unLikePhoto', newPhoto)

    try {
        await patchDataAPI(`photo/${photo._id}/unlike`, null, auth.token)

        // Notify
        const msg = {
            id: auth.user._id,
            text: 'like your photo.',
            recipients: [photo.user._id],
            url: `/photo/${photo._id}`,
        }
        dispatch(removeNotify({msg, auth, socket}))

    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: err.response.data.msg}
        })
    }
}

export const getPhoto = ({detailPhoto, id, auth}) => async (dispatch) => {
    if(detailPhoto.every(photo => photo._id !== id)){
        try {
            const res = await getDataAPI(`photo/${id}`, auth.token)
            dispatch({ type: PHOTO_TYPES.GET_PHOTO, payload: res.data.photo })
        } catch (err) {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: {error: err.response.data.msg}
            })
        }
    }
}

export const deletePhoto = ({photo, auth, socket}) => async (dispatch) => {
    dispatch({ type: PHOTO_TYPES.DELETE_PHOTO, payload: photo })

    try {
        const res = await deleteDataAPI(`photo/${photo._id}`, auth.token)

        // Notify
        const msg = {
            id: photo._id,
            text: 'added a new photo.',
            recipients: res.data.newPhoto.user.followers,
            url: `/photo/${photo._id}`,
        }
        dispatch(removeNotify({msg, auth, socket}))
        
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: err.response.data.msg}
        })
    }
}

export const savePhoto = ({photo, auth}) => async (dispatch) => {
    const newUser = {...auth.user, saved: [...auth.user.saved, photo._id]}
    dispatch({ type: GLOBALTYPES.AUTH, payload: {...auth, user: newUser}})

    try {
        await patchDataAPI(`savePhoto/${photo._id}`, null, auth.token)
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: err.response.data.msg}
        })
    }
}

export const unSavePhoto = ({photo, auth}) => async (dispatch) => {
    const newUser = {...auth.user, saved: auth.user.saved.filter(id => id !== photo._id) }
    dispatch({ type: GLOBALTYPES.AUTH, payload: {...auth, user: newUser}})

    try {
        await patchDataAPI(`unSavePhoto/${photo._id}`, null, auth.token)
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: err.response.data.msg}
        })
    }
}