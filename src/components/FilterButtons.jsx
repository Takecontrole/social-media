import React, { useEffect, useState, useRef } from "react";
import { IoChevronDown } from "react-icons/io5";
import AddIcon from '@mui/icons-material/Add';
import Dashboard from "./Dashboard";
import { motion } from "framer-motion";
import { useStateValue } from "../Context/StateProvider";
import { actionType } from "../Context/reducer";
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';
import { FreeMode } from "swiper";
import { Box, Button, useTheme } from "@mui/material"
const FilterButtons = ({ filterData, setFilterName, setFilterImg, changeQuote , flag }) => {
  const { palette } = useTheme(); 
  const [filterMenu, setFilterMenu] = useState(true);
  const [{ artistFilter, albumFilter, filterTerm }, dispatch] = useStateValue();
  const [openModul, setOpenModul] = useState(false);
   let menuRef = useRef();

  useEffect(() => {
    let handler = (e)=>{
      if(!menuRef.current.contains(e.target)){
        setOpenModul(false)
        console.log(menuRef.current);
      }      
    };

    document.addEventListener("mousedown", handler);
    

    return() =>{
      document.removeEventListener("mousedown", handler);
    }

  });
  const updateFilterButton = (name, imageURL) => {
    setFilterName(name);
    setFilterImg(imageURL);
    setFilterMenu(false);

    if (flag === "Artist") {
      dispatch({ type: actionType.SET_ARTIST_FILTER, artistFilter: name });
    }
    if (flag === "Albums") {
      dispatch({ type: actionType.SET_ALBUM_FILTER, albumFilter: name });
    }
    if (flag === "Exclusive") {
      dispatch({ type: actionType.SET_ALBUM_FILTER, albumFilter: name });
    }
  };
let ventana = "";
    if (flag === "Albums" || flag === "Artist" ) {
  ventana = "250px";
} else if(flag === "Exclusive") {
  ventana = "450px";
}

  return (
                       <Box position="relative" 
        height={ventana}
        display= "flex"
        px="0.5rem"
        overflow="hidden"
        >   
                      <Box display={openModul ? "default" : "none"} className="status_modal" >
                      <Box ref={menuRef} className="status_modal_add_song" >

                    <Dashboard/>
                   
                     </Box>
                    </Box>
        {(flag === "Albums" || flag === "Artist") &&
        <Box>
                      {flag === "Albums"&& (
         <h4>Ваши альбомы</h4>
              )}
                      {flag === "Artist"&& (
         <h4>Возможно вам понравиться</h4>
              )}
      {filterData  && (
        <Swiper 
        freeMode={true}
        autoHeight={true}
        modules={[FreeMode]} 
        
breakpoints={{
320: { 
      slidesPerView: 3.25,
      spaceBetween: 20
    },
    // when window width is >= 480px
    480: { 
      slidesPerView: 4,
      spaceBetween: 30
    },
    620: {
      slidesPerView: 5,
      spaceBetween: 30
    },
    1100: {
      slidesPerView: 7,
      spaceBetween: 20
    }
      }}
style={{position:"absolute",top:"4rem",width:"100%", zIndex:0 }}
onClick={changeQuote} 
> 

          { filterData?.slice(0,8).map((data) => (
          <SwiperSlide >
<Box sx={{display: "flex",
    alignItems: "center",
    minWidth: "200px",
    maxWidth: "350px",
    textAlign: "center",
    fontSize: "14px",
    overflow:"hidden"
}}> 
            <Box
              key={data.name}
              onClick={() => updateFilterButton(data.name, data.imageURL)}
              sx={{textAlign:"center"}}
            >
              {flag === "Albums"&& (
                <img
                  src={data.imageURL}
                  style={{ borderRadius:"8px"}}
                  className="albumImagesList"
                  alt=""
                />
              )}
              {flag === "Artist" && (
                <img
                  src={data.imageURL}
                  style={{width:"150px", height:"150px", borderRadius:"50%"}}
                  alt=""
                />
              )}
              <p >
                {data.name.length > 15
                  ? `${data.name.slice(0, 14)}...`
                  : data.name}
              </p>
            </Box>
          </Box>
          </SwiperSlide>
          ))}
          </Swiper>
          
      )}
    </Box>
        }
        {flag === "Exclusive"  && 
        <Box>
              <Box >
         <h4>Эксклюзив</h4> 
                          <Button 
                  style={{ 
            position: "absolute",  
            top: 0,
            right: 0,
            marginRight: "1rem",
            width: "150px",
            textAlign:"start",
            justifyContent:"start",
            borderRadius:"22px",
            backgroundColor: palette.neutral.medium,
            color: palette.primary.main,
             }}
            onClick={() => setOpenModul(!openModul)}>
             <span style={{marginLeft:"0.5rem",marginRight:"0.5rem"}}>
                <AddIcon />
                </span>
            <span sx={{fontSize:{xs:"8px",md:"12px", marginRight:"0.5rem"}}}>
               Загрузить 
                </span>
            </Button>
     </Box>
              
                    {filterData  && (
        <Swiper 
        
        freeMode={true}
        autoHeight={true}
        modules={[ FreeMode]}
breakpoints={{
320: {
      slidesPerView: 1,
      
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 1.25,
      
    },
    620: {
      slidesPerView: 1.5,
      
    },
    800: {
      slidesPerView: 2.25,
      
    },
    1100: {
      slidesPerView: 2.9,
      
    },
    1400: {
      slidesPerView: 3.25,
      
    },
    1500: {
      slidesPerView: 3.80,
      
    },
    1700: {
      slidesPerView: 4.5,
      
    }
      }}
style={{position:"absolute",top:"4rem",width:"100%", zIndex:0 }}
onClick={changeQuote} 
> 

          
                 {flag === "Exclusive" && filterData?.slice(13,14).map((data) => (
          <SwiperSlide style={{maxWidth: "265px"}} >
<Box sx={{display: "flex",
    alignItems: "center",
    maxHeight: "300px",
    minWidth: "200px",
    maxWidth: "250px",
    overflow:"hidden"
}}> 
            <Box
              key={data.name}
              onClick={() => updateFilterButton(data.name, data.imageURL)}
              sx={{textAlign:"center"}}
            >
              {flag === "Exclusive"&& (
                <img
                  src={data.imageURL}
                  style={{width:"250px", height:"300px", borderRadius:"8px",}}
                  
                  alt=""
                />
              )}
            </Box>
          </Box>
          </SwiperSlide>
          ))}
          
                 {flag === "Exclusive" && filterData?.slice(9,13).map((data) => (
          <SwiperSlide >
<Box sx={{display: "flex",
    alignItems: "center",
    maxHeight: "300px",
    minWidth: "200px",
    maxWidth: "350px",
    overflow:"hidden"
}}> 
            <Box
              key={data.name}
              onClick={() => updateFilterButton(data.name, data.imageURL)}
              sx={{textAlign:"center"}}
            >
              {flag === "Exclusive"&& (
                <img
                  src={data.imageURL}
                  style={{width:"350px", height:"300px", borderRadius:"8px"}}
                  
                  alt=""
                />
              )}
            </Box>
          </Box>
          </SwiperSlide>
          ))}
          </Swiper>
          
      )}
        </Box>
        }
    </Box>
  );
};

export default FilterButtons;
