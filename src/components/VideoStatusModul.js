import React, { useState, useRef, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GLOBALTYPES } from '../redux/actions/globalTypes'
import { createVideo, updateVideo } from '../redux/actions/videoAction'
import Icons from './Icons'
import {Box, Button, Divider, useTheme} from "@mui/material"
import { imageShow, videoShow } from '../utils/mediaShow'
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import MusicNoteOutlinedIcon from '@mui/icons-material/MusicNoteOutlined';
import PlayCircleOutlinedIcon from '@mui/icons-material/PlayCircleOutlined';
const VideoStatusModal = () => {
    const { auth, theme, videostatus, socket } = useSelector(state => state)
    const dispatch = useDispatch()

    const [content, setContent] = useState('')
    const [images, setImages] = useState([])

    const [stream, setStream] = useState(false)
    const videoRef = useRef()
    const refCanvas = useRef()
    const [tracks, setTracks] = useState('') 
    const { palette } = useTheme(); 
    let menuRef = useRef();

  useEffect(() => {
    let handler = (e)=>{
      if(!menuRef.current.contains(e.target)){
        dispatch({ type: GLOBALTYPES.VIDEOSTATUS, payload: false})
        console.log(menuRef.current);
      }      
    };

    document.addEventListener("mousedown", handler);
    

    return() =>{
      document.removeEventListener("mousedown", handler);
    }

  });

    const handleChangeImages = e => {
        const files = [...e.target.files]
        let err = ""
        let newImages = []

        files.forEach(file => {
            if(!file) return err = "Не существует."

            if(file.size > 1024 * 1024 * 10){
                return err = "Слишком большой размер."
            }

            return newImages.push(file)
        })

        if(err) dispatch({ type: GLOBALTYPES.ALERT, payload: {error: err} })
        setImages([...images, ...newImages])
    }

    const deleteImages = (index) => {
        const newArr = [...images]
        newArr.splice(index, 1)
        setImages(newArr)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(images.length === 0)
        return dispatch({ 
            type: GLOBALTYPES.ALERT, payload: {error: "Добавьте видео."}
        })

        if(videostatus.onEdit){
            dispatch(updateVideo({content, images, auth, videostatus}))
        }else{
            dispatch(createVideo({content, images, auth, socket}))
            //.then(response => {window.location.reload(false)})
        }
        

        setContent('')
        setImages([])
        if(tracks) tracks.stop()
        dispatch({ type: GLOBALTYPES.VIDEOSTATUS, payload: false})
    }

    useEffect(() => {
        if(videostatus.onEdit){
            setContent(videostatus.content)
            setImages(videostatus.images)
        } 
        
    },[videostatus])

    
   

    return (
        <div className="status_modal">
            <form ref={menuRef} onSubmit={handleSubmit}>
              

                <div className="status_body">
                    <textarea name="content" value={content}
                    placeholder={`${auth.user.username}, введите название видео...`}
                    onChange={e => setContent(e.target.value)}
                    style={{
                        filter: theme ? 'invert(1)' : 'invert(0)',
                        color: theme ? 'white' : '#111',
                        background: theme ? 'rgba(0,0,0,.03)' : '',
                    }} />



                    <div className="show_images">
                        {
                            images.map((img, index) => (
                                <div key={index} id="file_img">
                                    {
                                        img.camera ? imageShow(img.camera, theme)
                                        : img.url
                                            ?<>
                                                {
                                                    img.url.match(/video/i)
                                                    ? videoShow(img.url, theme) 
                                                    : imageShow(img.url, theme)
                                                }
                                            </>
                                            :<>
                                                {
                                                    img.type.match(/video/i)
                                                    ? videoShow(URL.createObjectURL(img), theme) 
                                                    : imageShow(URL.createObjectURL(img), theme)
                                                }
                                            </>
                                    }
                                    <span onClick={() => deleteImages(index)}>&times;</span>
                                </div>
                            ))
                        }
                    </div>

                    <Divider/>
                    <Box display="flex"
                    height="50px"
                    position="relative"
                    color={palette.primary.main}
                    >
                    <div className="input_images" style={{alignItems:"center",justifyContent:"start"}}>

                                <div className="file_upload">
                                <CameraAltOutlinedIcon
                      />
                      <input type="file" name="file" id="file"
                                    multiple accept="image/*,video/*" onChange={handleChangeImages} />
                                </div>


                            
                        
                    </div>
                <div className="status_footer">
                    <Button sx={{ 
                    position:"absolute",
                    right:0,
                m: "0.5rem ",
                px: "2rem", 
                borderRadius:"10px",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
                                "&:focus": { outline: "none !important"}
              }} type="submit" >
                        Опубликовать видео
                    </Button>
                </div>
                </Box>

                </div>


            </form>
        </div>
    )
}

export default VideoStatusModal
