import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import VideoCarousel from '../VideoCarousel'
import VideoCardHeader from '../home/video_card/VideoCardHeader'
import VideoCardFooter from '../home/video_card/VideoCardFooter'
import { getDataAPI } from '../../utils/fetchData'
import { VIDEO_TYPES } from '../../redux/actions/videoAction'
import { Box, Typography } from "@mui/material"
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';
import "swiper/css/scrollbar";
import {Pagination, FreeMode, Scrollbar } from "swiper";
import {Link} from "react-router-dom";
import { PROFILE_TYPES } from '../../redux/actions/profileAction'
const Videos = ({auth, id, dispatch, profile}) => {
    const { theme } = useSelector(state => state)
    const [videos, setVideos] = useState([]) 
    
    //const dispatch = useDispatch()
    const [result, setResult] = useState(9)
    const [page, setPage] = useState(0)
    const [load, setLoad] = useState(false)

    useEffect(() => {
        profile.videos.forEach(data => {
            if(data._id === id){
                setVideos(data.videos)
                setResult(data.result)
                setPage(data.page)
                console.log(data.videos);
            }
        })
    },[profile.videos, id])
  const handleLoadMore = async () => {
        setLoad(true)
        const res = await getDataAPI(`user_videos/${id}?limit=${page * 2}`, auth.token)
        const newData = {...res.data, page: page + 1, _id: id}
        dispatch({type: PROFILE_TYPES.UPDATE_VIDEO, payload: newData})
        setLoad(false)
    }
    
    return (
        <Box
        >
<Swiper autoHeight={true}
breakpoints={{
320: {
      slidesPerView: 1.25,
      spaceBetween: 20
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 1.5,
      spaceBetween: 30
    },
    620: {
      slidesPerView: 2,
      spaceBetween: 30
    },
    1700: {
      slidesPerView: 3,
      spaceBetween: 20
    }
      }}
style={{position:"absolute",top:"4rem",width:"100%", zIndex:0 }}
> 

{videos.map(video => ( 

<SwiperSlide  >
<Box sx={{display: "flex",
    alignItems: "center",
    maxHeight: {xs:"150px",lg:"200px"},
    minWidth: "250px",
    maxWidth: "500px",
    borderRadius:"20px",
    textAlign: "center",
    fontSize: "18px",
    overflow:"hidden"
}}> 

 <Link key={video._id} to={`/video/${video._id}`}> 
<VideoCarousel images={video.images} id={video._id} />
</Link>
</Box>
  <Typography sx={{posotion:"absolutel", mx:"0.5rem", fontSize:{xs:"14px",md:"16px",lg:"20px"}}} mt="0.5rem">{video.content}</Typography>  
</SwiperSlide>
))}

</Swiper>



        </Box>
    )
}

export default Videos
