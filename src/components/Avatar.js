import React from 'react'
import { useSelector } from 'react-redux'
import {Box, Typography} from "@mui/material";
const Avatarka = ({src, fullname, username, size}) => {
    const { theme } = useSelector(state => state)

    return ( 
      <Box sx={{display:"flex",  color:"black"}}>
        <img src={src} alt="avatar" className={size}
        style={{filter: `${theme ? 'invert(1)' : 'invert(0)'}`}} /> 

        </Box>
    )
}

export default Avatarka
