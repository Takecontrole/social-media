import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getPhoto } from '../../redux/actions/photoAction'
import PhotoCard from '../../components/PhotoCard'

const Photo = () => { 
  const { id } = useParams()
   const [photo, setPhoto] = useState([])
   const [openImg, setOpenImg] = useState(null)
    const { auth, detailPhoto, theme } = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPhoto({detailPhoto, id, auth}))

        if(detailPhoto.length > 0){
            const newArr = detailPhoto.filter(photo => photo._id === id)
            setPhoto(newArr)
        }
    },[detailPhoto, dispatch, id, auth])
    

    return (
        <div className="posts">
               { 
                photo.map(item => (
               <div>
               <PhotoCard photo={item} setOpenImg={setOpenImg} handleAlert={null} theme={theme}/>
                </div>
                ))
            }
        </div>
    )
}

export default Photo
