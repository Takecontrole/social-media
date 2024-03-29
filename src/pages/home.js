import React, { useEffect } from 'react'
import { Box, Tabs, Tab, AppBar, useMediaQuery, useTheme} from "@mui/material";
import Status from '../components/home/Status'
import VideoThumb from '../components/VideoThumb'
import Posts from '../components/home/Posts'
import Photos from '../components/home/Photos'
import { useSelector } from 'react-redux'
import LoadIcon from '../images/loading.gif'
import RightSideBar from '../components/home/RightSideBar'



let scroll = 0;

const Home = () => {
    const { homePosts, homeVideos, homePhotos } = useSelector(state => state) 
    const theme = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width:801px)");
    const [tabvalue, setTabValue] = React.useState(0); 
    const handleTabsChange = (event, newValue) => {
    console.log(event);
    console.log(newValue);
    setTabValue(newValue);
  };
    window.addEventListener('scroll', () => {
        if(window.location.pathname === '/'){
            scroll = window.pageYOffset
            return scroll;
        }
    })

    useEffect(() => {
        setTimeout(() => {
            window.scrollTo({top: scroll, behavior: 'smooth'})
        }, 100)
    },[])

    return (
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

                                      <Status />
               {!isNonMobileScreens && (                  <RightSideBar />          )}    
                                  {!isNonMobileScreens && (
                                                      <Box position="relative"
                     marginTop="1rem"     height="60px"
                     marginBottom="1rem"  
        >     
                  <AppBar position="absolute" top="0" color="default" sx={{  
                     borderRadius:"22px ! important", zIndex:"0 !important"}} >
        <Tabs
          onChange={handleTabsChange}
          value={tabvalue}
          indicatorColor="transparent"
          textColor="black"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example" 
          
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
          
           {tabvalue === 0 && <div className="posts"> 
                {
                    homePosts.loading 
                    ? <img src={LoadIcon}
                    style={{width: "100px",
    height:"100px"}} alt="loading" className="d-block mx-auto" />
                    : (homePosts.result === 0 && homePosts.posts.length === 0)
                        ? <h2 className="text-center">Нет постов</h2>
                        : <Posts />
                }
                      </div>} 
               {tabvalue === 1 && <div className="posts">  


                        <VideoThumb videos={homeVideos.videos} /> 
                
            
                 </div>} 
               {tabvalue === 2 && <div className="posts">  
                            {
                    homePhotos.loading 
                    ? <img src={LoadIcon}
                    style={{width: "100px",
    height:"100px"}} alt="loading" className="d-block mx-auto" />
                    : (homePhotos.result === 0 && homePhotos.photos.length === 0)
                        ? <h2 className="text-center">Нет фотографий</h2>
                        : 
                <Photos/>
                }
                 </div>} 
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
          sx={{display:"flex", justifyContent:"center", alignItems:"center"}}
        >
          <Tab sx={{minWidth:{md:"250px", lg:"350px", xl:"450px"},"&:focus": { outline: "none !important"}, "&.Mui-selected": {
          backgroundColor: `white ! important`,
         borderRadius:"22px !important", boxShadow: '0 4px 12px 0 rgba(0,0,0,0.16)',margin:"5px"}, margin:"5px"}} label="Посты" />
          <Tab sx={{minWidth:{md:"250px", lg:"350px", xl:"450px"},"&:focus": { outline: "none !important"}, "&.Mui-selected": {
          backgroundColor: `white ! important`,
         borderRadius:"22px !important", boxShadow: '0 4px 12px 0 rgba(0,0,0,0.16)',margin:"5px"},margin:"5px"}}  label="Видео"  />
          <Tab sx={{minWidth:{md:"250px", lg:"350px", xl:"450px"},"&:focus": { outline: "none !important"}, "&.Mui-selected": {
          backgroundColor: `white ! important`,
         borderRadius:"22px !important", boxShadow: '0 4px 12px 0 rgba(0,0,0,0.16)',margin:"5px"}, margin:"5px"}} label="Фото" />
        </Tabs>
      </AppBar> 
                <RightSideBar />
            </Box>
            )}
        </Box>
    )
}

export default Home
