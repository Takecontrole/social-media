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
                            {
                                img.url.match(/video/i)
                                ? <video  src={img.url}  alt={img.url}
                                style={{filter: theme ? 'invert(1)' : 'invert(0)', minHeight:"220px",
                      width: "100%", objectFit:"cover"}} />

                                : <img src={img.url} className="w-100" alt={img.url}
                                style={{filter: theme ? 'invert(1)' : 'invert(0)'}} />
                            }
              </div>
                    ))
                }
                   
      </Box>

    )
}

export default VideoCarousel
