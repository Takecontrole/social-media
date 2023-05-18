import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { follow, unfollow } from '../redux/actions/profileAction'
import {Box, Button, useTheme, useMediaQuery} from "@mui/material"
import PersonRemoveOutlinedIcon from '@mui/icons-material/PersonRemoveOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import {LocalPhoneTwoTone} from "@mui/icons-material";
const FollowBtn = ({user}) => {
    const [followed, setFollowed] = useState(false)

    const { auth, profile, socket } = useSelector(state => state)
    const dispatch = useDispatch()
    const { palette } = useTheme();
    const theme = useTheme(); 
    const [load, setLoad] = useState(false)
    const isNonMobile = useMediaQuery("(min-width: 801px)");

    useEffect(() => {
        if(auth.user.following.find(item => item._id === user._id)){
            setFollowed(true)
        }
        return () => setFollowed(false)
    }, [auth.user.following, user._id])

    const handleFollow =  async () => {
        if(load) return;

        setFollowed(true)
        setLoad(true)
        await dispatch(follow({users: profile.users, user, auth, socket}))
        setLoad(false)
    }

    const handleUnFollow = async () => {
        if(load) return;

        setFollowed(false)
        setLoad(true)
        await dispatch(unfollow({users: profile.users, user, auth, socket}))
        setLoad(false)
    }

    return (
        <> 
                <Button sx={{ 
                position:"absolute",
                right:"80px",
                bottom:{xs:0, md:"38%"},
                m: "0.5rem ",
                p: "0.5rem",
                borderRadius:"10px",
                backgroundColor: palette.neutral.medium,
                color: palette.primary.main,
                "&:hover": {backgroundColor:palette.neutral.mediumMain, color: palette.primary.main},
                "&:focus": { outline: "none !important"}
                
              }} >
           <LocalPhoneTwoTone/>
            </Button>

                    {
            followed
            ? 
            <Button sx={{ 
                position:"absolute",
                right:0,
                bottom:{xs:0, md:"38%"},
                m: "0.5rem ", 
                p: "0.5rem",
                borderRadius:"10px",
                backgroundColor: palette.neutral.medium,
                color: palette.primary.main,
                "&:hover": {backgroundColor:palette.neutral.mediumMain, color: palette.primary.main},
                                "&:focus": { outline: "none !important"}
              }}
            onClick={handleUnFollow}>
                <PersonRemoveOutlinedIcon/>
            </Button>
            : <Button sx={{ 
                position:"absolute",
                right:0,
                bottom:{xs:0, md:"38%"},
                m: "0.5rem ",
                p: "0.5rem",
                borderRadius:"10px",
                backgroundColor: palette.neutral.medium,
                color: palette.primary.main,
                "&:hover": {backgroundColor:palette.neutral.mediumMain, color: palette.primary.main},
                                "&:focus": { outline: "none !important"}
               }}
            onClick={handleFollow}>
                <PersonAddAltOutlinedIcon/> 
            </Button>
                 } 
</>
    )
}

export default FollowBtn
