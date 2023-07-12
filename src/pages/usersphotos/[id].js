import React, {useRef, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import ProfileImg from '../../components/ProfileImg'
import {Box, useMediaQuery} from "@mui/material"
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Carousel from '../../components/Carousel'
import ProfileCardFooter from '../../components/home/photo_card/ProfileCardFooter'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Usersphotos = () => {
    const { id } = useParams();
    const { profile, auth, theme } = useSelector(state => state)
    const dispatch = useDispatch()
    const [photos, setPhotos] = useState([])
    const [slideNumber, setSlideNumber] = useState(0);
    const [open, setOpen] = useState(false);
    const isNonMobileScreens = useMediaQuery("(min-width:801px)");
    const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  }; 
  
    useEffect(() => {
        profile.photos.forEach(data => {
            if(data._id === id){
                setPhotos(data.photos)
                
            }
        })
    },[profile.photos, id])

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


    return (
     <Box
        width="100%"
        padding="1.5rem 0.7rem"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
        
      >
                           <Box display={open ? "flex" : "none" } className="status_modal" sx={{ alignItems:"center", justifyContent:"center"}}>
       <Box  className="status_modal_photo_bg" sx={{maxWidth:{sx:"100%",md:"70%"},height:"100%", margin:"1rem", }} >
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
                   <Box
          flexBasis={isNonMobileScreens ? "65%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        > 
               <h6>Мои фотографии</h6>
               <Grid style={{height:"60%", width:"100%"}} container spacing={0} >
      {photos.map((item, i) => ( 
         <Grid item xs={4} md={4} lg={2} style={{ width:"33%"}} elevation={0}>
          <Item onClick={() => handleOpen(i)} elevation={0}>
                 <ProfileImg images={item.images} id={item._id} />
         </Item>
         </Grid>
       ))} 
         </Grid>
  
      </Box>
      
    </Box>
    )
}

export default Usersphotos