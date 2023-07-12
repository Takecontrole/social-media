import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Send from '../../../images/send.svg'
import LikeButton from '../../LikeButton'
import { useSelector, useDispatch } from 'react-redux'
import { likePhoto, unLikePhoto } from '../../../redux/actions/photoAction'
import ShareModal from '../../ShareModal'
import { BASE_URL } from '../../../utils/config'
import ReplySharpIcon from '@mui/icons-material/ReplySharp';
const CardFooter = ({photo, handleAlert}) => {
    const [isLike, setIsLike] = useState(false)
    const [loadLike, setLoadLike] = useState(false)
    const [isShare, setIsShare] = useState(false)
    const { auth, theme, socket } = useSelector(state => state)
    const dispatch = useDispatch()
    const [saved, setSaved] = useState(false)
    const [saveLoad, setSaveLoad] = useState(false)

    // Likes
    useEffect(() => {
        if(photo.likes.find(like => like._id === auth.user._id)){
            setIsLike(true)
        }else{
            setIsLike(false)
        }
    }, [photo.likes, auth.user._id])

    const handleLike = async () => {
        if(loadLike) return;
        
        setLoadLike(true)
        await dispatch(likePhoto({photo, auth, socket}))
        setLoadLike(false)
    }

    const handleUnLike = async () => {
        if(loadLike) return;

        setLoadLike(true)
        await dispatch(unLikePhoto({photo, auth, socket}))
        setLoadLike(false)
    }


   
   
    return ( 
        <div className="card_footer">
            <div className="card_icon_menu">
                <div>
                <span onClick={handleAlert}>
                    <LikeButton 
                    isLike={isLike}
                    handleLike={handleLike}
                    handleUnLike={handleUnLike}
                    /> 
                    </span>
                </div>

                <ReplySharpIcon onClick={() => setIsShare(!isShare)} sx={{width:"40px", height:"40px"}}/>
               
            </div>

            <div className="d-flex justify-content-between">
                <h6 style={{padding: '0 25px', cursor: 'pointer'}}>
                    {photo.likes.length} лайки
                </h6>
                
                <h6 style={{padding: '0 25px', cursor: 'pointer'}}>
                    {photo.comments.length} комментарии
                </h6>
            </div>

            {
                isShare && <ShareModal url={`${BASE_URL}/photo/${photo._id}`} theme={theme} />
            }
        </div>
    )
}

export default CardFooter
