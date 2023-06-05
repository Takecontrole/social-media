import { GLOBALTYPES, EditData, DeleteData } from './globalTypes'
import { VIDEO_TYPES } from './videoAction'
import { postDataAPI, patchDataAPI, deleteDataAPI } from '../../utils/fetchData'
import { createNotify, removeNotify } from '../actions/notifyAction'


export const createComment = ({video, newComment, auth, socket}) => async (dispatch) => {
    const newVideo = {...video, comments: [...video.comments, newComment]}
    
    dispatch({ type: VIDEO_TYPES.UPDATE_VIDEO, payload: newVideo })

    try {
        const data = {...newComment, videoId: video._id, videoUserId: video.user._id}
        const res = await postDataAPI('commentvideo', data, auth.token)

        const newData = {...res.data.newComment, user: auth.user}
        const newVideo = {...video, comments: [...video.comments, newData]}
        dispatch({ type: VIDEO_TYPES.UPDATE_VIDEO, payload: newVideo })

        // Socket
        socket.emit('createComment', newVideo)

        // Notify
        const msg = {
            id: res.data.newComment._id,
            text: newComment.reply ? 'mentioned you in a comment.' : 'has commented on your post.',
            recipients: newComment.reply ? [newComment.tag._id] : [video.user._id],
            url: `/video/${video._id}`,
            content: video.content, 
            image: video.images[0].url
        }

        dispatch(createNotify({msg, auth, socket}))
        
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg} })
    }
}

export const updateComment = ({comment, video, content, auth}) => async (dispatch) => {
    const newComments = EditData(video.comments, comment._id, {...comment, content})
    const newVideo = {...video, comments: newComments}
    
    dispatch({ type: VIDEO_TYPES.UPDATE_VIDEO, payload: newVideo })
    try {
        patchDataAPI(`commentvideo/${comment._id}`, { content }, auth.token)
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg} })
    }
}

export const likeComment = ({comment, video, auth}) => async (dispatch) => {
    const newComment = {...comment, likes: [...comment.likes, auth.user]}

    const newComments = EditData(video.comments, comment._id, newComment)

    const newVideo = {...video, comments: newComments}
    
    dispatch({ type: VIDEO_TYPES.UPDATE_VIDEO, payload: newVideo })

    try {
        await patchDataAPI(`commentvideo/${comment._id}/like`, null, auth.token)
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg} })
    }
}

export const unLikeComment = ({comment, video, auth}) => async (dispatch) => {

    const newComment = {...comment, likes: DeleteData(comment.likes, auth.user._id)}

    const newComments = EditData(video.comments, comment._id, newComment)

    const newVideo = {...video, comments: newComments}
    
    dispatch({ type: VIDEO_TYPES.UPDATE_VIDEO, payload: newVideo })

    try {
        await patchDataAPI(`commentvideo/${comment._id}/unlike`, null, auth.token)
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg} })
    }
}

export const deleteComment = ({video, comment, auth, socket}) => async (dispatch) => {
    const deleteArr = [...video.comments.filter(cm => cm.reply === comment._id), comment]
    
    const newVideo = {
        ...video,
        comments: video.comments.filter(cm => !deleteArr.find(da => cm._id === da._id))
    }

    dispatch({ type: VIDEO_TYPES.UPDATE_VIDEO, payload: newVideo })

    socket.emit('deleteComment', newVideo)
    try {
       deleteArr.forEach(item => {
            deleteDataAPI(`commentvideo/${item._id}`, auth.token)

            const msg = {
                id: item._id,
                text: comment.reply ? 'mentioned you in a comment.' : 'has commented on your post.',
                recipients: comment.reply ? [comment.tag._id] : [video.user._id],
                url: `/video/${video._id}`,
            }
    
            dispatch(removeNotify({msg, auth, socket}))
       })
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg} })
    }

}