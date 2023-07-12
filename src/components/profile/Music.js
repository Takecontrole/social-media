import React, { useEffect, useState } from "react";
import { getAllSongs } from "../../api";
import { actionType } from "../../Context/reducer";
import { useSelector } from 'react-redux'
import { useStateValue } from "../../Context/StateProvider";
import Albums from "./Albums";
import { motion } from "framer-motion";
import axios from "../../utils/axios";
const Music = () => {
  const [
    {
      isSongPlaying,
      song,
      allSongs,
      albumFilter,
    },
    dispatch,
  ] = useStateValue();
  
  const [filteredSongs, setFilteredSongs] = useState(null);

  useEffect(() => {
    if (!allSongs) {
      getAllSongs().then((data) => {
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.data,
        });
      });
    }
  }, []);

  
  useEffect(() => {
    const filtered = allSongs?.filter((data) => data.album === albumFilter );
    if (filtered) {
      setFilteredSongs(filtered);
    } else {
      setFilteredSongs(null);
    }
  }, [albumFilter]);
  return (
   <div style={{width:"100%"}}>
     <Albums />
      
        <HomeSongContainer musics={filteredSongs ? filteredSongs : allSongs} />
      
  </div> 
    )
};


export const HomeSongContainer = ({ musics }) => { 
  const [{ isSongPlaying, song }, dispatch] = useStateValue();
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
    <>
      {musics?.slice(0, 3).map(({_id, id, name, imageURL, artist}, index) => (
        <motion.div
          key={_id}
          whileTap={{ scale: 0.8 }}
          initial={{ opacity: 0, translateX: -50 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ duration: 0.3, delay: id * 0.1 }}
            onClick={() => addSongToContext(id)}
            className="d-flex pl-1 "
            
        >
          <div >
            <motion.img
              whileHover={{ scale: 1.05 }}
              src={imageURL}
              alt=""
              
              style={{filter: `${theme ? 'invert(1)' : 'invert(0)'}`,width:"60px", height:"60px", borderRadius:"8px"}}
            />
          </div>
          <div className=" p-2">
          <p style={{fontWeight:"700"}}>
            {name.length > 25 ? `${name.slice(0, 25)}` : name}
            <p style={{fontWeight:"200"}} >
              {artist}
            </p>
          </p>
          </div>
        </motion.div>
      ))}
    </>
  );
};

export default Music