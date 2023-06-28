import React, { useEffect, useState} from "react";
import { deleteSongById, getAllSongs } from "../api";
import { actionType } from "../Context/reducer";
import { useStateValue } from "../Context/StateProvider";
import  { default as MusicPlayer }  from "../components/MusicPlayer";
import Filter from "../components/Filter";
import SongCard from "../components/SongCard";
import SearchBar from "../components/SearchBar";
import { motion } from "framer-motion";
import axios from "../utils/axios";
import { IoTrash } from "react-icons/io5";
import AlertSuccess from "../components/AlertSuccess";
import AlertError from "../components/AlertError";
import {Box} from "@mui/material"
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
let scroll = 0;

const Music = () => {
  
   const [
    {
      searchTerm,
      isSongPlaying,
      song,
      allSongs,
      artistFilter,
      filterTerm,
      albumFilter,
      languageFilter,
    },
    dispatch,
  ] = useStateValue();

  const [filteredSongs, setFilteredSongs] = useState(null);
  const [filterName, setFilterName] = useState(null);
  const [filterImg, setFilterImg] = useState(null);
 
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
    if (searchTerm.length > 0) {
      const filtered = allSongs.filter(
        (data) =>
          data.artist.toLowerCase().includes(searchTerm) ||
          data.language.toLowerCase().includes(searchTerm) ||
          data.name.toLowerCase().includes(searchTerm) ||
          data.artist.includes(artistFilter)
      );
      setFilteredSongs(filtered);
    } else {
      setFilteredSongs(null);
    }
  }, [searchTerm]);

  useEffect(() => {
    const filtered = allSongs?.filter((data) => data.artist === artistFilter);
    if (filtered) {
      setFilteredSongs(filtered);
    } else {
      setFilteredSongs(null);
    }
  }, [artistFilter]);

  useEffect(() => {
    const filtered = allSongs?.filter(
      (data) => data.category.toLowerCase() === filterTerm
    );
    if (filtered) {
      setFilteredSongs(filtered);
    } else {
      setFilteredSongs(null);
    }
  }, [filterTerm]);

  useEffect(() => {
    const filtered = allSongs?.filter((data) => data.album === albumFilter);
    if (filtered) {
      setFilteredSongs(filtered);
    } else {
      setFilteredSongs(null);
    }
  }, [albumFilter]);

  useEffect(() => {
    const filtered = allSongs?.filter(
      (data) => data.language === languageFilter
    );
    if (filtered) {
      setFilteredSongs(filtered);
    } else {
      setFilteredSongs(null);
    }
  }, [languageFilter]);

const Myarray = [
  {
    quote:
'linear-gradient(90deg, #2193b0 0%, #6dd5ed 100%)'
  },
  {
    quote:
    'linear-gradient(90deg, #000428 0%, #004e92 100%)'
  },
  {
    quote:
'linear-gradient(90deg, #870000 0%, #190a05 100%)'
  },
  {
    quote:
'linear-gradient(90deg, #000000 0%, #434343 100%)'
  },
  {
    quote:
'linear-gradient(90deg, #eef2f3 0%, #8e9eab 100%)'
  },
  {
    quote:
'linear-gradient(90deg, #ba8b02 0%, #181818 100%)'
  },
  {
    quote: 'linear-gradient(90deg, #33001b 0%, #ff0084 100%)'
    
  },
  {
    quote:
'linear-gradient(90deg, #136a8a 0%, #267871 100%)'
  },
  {
    quote:
'linear-gradient(90deg, #ffafbd 0%, #ffc3a0 100%)'
  },
  {
    quote: 
'linear-gradient(90deg, #ee9ca7 0%, #ffdde1 100%)'
  },
  {
    quote:
'linear-gradient(90deg, #06beb6 0%, #48b1bf 100%)'
  },
  {
    quote:
'linear-gradient(90deg, #02aab0 0%, #00cdac 100%)'
  }
];

  
const [index, setIndex] = useState(0); // setting 1st quote as default

  function changeQuote() {
    let newIndex = Math.floor(Math.random() * (Myarray.length - 0) + 0); // now on every click setting a random index between 0 and quotes array length (quotes array length is excluded)
    setIndex(newIndex);
  }
  return (
    <Box sx={{overflow:"hidden", backgroundColor:"white"}}  >
{/*   
      <SearchBar />

      {searchTerm.length > 0 && (
        <p >
          Searched for :
          <span >
            {searchTerm}
          </span>
        </p>
      )}
*/}

        
      <Filter changeQuote={changeQuote} setFilterName={setFilterName} setFilterImg={setFilterImg}
      setFilteredSongs={setFilteredSongs} />
      
     { filteredSongs && ( 
              <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
           className="status_modal">
       <Box className="status_modal_bg" sx={{backgroundImage: Myarray[index].quote}}>
       <Box className="status_body">
       <Box className="status_head"  > 
       <button className="status_head_btn" onClick={() => setFilteredSongs(null)}><KeyboardBackspaceIcon/></button> 
                   {filterImg ? 
                             <img
                  src={filterImg}
                  style={{width:"200px", height:"200px", objectFit:"cover", borderRadius:"15px", boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"}}
                  alt=""
                /> 
                : 
                <div className="welcome">добро пожаловать в раздел музыки
                        <button style={{marginTop:"1.5rem", padding:"0.5",border:"none", borderRadius:"15px", width:"120px", backgroundImage:'linear-gradient(90deg, #ffafbd 0%, #ffc3a0 100%)', color:"white"}} onClick={() => setFilteredSongs(null)}>поехали</button> 
                        </div>
                   }
           <h5>{filterName}</h5> 
      </Box>
      <Box className="playlist">
        {filteredSongs?.map((song) => (
          <SongCard textOfSongColor="white" key={song._id} data={song} id={song.id} />
        ))}
      </Box>
      </Box>
      </Box>
      </motion.div> 
      )}
    </Box>
  );
};
export default Music