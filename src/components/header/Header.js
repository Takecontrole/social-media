import React from 'react'
import { Link } from 'react-router-dom'
import Menu from './Menu'
import Search from './Search'
import {
Menu as MenuIcon
} from "@mui/icons-material";
import {Box, Typography, IconButton, useTheme, useMediaQuery} from "@mui/material";
import FlexBetween from "../FlexBetween";
import AvatarDropdown from "../AvatarDropdown";
const Header = ({ isSidebarOpen, setIsSidebarOpen }) => {
const theme = useTheme();
const isNonMobile = useMediaQuery("(min-width: 801px)");
    return (
        <div className="header">
            <nav style={{width:"100vw", height:"70px",right:0, display:"flex", alignItems:"center",  backgroundColor:"white"}} className="justify-content-between align-middle"> 
            
                 <IconButton sx={{display: { xs: 'block',  md: 'none' },                 "&:focus": { outline: "none !important"}}} onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon /> 
          </IconButton>

                <Link to="/" className="logo">

                    
                                          <Typography onClick={() => window.scrollTo({top: 0})} color={theme.palette.primary.main} sx={{ml:{sx:0.5,md:8}, fontSize:{sx:"8px", md:"12"}}}  fontWeight="bold">
                    VALENTLAND
                  </Typography>
                   
                </Link>

           <Box sx={{position:{md:"absolute"},ml:{xs: 1,  md:"22%", lg:"17%", xl:"14%"}}}>
                <Search /> 
                </Box>


                        
              {isNonMobile && ( 
                  <Box sx={{ml:"10%"}}>
             <AvatarDropdown/>  
                 </Box>
                 )}
        
            </nav>
        </div>
    )
}

export default Header
