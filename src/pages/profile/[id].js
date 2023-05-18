import React, { useEffect, useState } from 'react'
import Followers from '../../components/profile/Followers'
import Following from '../../components/profile/Following'
import Info from '../../components/profile/Info'
import Posts from '../../components/profile/Posts'
import Saved from '../../components/profile/Saved'
import { Box, useMediaQuery, Divider } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux'
import LoadIcon from '../../images/loading.gif'
import { getProfileUsers } from '../../redux/actions/profileAction'
import { useParams } from 'react-router-dom'
import Status from '../../components/home/Status'
const Profile = () => {
    const { profile, auth } = useSelector(state => state)
    const dispatch = useDispatch()
    const isNonMobileScreens = useMediaQuery("(min-width:801px)");

    const { id } = useParams()
    const [saveTab, setSaveTab] = useState(false) 
    

    useEffect(() => {
        if(profile.ids.every(item => item !== id)){
            dispatch(getProfileUsers({id, auth}))
        }
    },[id, auth, dispatch, profile.ids])

    return ( 
      <Box> 

            <Info auth={auth} profile={profile} dispatch={dispatch} id={id} /> 
                                 <Box
        width="100%"
        padding="1.5rem 0.7rem"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
        
      >
              <Box
          flexBasis={isNonMobileScreens ? "65%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
            <Status/> 
            {
                auth.user._id === id &&
                <div className="profile_tab">
                    <button className={saveTab ? '' : 'active'} onClick={() => setSaveTab(false)}>Posts</button>
                    <button className={saveTab ? 'active' : ''} onClick={() => setSaveTab(true)}>Saved</button>
                </div>
            }

            {
                profile.loading 
                ? <img className="d-block mx-auto" src={LoadIcon} alt="loading" />
                : <>
                    {
                        saveTab
                        ? <Saved auth={auth} dispatch={dispatch} />
                        : <Posts auth={auth} profile={profile} dispatch={dispatch} id={id} />
                    }
                </>
            }
            </Box>
                         {isNonMobileScreens && (
          <Box flexBasis="35%" sx={{ml:"0.7rem"}} >
          <Box sx={{py:"1rem", px:"0.5rem",backgroundColor:"white", borderRadius:"22px"}} >
                            
                            <Followers 
                            auth={auth} profile={profile} dispatch={dispatch} id={id} 
                            />
                            <Box my="0.5rem">
                        <Divider />
                        </Box>
                            <Following 
                            auth={auth} profile={profile} dispatch={dispatch} id={id} 
                            />
                  </Box>
               </Box>
            )}   
          </Box>
        </Box>
    )
}

export default Profile
