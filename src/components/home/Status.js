import React from 'react';

import Avatar from '../Avatar'
import StatusModul from '../Avatar'
import { useSelector, useDispatch } from 'react-redux'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import {Box, Button, Typography, InputBase, useTheme} from "@mui/material"
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
const Status = () => {
    const { auth } = useSelector(state => state)
    const dispatch = useDispatch()
    const { palette } = useTheme(); 
    
    
    return (
        <Box sx={{display:"flex",alignItems:"center", padding: "0.75rem 1.5rem 0.75rem 1.5rem",
  backgroundColor: palette.background.alt,
  borderRadius: "22px", }} >
            <Avatar src={auth.user.avatar} size="big-avatar" />

      <Box
           width="100%"
      >  
                  <Button 
                  style={{ 
            width: "100%",
            textAlign:"start",
            justifyContent:"start",
            marginLeft:"1rem", 
            color:"black",
             }}
            onClick={() => dispatch({ type: GLOBALTYPES.STATUS, payload: true })}>
            <Typography sx={{fontSize:{xs:"8px",md:"12px"}}}>
                {auth.user.username} что у вас нового? 
                <span style={{marginLeft:"1rem"}}>
                <EditNoteOutlinedIcon/>
                </span>
                </Typography>
            </Button>
       
            
        </Box>
        
       
        </Box>
    )
}

export default Status
