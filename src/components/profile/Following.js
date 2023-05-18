import React, { useState, useEffect } from 'react'
import UserCard from '../UserCard'
import FollowBtn from '../FollowBtn'
import { useSelector } from 'react-redux'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import { Box, Grid, Typography} from "@mui/material";
const Following = ({id, auth, profile, dispatch}) => {
    
    const [userData, setUserData] = useState([])
    useEffect(() => {
        if(id === auth.user._id){
            setUserData([auth.user])
        }else{
            const newData = profile.users.filter(user => user._id === id)
            setUserData(newData)
        }
    }, [id, auth, dispatch, profile.users])
    
    return (
        <Box width="100%">
                    {
                userData.map(user => (
           
            <Box >
                <Typography mb="0.5rem">Подписки {user.following.length}</Typography >
               

<Grid container spacing={{ xs: 0.5,}} columns={{ xs: 8, sm: 12, md: 16 }}>
  
                    {
                        user.following.slice(0, 4).map(user => (
                        <Grid item xs={2} sm={4} md={4}>
                            <UserCard key={user._id} user={user}  >

                            </UserCard>
                            </Grid>
                        ))
                    }
                </Grid>

                
                
            </Box>
                ))
            }
        </Box>
    )
}

export default Following
