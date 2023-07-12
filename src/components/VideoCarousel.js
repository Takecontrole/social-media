import React from 'react';
import { useSelector } from 'react-redux';
import { Box } from "@mui/material";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';


const VideoCarousel = ({images, id}) => {
    

    const { theme } = useSelector(state => state)


    return ( 
      <Box > 

                      {
                    images.map((img, index) => (
                        <div> 
                        <video  src={img.url}  alt={img.url}
                                style={{filter: theme ? 'invert(1)' : 'invert(0)', minHeight:"220px",maxHeight:"700px",
                      width: "100%", objectFit:"cover"}} />
              </div>
                    ))
                }
                   
      </Box>

    )
}

export default VideoCarousel
