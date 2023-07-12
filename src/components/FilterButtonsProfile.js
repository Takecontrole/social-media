import React, { useEffect, useState, useRef } from "react";
import { useSelector } from 'react-redux'
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
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
const FilterButtonsProfile = ({ filterData, setFilterName, setFilterImg, changeQuote , flag }) => {
  const [{ albumFilter, filterTerm }, dispatch] = useStateValue();
  const { palette } = useTheme(); 
  const { theme } = useSelector(state => state)
  const [filterMenu, setFilterMenu] = useState(true);
  
  
  const updateFilterButton = (name, imageURL) => {
    setFilterName(name);
    setFilterImg(imageURL);
    setFilterMenu(false);

    
    if (flag === "Albums") {
      dispatch({ type: actionType.SET_ALBUM_FILTER, albumFilter: name });
    }
  };
let ventana = "250px";
    

  return (
                       <Box position="relative" 
        height={ventana}
        display= "flex"
        px="0.5rem"
        overflow="hidden"
        >   
        {(flag === "Albums"  &&
        <Box>
                      {flag === "Albums"&& (
         <h4>Мои альбомы</h4>
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
      slidesPerView: 3.25,
      spaceBetween: 30
    },
    620: {
      slidesPerView: 3.5,
      spaceBetween: 30
    },
    1100: {
      slidesPerView: 4.5,
      spaceBetween: 20
    },
    1350: {
      slidesPerView: 5.5,
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
                  style={{ borderRadius:"8px", filter: `${theme ? 'invert(1)' : 'invert(0)'}`}}
                  className="albumImagesList"
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
        )}
    </Box>
  );
};

export default FilterButtonsProfile;
