import React from 'react'
import Avatar from './Avatar'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Box, Grid, Typography} from "@mui/material";
const SearchUserCard = ({children, user, border, handleClose, setShowFollowers, setShowFollowing, msg}) => {

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
            <Box px="0.5rem"
             py="0.25rem"
            >
                <Link to={`/profile/${user._id}`} onClick={handleCloseAll}
                style={{display:"flex",
                  color:"black",
                  alignItems:"center", justifyContent:"start", textAlign:"center"
                  }}>
                    <Avatar src={user.avatar} size="big-avatar" />
                        <Typography variant="h7" > 
                                            <Box sx={{ml: 1,transform: 'translateY(-2px)'}}>
                        <span className="d-block">{user.username}</span>
                        
                        <small style={{opacity: 0.7}}>
                            {
                                msg 
                                ? showMsg(user)
                                : user.fullname
                            }
                        </small>
                    </Box>
                        </Typography>
                  
                </Link>
            </Box>
    )
}

export default SearchUserCard
