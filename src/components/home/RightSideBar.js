import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import UserCard from '../UserCard'
import FollowBtn from '../FollowBtn'
import LoadIcon from '../../images/loading.gif'
import { getSuggestions } from '../../redux/actions/suggestionsAction'
import {Box, Typography, Grid} from "@mui/material"
const RightSideBar = () => {
    const { auth, suggestions } = useSelector(state => state)
    const dispatch = useDispatch()

    return ( 
                <Box sx={{mt:"1rem",py:"1rem", px:"0.5rem",backgroundColor:"white", borderRadius:"22px"}} >

            <div className="d-flex justify-content-between align-items-center my-2">
                <Typography variant="error">Рекомендуемые подписки</Typography>
                {
                    !suggestions.loading &&
                    <i className="fas fa-redo" style={{cursor: 'pointer'}}
                    onClick={ () => dispatch(getSuggestions(auth.token)) } />
                }
            </div>

            {
                suggestions.loading
                ? <img style={{width: "50px",
    height:"50px"}} src={LoadIcon} alt="loading" className="d-block mx-auto my-4" />
                : 
                <Grid container spacing={{ xs: 0.5,}} columns={{ xs: 8, sm: 12, md: 16 }}>
                    {
                        suggestions.users.map(user => (
                                                <Grid item xs={2} sm={4} md={4}>
                            <UserCard key={user._id} user={user} >
                                <FollowBtn user={user} />
                            </UserCard>
                         </Grid>
                        ))
                    }
                </Grid>
            }


       
        </Box>
    )
}

export default RightSideBar
