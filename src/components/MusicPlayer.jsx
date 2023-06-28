import React, { useEffect, useState } from "react";
import { useStateValue } from "../Context/StateProvider";
import { IoMdClose } from "react-icons/io";
import { IoArrowRedo, IoArrowUndo, IoMusicalNote } from "react-icons/io5";
import { motion } from "framer-motion";
import AlertSuccess from "../components/AlertSuccess";
import AlertError from "../components/AlertError";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { actionType } from "../Context/reducer";
import { MdPlaylistPlay } from "react-icons/md";
import { getAllSongs } from "../api";
import { RiPlayListFill } from "react-icons/ri";
import {Box, useTheme} from "@mui/material"
import { deleteSongById } from "../api";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
const MusicPlayer = () => {
  const [{ allSongs, song, isSongPlaying, miniPlayer }, dispatch] =
    useStateValue();
  const [isPlayList, setIsPlayList] = useState(false);
  const [fullModul, setFullModul] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [dropdown, setDropDown] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState(null);
  const { palette } = useTheme(); 
  
  const closeMusicPlayer = () => {
    if (isSongPlaying) {
      dispatch({
        type: actionType.SET_SONG_PLAYING,
        isSongPlaying: false,
      });
    }
  };

  const togglePlayer = () => {
    if (miniPlayer) {
      dispatch({
        type: actionType.SET_MINI_PLAYER,
        miniPlayer: false,
      });
    } else {
      dispatch({
        type: actionType.SET_MINI_PLAYER,
        miniPlayer: true,
      });
    }
  };

  const nextTrack = () => {
    if (song > allSongs.length) {
      dispatch({
        type: actionType.SET_SONG,
        song: 0,
      });
    } else {
      dispatch({
        type: actionType.SET_SONG,
        song: song + 1,
      });
    }
  };

  const previousTrack = () => {
    if (song === 0) {
      dispatch({
        type: actionType.SET_SONG,
        song: 0,
      });
    } else {
      dispatch({
        type: actionType.SET_SONG,
        song: song - 1,
      });
    }
  };

  useEffect(() => {
    if (song >= allSongs.length) {
      dispatch({
        type: actionType.SET_SONG,
        song: 0,
      });
    }
  }, [song]);
 const deleteObject = (_id) => {
    console.log(_id);
    deleteSongById(_id).then((res) => {
      // console.log(res.data);
      if (res.data.success) {
        setAlert("success");
        setAlertMsg(res.data.msg);
        getAllSongs().then((data) => {
          dispatch({
            type: actionType.SET_ALL_SONGS,
            allSongs: data.data,
          });
        });
        setTimeout(() => {
          setAlert(false);
        }, 1000);
      } else {
        setAlert("error");
        setAlertMsg(res.data.msg);
        setTimeout(() => {
          setAlert(false);
        }, 1000);
      }
    });
  };
  return (
        <Box>
              {alert && (
        <>
          {alert === "success" ? (
            <AlertSuccess msg={alertMsg} />
          ) : (
            <AlertError msg={alertMsg} />
          )}
        </>
      )}
       {isDeleted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          style={{backgroundColor:"white", padding:"1rem", borderRadius:"5px"}}
        >
          <p >
            Вы уверены, что хотите удалить?
          </p>

          <div >
            <button
            style={{padding:"0.5rem",border:"none", borderRadius:"8px", backgroundColor:palette.primary.main, color:"white"}}
              onClick={() => deleteObject(allSongs[song]?._id)}
            >
              Да
            </button>
            <button
              style={{padding:"0.5rem",border:"none", borderRadius:"8px", backgroundColor:palette.neutral.main, color:"white", marginLeft:"0.5rem"}}
              onClick={() => setIsDeleted(false)}
            >
              Нет
            </button>
          </div>
        </motion.div>
      )} 
      
         <Box >
        <div className="underlay"/>
        <img 
        className="songplayerimage"
          src={allSongs[song]?.imageURL}
          alt=""
        />
             <div className="songplayername" >
          <p  >
            {`${
              allSongs[song]?.name.length > 20
                ? allSongs[song]?.name.slice(0, 20)
                : allSongs[song]?.name
            }`}{" "}
            <span >({allSongs[song]?.album})</span>
          </p>
          <p >
            {allSongs[song]?.artist}{" "}
            <span >
              ({allSongs[song]?.category})
            </span>
          </p>
          </div> 
                                 <Box
               position="absolute" style={{right:"20px", top:"22px", zIndex: 10}}>
               <MoreVertIcon onClick={() => setDropDown(true)}/> 
          </Box > 
          {dropdown && ( 
                 <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }} style={{position:"absolute",minWidth:"250px", backgroundColor:"white", bottom:"70px", right:0, padding:"1rem", borderRadius:"5px"}} 
                 onClick={() => setDropDown(false)}>
                            <Box  onClick={() => setIsDeleted(true)}>
                                <span className="material-icons">delete_outline</span> Удалить
                            </Box>
                    <Box >
                        <span className="material-icons">content_copy</span> Сохранить
                    </Box>
                </motion.div> 
               )}
              
                         <div className="songplayerclose">
          <motion.i style={{width:"30px"}} whileTap={{ scale: 0.8 }} onClick={closeMusicPlayer}>
            <IoMdClose  />
          </motion.i>
          {/*
          <motion.i whileTap={{ scale: 0.8 }} onClick={togglePlayer}>
            <IoArrowRedo />
          </motion.i>
            */}
        </div>
          <AudioPlayer 
            layout="horizontal"
            src={allSongs[song]?.songUrl}
            onPlay={() => console.log("is playing")}
            autoPlay={true}
            showSkipControls={true}
            onClickNext={nextTrack}
            onClickPrevious={previousTrack}
           customIcons={{play: <PlayArrowIcon/>, pause: <PauseIcon/> }}
            
            
          />   
         
          {/*
          <div
        className="d-flex"
       
      >
        
        <div >
          <p >
            {`${
              allSongs[song]?.name.length > 20
                ? allSongs[song]?.name.slice(0, 20)
                : allSongs[song]?.name
            }`}{" "}
            <span >({allSongs[song]?.album})</span>
          </p>
          <p >
            {allSongs[song]?.artist}{" "}
            <span >
              ({allSongs[song]?.category})
            </span>
          </p>
          <motion.i
            whileTap={{ scale: 0.8 }}
            onClick={() => setIsPlayList(!isPlayList)}
          >
            <RiPlayListFill  />
          </motion.i>
        </div>
               <div >
          <motion.i whileTap={{ scale: 0.8 }} onClick={closeMusicPlayer}>
            <IoMdClose  />
          </motion.i>
          <motion.i whileTap={{ scale: 0.8 }} onClick={togglePlayer}>
            <IoArrowRedo />
          </motion.i>
        </div>
      </div>
      */}
        </Box>
 

      {isPlayList && (
        <>
          <PlayListCard />
        </>
      )}

      {miniPlayer && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          className=""
        >
          <div className=" ">
            <div className=""></div>
            <img
              onClick={togglePlayer}
              src={allSongs[song]?.imageURL}
              className=""
              alt=""
            />
          </div>
        </motion.div>
      )}
    </Box>
  );
};

export const PlayListCard = () => {
  const [{ allSongs, song, isSongPlaying }, dispatch] = useStateValue();
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

  const setCurrentPlaySong = (songindex) => {
    if (!isSongPlaying) {
      dispatch({
        type: actionType.SET_SONG_PLAYING,
        isSongPlaying: true,
      });
    }
    if (song !== songindex) {
      dispatch({
        type: actionType.SET_SONG,
        song: songindex,
      });
    }
  };

  return (
    <div className="">
      {allSongs.length > 0 ? (
        allSongs.map((music, index) => (
          <motion.div
            initial={{ opacity: 0, translateX: -50 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={` ${
              music?._id === song._id ? "bg-card" : "bg-transparent"
            }`}
            onClick={() => setCurrentPlaySong(index)}
          >
            <IoMusicalNote className="" />

            <div className="">
              <p className="">
                {`${
                  music?.name.length > 20
                    ? music?.name.slice(0, 20)
                    : music?.name
                }`}{" "}
                <span className="">({music?.album})</span>
              </p>
              <p className="">
                {music?.artist}{" "}
                <span className="">
                  ({music?.category})
                </span>
              </p>
            </div>
          </motion.div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default MusicPlayer;
