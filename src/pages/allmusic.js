import React, { useEffect, useState } from "react";
import { getAllSongs } from "../api";
import { actionType } from "../Context/reducer";
import { useStateValue } from "../Context/StateProvider";
import SongCard  from "../components/SongCard";
import SearchBar from "../components/SearchBar";
import { motion } from "framer-motion";
const Allmusic = () => {
  const [
    {
      searchTerm,
      isSongPlaying,
      song,
      allSongs,
      artistFilter
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

  return (
    <div>
      <SearchBar />

      {searchTerm.length > 0 && (
        <p >
          Искать :
          <span >
            {searchTerm}
          </span>
        </p>
      )}


      <div>
        <AllSongContainer musics={filteredSongs ? filteredSongs : allSongs} />
      </div>
    </div>
  );
};

export const AllSongContainer = ({ musics }) => {
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
      {musics?.map((data, index) => (
           <SongCard textOfSongColor="black" key={data._id} data={data} id={data.id} />
      ))}
    </>
  );
};

export default Allmusic;
