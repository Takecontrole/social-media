import React, { useEffect, useState } from 'react'
import Saved from '../components/profile/Saved'
import {Box, useMediaQuery, IconButton,
  InputBase, Tabs, Tab, AppBar, Divider} from "@mui/material"
import { useSelector, useDispatch } from 'react-redux'


const Favorite = () => {
    const { profile, auth } = useSelector(state => state)
    const dispatch = useDispatch()
    const [tabvalue, setTabValue] = useState(0); 
    const isNonMobileScreens = useMediaQuery("(min-width:801px)");
   const handleTabsChange = (event, newValue) => {
    console.log(event);
    console.log(newValue);
    setTabValue(newValue);
  };
    
  

    return ( 
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
        height="100%"
        backgroundColor="white"
        display= "flex"
        alignItems="center"
        borderRadius="22px"
        px="0.5rem"
        overflow="hidden"
        >     
   
           {tabvalue === 0 && 
      <Box>
           
<Saved auth={auth} dispatch={dispatch} />

      </Box>
      }
           {tabvalue === 1 && 
      <Box>
           
<Saved auth={auth} dispatch={dispatch} />

      </Box>
      }
      </Box>
  


            </Box>

                  {isNonMobileScreens && (
    <Box flexBasis="35%" sx={{ml:"0.7rem"}} > 
                                          <AppBar position="static" color="default" sx={{      
                     borderRadius:"22px ! important"                       }}>
        <Tabs
          onChange={handleTabsChange}
          value={tabvalue}
          orientation="vertical"
          indicatorColor="transparent"
          textColor="black"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example" 
          backgroundColor="transparent"
          overflow="hidden"
        >
          <Tab sx={{"&:focus": { outline: "none !important"}, "&.Mui-selected": {
          backgroundColor: `white ! important`,
         borderRadius:"22px !important", boxShadow: '0 4px 12px 0 rgba(0,0,0,0.16)',margin:"5px"}, margin:"5px"}} label="Посты" />
          <Tab sx={{"&:focus": { outline: "none !important"}, "&.Mui-selected": {
          backgroundColor: `white ! important`,
         borderRadius:"22px !important", boxShadow: '0 4px 12px 0 rgba(0,0,0,0.16)',margin:"5px"},margin:"5px"}}  label="Видео"  />
          <Tab sx={{"&:focus": { outline: "none !important"}, "&.Mui-selected": {
          backgroundColor: `white ! important`,
         borderRadius:"22px !important", boxShadow: '0 4px 12px 0 rgba(0,0,0,0.16)',margin:"5px"}, margin:"5px"}} label="Фото" />
        </Tabs>
      </AppBar> 

            </Box>
            )}   
          </Box>
       
    )
}

export default Favorite