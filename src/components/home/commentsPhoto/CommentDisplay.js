import React, { useState, useEffect } from 'react'
import CommentCard from './CommentCard'

const CommentDisplay = ({comment, photo, replyCm, setOpenImg, handleAlert}) => {
    const [showRep, setShowRep] = useState([])
    const [next, setNext] = useState(1)

    useEffect(() => {
        setShowRep(replyCm.slice(replyCm.length - next))
    },[replyCm, next])

    return (
        <div className="comment_display">
            <CommentCard comment={comment} photo={photo} commentId={comment._id} setOpenImg={setOpenImg} handleAlert={handleAlert}>
                <div className="pl-4">
                    {
                        showRep.map((item, index) => (
                            item.reply &&
                            <CommentCard
                            key={index}
                            comment={item}
                            photo={photo}
                            commentId={comment._id} setOpenImg={setOpenImg} handleAlert={handleAlert}
                             />
                        ))
                    }

                    {
                        replyCm.length - next > 0
                        ? <div style={{cursor: 'pointer', color: 'crimson'}}
                        onClick={() => setNext(next + 10)}>
                            развернуть...
                        </div>

                        : replyCm.length > 1 &&
                        <div style={{cursor: 'pointer', color: 'crimson'}}
                        onClick={() => setNext(1)}>
                            Спрятать комментарии...
                        </div>
                    }
                </div>
            </CommentCard>
        </div>
    )
}

export default CommentDisplay
