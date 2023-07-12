import React, {useRef, useEffect}from 'react'
import CardHeader from './home/photo_card/CardHeader'
import CardBody from './home/post_card/CardBody'
import CardFooter from './home/photo_card/CardFooter'

import CommentsPhoto from './home/CommentsPhoto'
import InputPhotoComment from './home/InputPhotoComments'

const PhotoCard = ({photo, setOpenImg, handleAlert, theme}) => {
  let menuRef = useRef();
  useEffect(() => {
    let handler = (e)=>{
      if(!menuRef.current.contains(e.target)){
        setOpenImg(false)
      }      
    };

    document.addEventListener("mousedown", handler);
    

    return() =>{
      document.removeEventListener("mousedown", handler);
    }

  });
  
    return (
        <div ref={menuRef} className="card my-3" style={{ boxShadow:"none"}} >
            <CardHeader style={{ color:"white"}} photo={photo} setOpenImg={setOpenImg} />
            <CardBody post={photo} theme={theme} />
            <CardFooter photo={photo} handleAlert={handleAlert} />
            <CommentsPhoto photo={photo} setOpenImg={setOpenImg} handleAlert={handleAlert} />
            <InputPhotoComment photo={photo} setOpenImg={setOpenImg}/>
            
        </div>
    )
}

export default PhotoCard