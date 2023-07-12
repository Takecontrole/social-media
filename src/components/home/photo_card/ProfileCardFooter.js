import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { GLOBALTYPES } from '../../../redux/actions/globalTypes'
import { deletePhoto } from '../../../redux/actions/photoAction'
import ShareModal from '../../ShareModal'
import { BASE_URL } from '../../../utils/config'
import {Box, Typography} from "@mui/material"
import ReplySharpIcon from '@mui/icons-material/ReplySharp';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
const ProfileCardFooter = ({photo, photos, slideNumber}) => {
    const { auth, theme, socket } = useSelector(state => state)
    const dispatch = useDispatch()
    const [isShare, setIsShare] = useState(false)
    
    const handleEditPost = () => {
        dispatch({ type: GLOBALTYPES.PHOTOSTATUS, payload: {...photo, onEdit: true}})
    }

    const handleDeletePost = () => {
        if(window.confirm("Are you sure want to delete this photo?")){
            dispatch(deletePhoto({photo, auth, socket}))
            //return history.push("/")
        }
    }
   
    return ( 
            <Box position="absolute" bottom="0" display="flex" alignItems="center" justifyContent="center" color="#F5F5F5" sx={{width:"100%"}}>
                <Box position="absolute" left="0" sx={{margin:{xs:"0.5rem", sm:"5%"}}}>
                <Typography style={{ cursor: 'pointer'}}>
                    <ReplySharpIcon onClick={() => setIsShare(!isShare)} sx={{width:{sm:"50px"}, height:{sm:"50px"}}}/>
                </Typography>
                </Box>
           <p style={{ marginBottom: '1.5rem'}}>{slideNumber +1} из {photos.length}</p>
                         {
                        auth.user._id === photo.user._id &&
                    <>
                     <Box position="absolute" left="0" sx={{margin:{xs:"15%", sm:"20%",lg:"15%"}}} onClick={handleEditPost}>
                                <Typography sx={{ fontSize:{xs:"12px",sm:"16px"}, cursor: 'pointer'}}> изменить
                                </Typography>
                            </Box>
                            <Box position="absolute" right="0" sx={{margin:{xs:"15%", sm:"20%",lg:"15%"}}} onClick={handleDeletePost}>          <Typography sx={{ fontSize:{xs:"12px",sm:"16px"},cursor: 'pointer'}}> удалить
                                </Typography>
                                </Box>
                     </> 
                         }
            <Box position="absolute" right="0" sx={{margin:{xs:"0.5rem", sm:"5%"}}}> 
                <Link key={photo._id} to={`/photo/${photo._id}`} style={{color:"white", textDecoration:"none"}}> 
                <Typography sx={{cursor: 'pointer'}}>
                    {photo.comments.length} 
              <ChatBubbleOutlineRoundedIcon sx={{width:{sm:"30px"}, height:{sm:"30px"}}}/>
                </Typography>
                </Link>
            </Box>

            {
                isShare && <ShareModal url={`${BASE_URL}/photo/${photo._id}`}  theme={theme} />
            }
        </Box>
    )
}

export default ProfileCardFooter