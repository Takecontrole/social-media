import React, { useState, useEffect } from 'react'
import CommentDisplay from './commentsPhoto/CommentDisplay'

const CommentsPhoto = ({photo, handleAlert, setOpenImg}) => {
    const [comments, setComments] = useState([])
    const [showComments, setShowComments] = useState([])
    const [next, setNext] = useState(2)

    const [replyComments, setReplyComments] = useState([])

    useEffect(() => {
        const newCm = photo.comments.filter(cm => !cm.reply)
        setComments(newCm)
        setShowComments(newCm.slice(newCm.length - next))
    },[photo.comments, next])

    useEffect(()=> {
        const newRep = photo.comments.filter(cm => cm.reply)
        setReplyComments(newRep)
    }, [photo.comments])

    return (
        <div className="comments">
            {
                showComments.map((comment, index) => (
                    <CommentDisplay key={index} comment={comment} photo={photo} setOpenImg={setOpenImg} handleAlert={handleAlert}
                    replyCm={replyComments.filter(item => item.reply === comment._id)} />
                ))
            }

            {
                comments.length - next > 0
                ? <div className="p-2 border-top"
                style={{cursor: 'pointer', color: 'crimson'}}
                onClick={() => setNext(next + 10)}>
                    Посмотреть все комменты...
                </div>

                : comments.length > 2 &&
                <div className="p-2 border-top"
                style={{cursor: 'pointer', color: 'crimson'}}
                onClick={() => setNext(2)}>
                    Спрятать...
                </div>
            }
        </div>
    )
}

export default CommentsPhoto