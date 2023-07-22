import React, { useRef, useEffect, useState } from 'react'
import axios from "../../utils/axios"
import Followers from '../../components/profile/Followers'
import Following from '../../components/profile/Following'
import Info from '../../components/profile/Info'
import Posts from '../../components/profile/Posts'
import Saved from '../../components/profile/Saved'
import {Box, Typography, useMediaQuery, IconButton,
  InputBase, Tabs, Tab, AppBar, Divider, useTheme} from "@mui/material"
  import {Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import LoadIcon from '../../images/loading.gif'
import { getProfileUsers } from '../../redux/actions/profileAction'
import { useParams } from 'react-router-dom'
import Videos from '../../components/profile/Videos'
import Music from '../../components/profile/Music'
import StatusVideo from '../../components/home/StatusVideo'
import StatusPhoto from '../../components/home/StatusPhoto'
import Status from '../../components/home/Status'
import ProfileImg from '../../components/ProfileImg'
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Carousel from '../../components/Carousel'
import ProfileCardFooter from '../../components/home/photo_card/ProfileCardFooter'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
const Profile = () => {
  const { id } = useParams();
    const { profile, auth, theme } = useSelector(state => state)
    const dispatch = useDispatch()
    const [tabvalue, setTabValue] = useState(0); 
    const isNonMobileScreens = useMediaQuery("(min-width:801px)");
    const littleScreen = useMediaQuery("(min-width:1200px)");
   const [userData, setUserData] = useState([])
    const [photos, setPhotos] = useState([])
    const [slideNumber, setSlideNumber] = useState(0);
    const { palette } = useTheme(); 
  const [open, setOpen] = useState(false);
    const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  }; 
  
     let menuRef = useRef();
  useEffect(() => {
    let handler = (e)=>{
      if(!menuRef.current.contains(e.target)){
        setOpen(false)
      }      
    };

    document.addEventListener("mousedown", handler);
    

    return() =>{
      document.removeEventListener("mousedown", handler);
    }
    })
  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? photos.length -1 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === photos.length -1 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber)
  };
    const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(0.3),
  textAlign: "center",
  maxHeight:"150px",
  maxWidth:"150px",
  overflow:"hidden",
  color: theme.palette.text.secondary
}));
    useEffect(() => {
        profile.photos.forEach(data => {
            if(data._id === id){
                setPhotos(data.photos)
                
            }
        })
    },[profile.photos, id])
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
  ventana = "400px";
}
else if(tabvalue === 2) {
  ventana = "590px";
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
        borderRadius="22px"
        px="0.5rem"
        overflow="hidden"
        >     
        <AppBar position="absolute" top="0" color="default" elevation={0} sx={{backgroundColor:"white",zIndex:1}}>
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
         borderRadius:"22px !important", boxShadow: '0 4px 12px 0 rgba(0,0,0,0.16)',margin:"5px"}, margin:"5px"}} label="Видео" />
          <Tab sx={{"&:focus": { outline: "none !important"}, "&.Mui-selected": {
          backgroundColor: `white ! important`,
         borderRadius:"22px !important", boxShadow: '0 4px 12px 0 rgba(0,0,0,0.16)',margin:"5px"},margin:"5px"}}  label="Фото"  />
          <Tab sx={{"&:focus": { outline: "none !important"}, "&.Mui-selected": {
          backgroundColor: `white ! important`,
         borderRadius:"22px !important", boxShadow: '0 4px 12px 0 rgba(0,0,0,0.16)',margin:"5px"}, margin:"5px"}} label="Музыка" />
          <Tab label="разраб" disabled />
        </Tabs>
      </AppBar> 
           {tabvalue === 0 && 
      <Box>
           
                   <Videos auth={auth} profile={profile} dispatch={dispatch} id={id}/>
          <StatusVideo/> 
      </Box>
      }
           {tabvalue === 1 && 
      <Box style={{display:"flex",marginTop:"4rem", marginBottom:"2rem"}}> 
      
   {!littleScreen ? 
       <Grid style={{height:"60%", width:"100%"}} container spacing={0} >
      {photos.slice(0,6).map((item, i) => ( 
         <Grid item xs={4} md={4} lg={2} style={{ width:"33%"}} elevation={0}>
          <Item onClick={() => handleOpen(i)} elevation={0}>
                 <ProfileImg images={item.images} id={item._id} />
         </Item>
         </Grid>
       ))} 
        </Grid>
        :
               <Grid style={{height:"60%", width:"100%"}} container spacing={0} >
      {photos.slice(0,12).map((item, i) => ( 
         <Grid item xs={4} md={4} lg={2} style={{ width:"33%"}} elevation={0}>
          <Item onClick={() => handleOpen(i)}  elevation={0}>
                 <ProfileImg images={item.images} id={item._id} />
         </Item>
         </Grid>
       ))} 
        </Grid>
        }
          <StatusPhoto/>
          <Divider sx={{position:"absolute", bottom:"10px", left:"50%", height:"40px", }} orientation="vertical"/>
           <Link 
                 style={{position:"absolute", bottom:0, right:0, padding: "0.75rem 1.5rem 1.15rem 0rem", color:palette.primary.main, textDecoration:"none"}} to={`/usersphotos/${auth.user._id}`}>
                 <Typography sx={{fontSize:{xs:"14px",md:"16px", marginRight:"1rem"}}}>
                 показать все <ArrowForwardIosIcon sx={{fontWeight:"bold",width:"10px", height:"10px"}}/>
                </Typography>
          </Link>
      </Box>
      }
      
           {tabvalue === 2 && 
      <Box mt="4rem" width="100%">
           
                   <Music/>
                    <Divider sx={{position:"absolute", bottom:"50px", width:"100%", }}/>
                    

                    <Link 
                 style={{position:"absolute", width:"100%", bottom:0, display:"flex", alignItems:"center", justifyContent:"center", textAlign:"center", padding: "0.75rem 1.5rem 1.25rem 0rem", color:palette.primary.main, textDecoration:"none"}} to="/music">
                 <Typography sx={{fontSize:{xs:"14px",md:"16px"}}}>
                 перейти в раздел <ArrowForwardIosIcon sx={{fontWeight:"bold",width:"10px", height:"10px"}}/>
                </Typography>
                </Link>
                
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
           
              <Box display={open ? "default" : "none" } className="status_modal">
       <Box  className="status_modal_photo_bg" sx={{maxWidth:{sx:"100%",md:"70%"},height:"100%", display:"flex", alignItems:"center", justifyContent:"center"}} >
       <Box ref={menuRef} className="status_body"  sx={{alignItems:"center", justifyContent:"center", height:{xs:"600px", sm:"840px"}, width:"100%", backgroundColor:"#363636", borderRadius:{xs:"10px", sm:"15px"}}}>
       <ArrowBackIosIcon onClick={() => handleMove("l")} sx={{position:"absolute", width:{xs:"30px",md:"70px"}, height:{xs:"30px",md:"70px"},left:{xs:0, sm:"-80px"}, top:"45%", color:"#F5F5F5", opacity:"0.8", zIndex:10}}/>
       <ArrowForwardIosIcon onClick={() => handleMove("r")} sx={{position:"absolute", width:{xs:"30px",md:"70px"}, height:{xs:"30px",md:"70px"},right:{xs:0, sm:"-80px"}, top:"45%", color:"#F5F5F5", opacity:"0.8", zIndex:10}}/> 
       {open && ( 
       <>
    <Carousel images={photos[slideNumber].images} id={photos[slideNumber]._id} />
    <ProfileCardFooter photo={photos[slideNumber]} photos={photos} slideNumber={slideNumber}/>
    </>
      )} 
      </Box>
      </Box>
      </Box> 
 
      
        </Box>
    )
}

export default Profile
