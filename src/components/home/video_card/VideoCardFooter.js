import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Send from '../../../images/send.svg'
import LikeButton from '../../LikeButton'
import { useSelector, useDispatch } from 'react-redux'
import { likeVideo, unLikeVideo, saveVideo , unSaveVideo} from '../../../redux/actions/videoAction'
import ShareModal from '../../ShareModal'
import { BASE_URL } from '../../../utils/config'


const VideoCardFooter = ({video}) => {
    const [isLike, setIsLike] = useState(false)
    const [loadLike, setLoadLike] = useState(false)

    const [isShare, setIsShare] = useState(false)

    const { auth, theme, socket } = useSelector(state => state)
    const dispatch = useDispatch()

    const [saved, setSaved] = useState(false)
    const [saveLoad, setSaveLoad] = useState(false)

    // Likes
    useEffect(() => {
        if(video.likes.find(like => like._id === auth.user._id)){
            setIsLike(true)
        }else{
            setIsLike(false)
        }
    }, [video.likes, auth.user._id])

    const handleLike = async () => {
        if(loadLike) return;
        
        setLoadLike(true)
        await dispatch(likeVideo({video, auth, socket}))
        setLoadLike(false)
    }

    const handleUnLike = async () => {
        if(loadLike) return;

        setLoadLike(true)
        await dispatch(unLikeVideo({video, auth}))
        setLoadLike(false)
    }


   // Saved
    useEffect(() => {
        if(auth.user.savedVideo.find(id => id === video._id)){
            setSaved(true)
        }else{
            setSaved(false)
        }
    },[auth.user.savedVideo, video._id])

    const handleSavePost = async () => {
        if(saveLoad) return;
        
        setSaveLoad(true)
        await dispatch(saveVideo({video, auth}))
        setSaveLoad(false)
    }

    const handleUnSavePost = async () => {
        if(saveLoad) return;

        setSaveLoad(true)
        await dispatch(unSaveVideo({video, auth}))
        setSaveLoad(false)
    }

    return (
        <div className="card_footer">
            <div className="card_icon_menu">
                <div>
                    <LikeButton 
                    isLike={isLike}
                    handleLike={handleLike}
                    handleUnLike={handleUnLike}
                    />
                    <Link to={`/video/${video._id}`} className="text-dark">
                        <i className="far fa-comment" />
                    </Link>

                    <img src={Send} alt="Send" onClick={() => setIsShare(!isShare)} />
                </div>

                {
                    saved 
                    ?  <i className="fas fa-bookmark text-info"
                    onClick={handleUnSavePost} />

                    :  <i className="far fa-bookmark"
                    onClick={handleSavePost} />
                }
               
            </div>

            <div className="d-flex justify-content-between">
                <h6 style={{padding: '0 25px', cursor: 'pointer'}}>
                    {video.likes.length} лайков
                </h6>
                
                <h6 style={{padding: '0 25px', cursor: 'pointer'}}>
                    {video.comments.length} коментариев
                </h6>
            </div>

            {
                isShare && <ShareModal url={`${BASE_URL}/video/${video._id}`} theme={theme} />
            }
        </div>
    )
}

export default VideoCardFooter
