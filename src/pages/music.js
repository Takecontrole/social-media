import React, { useEffect, useState } from "react";
import { getAllSongs } from "../api";
import { actionType } from "../Context/reducer";
import { useStateValue } from "../Context/StateProvider";
import { SongCard } from "../components/DashboardSongs";
import  { default as MusicPlayer }  from "../components/MusicPlayer";
import Filter from "../components/Filter";
import SearchBar from "../components/SearchBar";
import Dashboard from "../components/Dashboard";
import { motion } from "framer-motion";
import axios from "../utils/axios";



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

  return (
    <div >
   
      <SearchBar />

      {searchTerm.length > 0 && (
        <p >
          Searched for :
          <span >
            {searchTerm}
          </span>
        </p>
      )}

      <Filter setFilteredSongs={setFilteredSongs} />

      <div >
        <HomeSongContainer musics={filteredSongs ? filteredSongs : allSongs} />
      </div> 
      
      <Dashboard/>
      

    </div>
  );
};

export const HomeSongContainer = ({ musics }) => {
  const [{ isSongPlaying, song }, dispatch] = useStateValue();

  const addSongToContext = (index) => {
    if (!isSongPlaying) {
      dispatch({
        type: actionType.SET_SONG_PLAYING,
        isSongPlaying: true,
      });
    }
    if (song !== index) {
      dispatch({
        type: actionType.SET_SONG,
        song: index,
      });
    }
  };
  return (
    <>
      {musics?.slice(0, 3).map((data, index) => (
        <motion.div
          key={data._id}
          whileTap={{ scale: 0.8 }}
          initial={{ opacity: 0, translateX: -50 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
            onClick={() => addSongToContext(index)}
        >
          <div >
            <motion.img
              whileHover={{ scale: 1.05 }}
              src={data.imageURL}
              alt=""
              style={{width:"40px", height:"40px"}}
            />
          </div>

          <p >
            {data.name.length > 25 ? `${data.name.slice(0, 25)}` : data.name}
            <span >
              {data.artist}
            </span>
          </p>
        </motion.div>
      ))}
    </>
  );
};


export default Music