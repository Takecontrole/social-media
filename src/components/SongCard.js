import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux'
import {Box} from "@mui/material"
import { getAllSongs } from "../api";
import { actionType } from "../Context/reducer";
import { useStateValue } from "../Context/StateProvider";
import { motion } from "framer-motion";

 const SongCard = ({ data, id, textOfSongColor }) => {
  const [{ allSongs, song, isSongPlaying }, dispatch] = useStateValue();
  const { theme } = useSelector(state => state)
const addSongToContext = (id) => {
    if (!isSongPlaying) {
      dispatch({
        type: actionType.SET_SONG_PLAYING,
        isSongPlaying: true,
      });
    }
    if (song !== id) {
      dispatch({
        type: actionType.SET_SONG,
        song: id,
      });
    }
  };

  return (
    <motion.div className="position-relative d-flex mb-3 mt-3" key={data._id}
            onClick={() => addSongToContext(id)}>
        <motion.div
          whileTap={{ scale: 0.8 }}
          initial={{ opacity: 0, translateX: -50 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ duration: 0.3, delay: id < 33 ? (id < 22 ? id * 0.1 : (id-22)*0.1) : (id-33)*0.1}}
            className="d-flex pl-1"
        >
          <div >
            <motion.img
              whileHover={{ scale: 1.05 }}
              src={data.imageURL}
              alt=""
              
              style={{width:"60px", height:"60px", borderRadius:"8px", filter: `${theme ? 'invert(1)' : 'invert(0)'}`}}
            />
          </div>
          <Box textAlign="start" color={textOfSongColor}>
          <p style={{marginLeft:"0.5rem",fontWeight:"700"}}>
            {data.name.length > 25 ? `${data.name.slice(0, 25)}` : data.name}
            <p style={{fontWeight:"200"}} >
              {data.artist}
            </p>
          </p>
          </Box> 
        </motion.div>
    </motion.div>
  );
};
export default SongCard