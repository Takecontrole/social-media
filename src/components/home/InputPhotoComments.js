import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createComment } from '../../redux/actions/commentPhotoAction'
import Icons from '../Icons'
import SendIcon from '@mui/icons-material/Send';
const InputPhotoComment = ({children, photo, onReply, setOnReply, setOpenImg}) => {
    const [content, setContent] = useState('')

    const { auth, socket, theme } = useSelector(state => state)
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!content.trim()){
            if(setOnReply) return setOpenImg(false);
            return;
        }
        setContent('')
        const newComment = {
            content,
            likes: [],
            user: auth.user,
            createdAt: new Date().toISOString(),
            reply: onReply && onReply.commentId,
            tag: onReply && onReply.user
        }
        dispatch(createComment({photo, newComment, auth, socket}))
        if(setOnReply) return setOpenImg(false) ; 
        setOpenImg(false)
    }

    return (
        <form className="card-footer comment_input" style={{background:"transparent"}} onSubmit={handleSubmit}  >
            {children}
            <input type="text" placeholder="Комментарий..."
            value={content} onChange={e => setContent(e.target.value)}
            style={{
                filter: theme ? 'invert(1)' : 'invert(0)',
                color: theme ? 'white' : '#111',
                background: theme ? 'rgba(0,0,0,.03)' : '',
            }} />

            <Icons setContent={setContent} content={content} theme={theme} />

            <button type="submit" className="postBtn" >
                <SendIcon />
            </button>
        </form>
    )
}

export default InputPhotoComment
