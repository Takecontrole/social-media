import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createComment } from '../../redux/actions/commentVideoAction'
import Icons from '../Icons'
import SendIcon from '@mui/icons-material/Send';
const InputVideoComment = ({children, video, onReply, setOnReply}) => {
    const [content, setContent] = useState('')

    const { auth, socket, theme } = useSelector(state => state)
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!content.trim()){
            if(setOnReply) return setOnReply(false);
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
        
        dispatch(createComment({video, newComment, auth, socket}))

        if(setOnReply) return setOnReply(false);
    }

    return (
        <form className="card-footer comment_input" style={{backgroundColor:"transparent"}} onSubmit={handleSubmit} >
            {children}
            <input type="text" placeholder="Комментарий..." style={{backgroundColor:"transparent"}} 
            value={content} onChange={e => setContent(e.target.value)}
             />

            <Icons setContent={setContent} content={content} theme={theme} />

            <button type="submit" className="postBtn">
                  <SendIcon/>
            </button>
        </form>
    )
}

export default InputVideoComment
