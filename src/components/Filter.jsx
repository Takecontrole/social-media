import React, { useEffect } from "react";
import { actionType } from "../Context/reducer";
import { useStateValue } from "../Context/StateProvider";
import { getAllSongs, getAllAlbums, getAllArtist } from "../api";
import { filterByLanguage, filters } from "../utils/supportfunctions";
import FilterButtons from "./FilterButtons";
import SongCard from "./SongCard";
import {Link} from "react-router-dom";
import { MdClearAll } from "react-icons/md";
import { motion } from "framer-motion";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {useMediaQuery} from "@mui/material"
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary
}));

const Filter = ({ setFilteredSongs, setFilterName, setFilterImg, changeQuote }) => {
  const [{ allSongs, filterTerm, artists, allAlbums }, dispatch] = useStateValue();
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
    if (!artists) {
      getAllArtist().then((data) => {
        dispatch({ type: actionType.SET_ARTISTS, artists: data.data });
      });
    }

    if (!allAlbums) {
      getAllAlbums().then((data) => {
        dispatch({ type: actionType.SET_ALL_ALBUMNS, allAlbums: data.data });
      });
    }
  }, []);

  const updateFilter = (value) => {
    dispatch({
      type: actionType.SET_FILTER_TERM,
      filterTerm: value,
    });
  };

  const clearAllFilter = () => {
    setFilteredSongs(null);
    dispatch({ type: actionType.SET_ARTIST_FILTER, artistFilter: null });
    dispatch({ type: actionType.SET_LANGUAGE_FILTER, languageFilter: null });
    dispatch({ type: actionType.SET_ALBUM_FILTER, albumFilter: null });
    dispatch({ type: actionType.SET_FILTER_TERM, filterTerm: null });
  };
  return (
    <div >
      <FilterButtons changeQuote={changeQuote} filterData={allAlbums} setFilterName={setFilterName} setFilterImg={setFilterImg} flag={"Exclusive"} />
          <FilterButtons changeQuote={changeQuote} filterData={allAlbums} setFilterName={setFilterName} setFilterImg={setFilterImg} flag={"Albums"} />
                  <HomeSongContainer musics={allSongs} />
      <FilterButtons changeQuote={changeQuote} filterData={artists} setFilterName={setFilterName} setFilterImg={setFilterImg} flag={"Artist"} />
    </div>
  );
};
export const HomeSongContainer = ({ musics }) => { 
  const [{ isSongPlaying, song }, dispatch] = useStateValue();
  const isNonMobileScreens = useMediaQuery("(min-width:501px)");
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
    {isNonMobileScreens ? 
    <div>
    <Link to="/allmusic"> 
    <p style={{fontSize:"14px"}}>
                 показать все <ArrowForwardIosIcon sx={{fontWeight:"bold",width:"10px", height:"10px"}}/>
                </p>
    </Link>
 <Grid container direction="column" spacing={0} style={{height:"210px",maxHeight:"210px", marginBottom:"2rem"}}>
        { musics &&
        musics.slice(0, 9).map((song) => (
         <Grid item xs={12} md={6} lg={4} style={{maxHeight:"70px", width:{md:"33%"}}} elevation={0}>
          <Item elevation={0}>
          <SongCard  key={song._id} data={song} id={song.id} />
         </Item>
         </Grid>
        ))}
        </Grid> 
        </div>
        : 
        <div> 
 <Link to="/allmusic"> 
    <p>показать все</p> 
    </Link>
         <Grid container direction="column" spacing={0} style={{height:"210px",maxHeight:"210px", marginBottom:"2rem"}}>
        { musics &&
        musics.slice(0, 10).map((song) => (
         <Grid item xs={12} md={6} lg={4} style={{maxHeight:"70px", width:"100%"}} elevation={0}>
          <Item elevation={0}>
          <SongCard  key={song._id} data={song} id={song.id} />
         </Item>
         </Grid>
        ))}
        </Grid> 
        </div>
    }
    </>
  );
};
export default Filter;
