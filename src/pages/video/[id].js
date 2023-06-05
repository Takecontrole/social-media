import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getVideo } from '../../redux/actions/videoAction'
import VideoCardHeader from '../../components/home/video_card/VideoCardHeader'
import VideoCardBody from '../../components/home/video_card/VideoCardBody'
import VideoCardFotter from '../../components/home/video_card/VideoCardFooter'
import CommentsVideo from '../../components/home/CommentsVideo'
import InputVideoComment from '../../components/home/InputVideoComment'

const Video = () => { 
  const { id } = useParams()
   const [video, setVideo] = useState([])

    const { auth, detailVideo } = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getVideo({detailVideo, id, auth}))

        if(detailVideo.length > 0){
            const newArr = detailVideo.filter(video => video._id === id)
            setVideo(newArr)
        }
    },[detailVideo, dispatch, id, auth])
    

    return (
        <div className="posts">
               { 
                video.map(item => (
               <div>
                <VideoCardHeader video={item}/>
                  <VideoCardBody video={item}/>  
                  <VideoCardFotter video={item}/>  
                  <CommentsVideo video={item}/>  
                  <InputVideoComment video={item}/>  

                </div>
                ))
            }
        </div>
    )
}

export default Video
