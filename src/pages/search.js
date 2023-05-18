import React, { useEffect } from 'react'
import { Box, useMediaQuery } from "@mui/material";

import LoadIcon from '../images/loading.gif'
import AdvancedSearch from "../components/advancedSearch/AdvancedSearch"


let scroll = 0;

const Search = () => {
    const isNonMobileScreens = useMediaQuery("(min-width:801px)");

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
      >
  <AdvancedSearch/>
                

        </Box>
    )
}

export default Search
