import React from 'react'
import Avatar from '../../Avatar'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import { GLOBALTYPES } from '../../../redux/actions/globalTypes'
import { deleteVideo } from '../../../redux/actions/videoAction'
import { BASE_URL } from '../../../utils/config'

const VideoCardHeader = ({video}) => {
    const { auth, socket } = useSelector(state => state)
    const dispatch = useDispatch()

    const history = useHistory()

    const handleEditVideo = () => {
        dispatch({ type: GLOBALTYPES.VIDEOSTATUS, payload: {...video, onEdit: true}})
    }

    const handleDeleteVideo = () => {
        if(window.confirm("Удаляем?")){
            dispatch(deleteVideo({video, auth, socket}))
            return history.push("/")
        }
    }

    const handleCopyLink = () => {
        navigator.clipboard.writeText(`${BASE_URL}/video/${video._id}`)
    }

    return (
        <div className="card_header">
            <div className="d-flex">
               
               <Avatar src={video.user.avatar} size="big-avatar" /> 
               

                <div className="card_name">
                    <h6 className="m-0">
                        <Link to={`/profile/${video.user._id}`} className="text-dark">
                            {video.user.username}
                        </Link>
                    </h6>
                    <small className="text-muted">
                        {moment(video.createdAt).fromNow()}
                    </small>
                </div>
            </div>

            <div className="nav-item dropdown">
                <span className="material-icons" id="moreLink" data-toggle="dropdown">
                    more_horiz
                </span>

                <div className="dropdown-menu" style={{minWidth:"250px"}}>
                    {
                        auth.user._id === video.user._id &&
                        <>
                            <div className="dropdown-item" onClick={handleEditVideo}>
                                <span className="material-icons">create</span> Редактировать ссылку
                            </div>
                            <div className="dropdown-item" onClick={handleDeleteVideo} >
                                <span className="material-icons">delete_outline</span>  Удалить
                            </div>
                        </>
                    }

                    <div className="dropdown-item" onClick={handleCopyLink}>
                        <span className="material-icons">content_copy</span> Копировать ссылку
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoCardHeader
