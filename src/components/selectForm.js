import React from 'react'
import { 
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from "@mui/material"; 

const SelectForm = () => {
    

    return (
                             <Box m="1rem 6%"> 
                            <FormControl          size='small' >
   <Select defaultValue={1} > 
    <MenuItem  desabled value={1}>
          <span style={{height:"17px", display:"flex"}}><img src="/Flag-Russia.jpg" alt="russia" style={{width:"25px", marginRight:"5px"}}/>
    Русский</span></MenuItem>
    <MenuItem value={10}>
    <span style={{height:"17px",display:"flex"}}>
              <img src="/images.jpeg" alt="russia" style={{width:"25px", marginRight:"5px"}}/>
    English</span></MenuItem>
    <MenuItem value={20}>
    <span style={{height:"17px",display:"flex"}}>
              <img src="/Flag_of_Ukraine_(pantone_colors).svg.png" alt="russia" style={{width:"25px", marginRight:"5px"}}/>
                  Українська</span></MenuItem>
    <MenuItem value={30}>
    <span style={{height:"17px",display:"flex"}}>
              <img src="/Flag-Spain.jpg" alt="russia" style={{width:"25px", marginRight:"5px"}}/>
    Español</span></MenuItem>
 
  </Select>
  </FormControl>
  </Box>
    )
}

export default SelectForm