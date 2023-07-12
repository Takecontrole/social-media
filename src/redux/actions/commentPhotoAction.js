import { GLOBALTYPES, EditData, DeleteData } from './globalTypes'
import { PHOTO_TYPES } from './photoAction'
import { postDataAPI, patchDataAPI, deleteDataAPI } from '../../utils/fetchData'
import { createNotify, removeNotify } from '../actions/notifyAction'


export const createComment = ({photo, newComment, auth, socket}) => async (dispatch) => {
    const newPhoto = {...photo, comments: [...photo.comments, newComment]}
    
    dispatch({ type: PHOTO_TYPES.UPDATE_PHOTO, payload: newPhoto })

    try {
        const data = {...newComment, photoId: photo._id, photoUserId: photo.user._id}
        const res = await postDataAPI('commentphoto', data, auth.token)

        const newData = {...res.data.newComment, user: auth.user}
        const newPhoto = {...photo, comments: [...photo.comments, newData]}
        dispatch({ type: PHOTO_TYPES.UPDATE_PHOTO, payload: newPhoto })

        // Socket
        socket.emit('createComment', newPhoto)

        // Notify
        const msg = {
            id: res.data.newComment._id,
            text: newComment.reply ? 'mentioned you in a comment.' : 'has commented on your post.',
            recipients: newComment.reply ? [newComment.tag._id] : [photo.user._id],
            url: `/photo/${photo._id}`,
            content: photo.content, 
            image: photo.images[0].url
        }

        dispatch(createNotify({msg, auth, socket}))
        
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg} })
    }
}

export const updateComment = ({comment, photo, content, auth}) => async (dispatch) => {
    const newComments = EditData(photo.comments, comment._id, {...comment, content})
    const newPhoto = {...photo, comments: newComments}
    
    dispatch({ type: PHOTO_TYPES.UPDATE_PHOTO, payload: newPhoto })
    try {
        patchDataAPI(`commentphoto/${comment._id}`, { content }, auth.token)
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg} })
    }
}

export const likeComment = ({comment, photo, auth}) => async (dispatch) => {
    const newComment = {...comment, likes: [...comment.likes, auth.user]}

    const newComments = EditData(photo.comments, comment._id, newComment)

    const newPhoto = {...photo, comments: newComments}
    
    dispatch({ type: PHOTO_TYPES.UPDATE_PHOTO, payload: newPhoto })

    try {
        await patchDataAPI(`commentphoto/${comment._id}/like`, null, auth.token)
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg} })
    }
}

export const unLikeComment = ({comment, photo, auth}) => async (dispatch) => {

    const newComment = {...comment, likes: DeleteData(comment.likes, auth.user._id)}

    const newComments = EditData(photo.comments, comment._id, newComment)

    const newPhoto = {...photo, comments: newComments}
    
    dispatch({ type: PHOTO_TYPES.UPDATE_PHOTO, payload: newPhoto })

    try {
        await patchDataAPI(`commentphoto/${comment._id}/unlike`, null, auth.token)
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg} })
    }
}

export const deleteComment = ({photo, comment, auth, socket}) => async (dispatch) => {
    const deleteArr = [...photo.comments.filter(cm => cm.reply === comment._id), comment]
    
    const newPhoto = {
        ...photo,
        comments: photo.comments.filter(cm => !deleteArr.find(da => cm._id === da._id))
    }

    dispatch({ type: PHOTO_TYPES.UPDATE_PHOTO, payload: newPhoto })

    socket.emit('deleteComment', newPhoto)
    try {
       deleteArr.forEach(item => {
            deleteDataAPI(`commentphoto/${item._id}`, auth.token)

            const msg = {
                id: item._id,
                text: comment.reply ? 'mentioned you in a comment.' : 'has commented on your post.',
                recipients: comment.reply ? [comment.tag._id] : [photo.user._id],
                url: `/photo/${photo._id}`,
            }
    
            dispatch(removeNotify({msg, auth, socket}))
       })
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg} })
    }

}