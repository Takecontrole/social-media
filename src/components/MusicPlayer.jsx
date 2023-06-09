import React, { useEffect, useState } from "react";
import { useStateValue } from "../Context/StateProvider";
import { IoMdClose } from "react-icons/io";
import { IoArrowRedo, IoArrowUndo, IoMusicalNote } from "react-icons/io5";
import { motion } from "framer-motion";

import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { actionType } from "../Context/reducer";
import { MdPlaylistPlay } from "react-icons/md";
import { getAllSongs } from "../api";
import { RiPlayListFill } from "react-icons/ri";

const MusicPlayer = () => {
  const [isPlayList, setIsPlayList] = useState(false);
  const [{ allSongs, song, isSongPlaying, miniPlayer }, dispatch] =
    useStateValue();

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
    if (song > allSongs.length) {
      dispatch({
        type: actionType.SET_SONG,
        song: 0,
      });
    }
  }, [song]);

  return (
    <div className="w-full full flex items-center gap-3 overflow-hidden">
      <div
        className={`w-full full items-center gap-3 p-4 ${
          miniPlayer ? "absolute top-40" : "flex relative"
        }`}
      >
        <img
          src={allSongs[song]?.imageURL}
          style={{width:"70px", height:"70px"}}
          alt=""
        />
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
          <AudioPlayer
            src={allSongs[song]?.songUrl}
            onPlay={() => console.log("is playing")}
            autoPlay={true}
            showSkipControls={true}
            onClickNext={nextTrack}
            onClickPrevious={previousTrack}
          />
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
    </div>
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
