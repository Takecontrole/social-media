import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteComment } from '../../../redux/actions/commentPhotoAction'

const CommentMenu = ({photo, comment, setOnEdit, setOpenImg}) => {

    const { auth, socket } = useSelector(state => state)
    const dispatch = useDispatch()

    const handleRemove = () => {
        if(photo.user._id === auth.user._id || comment.user._id === auth.user._id){
            dispatch(deleteComment({photo, auth, comment, socket}));
            setOpenImg(false)
          
        }
    }

    const MenuItem = () => {
        return(
            <>
                <div className="dropdown-item" onClick={() => setOnEdit(true)}>
                    <span className="material-icons">create</span> Edit
                </div>
                <div className="dropdown-item" onClick={handleRemove}>
                    <span className="material-icons">delete_outline</span> Remove
                </div>
            </>
        )
    }


    return (
        <div className="menu">
            {
                (photo.user._id === auth.user._id || comment.user._id === auth.user._id) &&
                <div className="nav-item dropdown">
                    <span className="material-icons" id="moreLink" data-toggle="dropdown">
                        more_vert
                    </span>

                    <div className="dropdown-menu" aria-labelledby="moreLink">
                        {
                            photo.user._id === auth.user._id
                            ? comment.user._id === auth.user._id
                                ? MenuItem()
                                : <div className="dropdown-item" onClick={handleRemove}>
                                    <span className="material-icons">delete_outline</span> Remove
                                </div>
                            : comment.user._id === auth.user._id && MenuItem()
                        }
                    </div>

                </div>
            }
            
        </div>
    )
}

export default CommentMenu
