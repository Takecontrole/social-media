import React, { useEffect, useState } from 'react'
import axios from "../../utils/axios"
import Followers from '../../components/profile/Followers'
import Following from '../../components/profile/Following'
import Info from '../../components/profile/Info'
import Posts from '../../components/profile/Posts'
import Saved from '../../components/profile/Saved'
import {Box, useMediaQuery, IconButton,
  InputBase, Tabs, Tab, AppBar, Divider} from "@mui/material"
import { useSelector, useDispatch } from 'react-redux'
import LoadIcon from '../../images/loading.gif'
import { getProfileUsers } from '../../redux/actions/profileAction'
import { useParams } from 'react-router-dom'
import Videos from '../../components/profile/Videos'
import StatusVideo from '../../components/home/StatusVideo'
import Status from '../../components/home/Status'
const Profile = () => {
  const { id } = useParams();
    const { profile, auth } = useSelector(state => state)
    const dispatch = useDispatch()
    const [tabvalue, setTabValue] = useState(0); 
    const isNonMobileScreens = useMediaQuery("(min-width:801px)");
   const [userData, setUserData] = useState([])
    

    useEffect(() => {
        if(id === auth.user._id){
            setUserData([auth.user])
        }else{
            const newData = profile.users.filter(user => user._id === id)
            setUserData(newData)
        }
    }, [id, auth, dispatch, profile.users])
    
    
  const handleTabsChange = (event, newValue) => {
    console.log(event);
    console.log(newValue);
    setTabValue(newValue);
  };

    const [saveTab, setSaveTab] = useState(false) 
    let ventana = "";
    if (tabvalue === 0) {
  ventana = "370px";
} else if(tabvalue === 1) {
  ventana = "250px";
}
else if(tabvalue === 2) {
  ventana = "250px";
}
else {
  ventana = "0";
}
    

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
        py="1.5rem"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
        
      >
                    <Box 
          flexBasis={isNonMobileScreens ? "65%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        > 
                    <Box position="relative" 
        height={ventana}
        backgroundColor="white"
        display= "flex"
        alignItems="center"
        borderRadius="22px"
        px="0.5rem"
        overflow="hidden"
        >     
        <AppBar position="absolute" top="0" color="default">
        <Tabs
          onChange={handleTabsChange}
          value={tabvalue}
          indicatorColor="primary"
          textColor="black"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example" 
          
        >
            <Tab sx={{"&:focus": { outline: "none !important"}, "&.Mui-selected": {
          backgroundColor: `white ! important`,
         borderRadius:"22px !important", boxShadow: '0 4px 12px 0 rgba(0,0,0,0.16)',margin:"5px"}, margin:"5px"}} label="Видео" />
          <Tab sx={{"&:focus": { outline: "none !important"}, "&.Mui-selected": {
          backgroundColor: `white ! important`,
         borderRadius:"22px !important", boxShadow: '0 4px 12px 0 rgba(0,0,0,0.16)',margin:"5px"},margin:"5px"}}  label="Фото"  />
          <Tab sx={{"&:focus": { outline: "none !important"}, "&.Mui-selected": {
          backgroundColor: `white ! important`,
         borderRadius:"22px !important", boxShadow: '0 4px 12px 0 rgba(0,0,0,0.16)',margin:"5px"}, margin:"5px"}} label="Музыка" />
          <Tab label="музыка" disabled />
        </Tabs>
      </AppBar> 
           {tabvalue === 0 && 
      <Box>
           
                   <Videos auth={auth} profile={profile} dispatch={dispatch} id={id}/>
          <StatusVideo/>
      </Box>
      }

      </Box>
        <Box mt="2rem">
                   </Box> 
                   {
                userData.map(user => (
                    

                        <Box >
                                {
                                    user._id === auth.user._id
                                   && 
                           <Status/> 
                                    
                                 
                                } 
                                </Box>

                                ))}

                                    
                                
            {
                auth.user._id === id &&
                <Box className="profile_tab">
                    <button className={saveTab ? '' : 'active'} onClick={() => setSaveTab(false)}>Посты</button>
                    <button className={saveTab ? 'active' : ''} onClick={() => setSaveTab(true)}>Сохранённое</button>
                </Box>
            }

            {
                profile.loading 
                ? <img className="d-block mx-auto" style={{width: "50px",
    height:"50px"}} src={LoadIcon} alt="loading" />
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
