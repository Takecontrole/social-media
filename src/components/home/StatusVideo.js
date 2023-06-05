import React from 'react';
import { useDispatch } from 'react-redux'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import {Box, Button, Typography, InputBase, useTheme} from "@mui/material"
import AddAPhotoSharpIcon from '@mui/icons-material/AddAPhotoSharp';
const StatusVideo = () => {
  
    const dispatch = useDispatch()
    const { palette } = useTheme(); 
    
    
    return (
        <Box sx={{position:"absolute",bottom:0,display:"flex",alignItems:"center", padding: "0.75rem 1.5rem 0.75rem 0rem",
  backgroundColor: palette.background.alt,
  borderRadius: "22px", }} >
      <Box
           width="100%"
      >  
                  <Button 
                  style={{ 
            width: "100%",
            textAlign:"start",
            justifyContent:"start",
            borderRadius:"22px",
            backgroundColor: palette.neutral.medium,
            color: palette.primary.main,
             }}
            onClick={() => dispatch({ type: GLOBALTYPES.VIDEOSTATUS, payload: true })}>
             <span style={{marginLeft:"1rem",marginRight:"1rem"}}>
                <AddAPhotoSharpIcon/>
                </span>
            <Typography sx={{fontSize:{xs:"8px",md:"12px", marginRight:"1rem"}}}>
               Добавить видео
                </Typography>
            </Button>
       
            
        </Box>
        
       
        </Box>
    )
}

export default StatusVideo
