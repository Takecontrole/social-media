import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PhotoCard from '../PhotoCard'
import ProfileImg from '../ProfileImg'
import LoadIcon from '../../images/loading.gif'
import LoadMoreBtn from '../LoadMoreBtn'
import { getDataAPI } from '../../utils/fetchData'
import { PHOTO_TYPES } from '../../redux/actions/photoAction'
import AlertSuccess from "../AlertSuccess";
//import AlertError from "../AlertError";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
const Photos = () => {
    const { homePhotos, auth, theme } = useSelector(state => state)
    const dispatch = useDispatch()
    const [openImg, setOpenImg] = useState(null);
    const [load, setLoad] = useState(false)
   const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState(null);
     const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(0.3),
  textAlign: "center",
  maxHeight:"150px",
  maxWidth:"150px",
  overflow:"hidden",
  color: theme.palette.text.secondary
}));
    const handleLoadMore = async () => {
        setLoad(true)
        const res = await getDataAPI(`photos?limit=${homePhotos.page * 9}`, auth.token)

        dispatch({
            type: PHOTO_TYPES.GET_POTOS, 
            payload: {...res.data, page: homePhotos.page + 1}
        })

        setLoad(false)
    }
const handleAlert = () => {
        setOpenImg(false)
        setAlert("success");
        setAlertMsg("Лайк");
        setTimeout(() => {
          setAlert(false);
        }, 1000);
    };
    return (
        <div> 
                              {alert && (
        <>
          {alert === "success" && (
            <AlertSuccess msg={alertMsg} />
          ) 
          }
        </>
      )}
           { openImg && ( 
              <div className="status_modal">
       <div className="status_modal_photo_bg">
       <div className="status_body">
        <PhotoCard key={openImg._id} photo={openImg} setOpenImg={setOpenImg} handleAlert={handleAlert} theme={theme} />
      </div>
      </div>
      </div> 
      )}
       <Grid style={{width:"100%"}} container spacing={0} >
            {
                homePhotos.photos.map(photo => ( 
              <Grid onClick={() => setOpenImg(photo)} item xs={4} md={4} lg={2} elevation={0}>
          <Item elevation={0}>
                   <ProfileImg images={photo.images} id={photo._id} />
                            </Item>
                        </Grid>
                   
                ))
            }
                        </Grid>
            {
                load && <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
            }

            
            <LoadMoreBtn result={homePhotos.result} page={homePhotos.page}
            load={load} handleLoadMore={handleLoadMore} />
        </div>
    )
}

export default Photos