import React from 'react'
import Avatar from './Avatar'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Box, Grid, Typography} from "@mui/material";
const UserCard = ({children, user, border, handleClose, setShowFollowers, setShowFollowing, msg}) => {

    const { theme } = useSelector(state => state)

    const handleCloseAll = () => {
        if(handleClose) handleClose()
        if(setShowFollowers) setShowFollowers(false)
        if(setShowFollowing) setShowFollowing(false)
    }

    const showMsg = (user) => {
        return(
            <>
                <Box style={{filter: theme ? 'invert(1)' : 'invert(0)'}}>
                    {user.text}
                </Box>
                {
                    user.media.length > 0 && 
                    <Box>
                        {user.media.length} <i className="fas fa-image" />
                    </Box>
                }

                {
                    user.call &&
                    <span className="material-icons">
                        {
                            user.call.times === 0
                            ? user.call.video ? 'videocam_off' : 'phone_disabled'
                            : user.call.video ? 'video_camera_front' : 'call'
                        }
                    </span>
                }
            </>
        )
    }


    return (
        <Box >
            <Box>
                <Link to={`/profile/${user._id}`} onClick={handleCloseAll}
                style={{display:"flex", flexDirection:"column",
                  color:"black",
                  alignItems:"center", justifyContent:"center", textAlign:"center"
                  }}>
                    <Avatar src={user.avatar} size="big-avatar" />
                        <Typography variant="h7" >
                            {
                                msg 
                                ? showMsg(user)
                                : user.fullname
                            }
                        </Typography>
                  
                </Link>
            </Box>
            
            
        </Box>
    )
}

export default UserCard
