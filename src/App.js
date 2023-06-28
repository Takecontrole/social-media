import { useEffect } from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'

import PageRender from './customRouter/PageRender'
import PrivateRouter from './customRouter/PrivateRouter'

import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'

import Alert from './components/alert/Alert'
import LayOut from './pages/LayOut'
import Header from './components/header/Header'
import StatusModal from './components/StatusModal'
import VideoStatusModal from './components/VideoStatusModul'

import { useSelector, useDispatch } from 'react-redux'
import { refreshToken } from './redux/actions/authAction'
import { getPosts } from './redux/actions/postAction'
import { getVideos } from './redux/actions/videoAction'
import { getSuggestions } from './redux/actions/suggestionsAction'

import io from 'socket.io-client'
import { GLOBALTYPES } from './redux/actions/globalTypes'
import SocketClient from './SocketClient'

import { getNotifies } from './redux/actions/notifyAction'
import CallModal from './components/message/CallModal'
import Peer from 'peerjs'
import { useMemo } from "react";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { useStateValue } from "./Context/StateProvider";
import  { default as MusicPlayer }  from "./components/MusicPlayer";
function App() {
  const { auth, status, videostatus, modal, call } = useSelector(state => state)
  const dispatch = useDispatch()
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const [
    {
      
      isSongPlaying,
      
    },
    
  ] = useStateValue();
  useEffect(() => {
    dispatch(refreshToken())
 
    const socket = io()
    dispatch({type: GLOBALTYPES.SOCKET, payload: socket})
    return () => socket.close()
  },[dispatch])

  useEffect(() => {
    if(auth.token) {
      dispatch(getPosts(auth.token))
      dispatch(getVideos(auth.token))
      dispatch(getSuggestions(auth.token))
      dispatch(getNotifies(auth.token))
    }
  }, [dispatch, auth.token])

  
  useEffect(() => {
    if (!("Notification" in window)) {
      alert("Ваш браузер не поддерживает уведомления.");
    }
    else if (Notification.permission === "granted") {}
    else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {}
      });
    }
  },[])

 
  useEffect(() => {
    const newPeer = new Peer(undefined, {
      path: '/', secure: true
    })
    
    dispatch({ type: GLOBALTYPES.PEER, payload: newPeer })
  },[dispatch])


  return ( 
  <ThemeProvider theme={theme}>
   <CssBaseline />
    <Router>
      <Alert />

      <input type="checkbox" id="theme" />
      <div className={`App ${(status || videostatus || modal) && 'mode'}`}> 
      {auth.token && <LayOut />} 
        <Box sx={{ml: { xs: 0,  md:"22%", lg:"17%", xl:"14%" }}}>
          {status && <StatusModal />}
          {videostatus && <VideoStatusModal />}
          {auth.token && <SocketClient />}
          {call && <CallModal />}
          
          <Route exact path="/" component={auth.token ? Home : Login} />
          <Route exact path="/register" component={Register} />


          <PrivateRouter exact path="/:page" component={PageRender} />
          <PrivateRouter exact path="/:page/:id" component={PageRender} />

        </Box>
      </div>
       {isSongPlaying && (
          <Box style={{position: "sticky", bottom:"1rem", zIndex:50000}}>
            <MusicPlayer />
          </Box>
            )}
    </Router>
            </ThemeProvider>
  );
}

export default App;
