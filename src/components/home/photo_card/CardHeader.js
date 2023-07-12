import React, {useState} from 'react'
import Avatar from '../../Avatar'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import { GLOBALTYPES } from '../../../redux/actions/globalTypes'
import { deletePhoto } from '../../../redux/actions/photoAction'
import { BASE_URL } from '../../../utils/config'
import { motion } from "framer-motion";
import MoreVertIcon from '@mui/icons-material/MoreVert';

const CardHeader = ({photo, setOpenImg}) => {
    const { auth, socket } = useSelector(state => state)
    const dispatch = useDispatch()
    const [dropdown, setDropDown] = useState(false);
    const history = useHistory()

    const handleEditPost = () => {
        dispatch({ type: GLOBALTYPES.PHOTOSTATUS, payload: {...photo, onEdit: true}})
    }

    const handleDeletePost = () => {
        if(window.confirm("Are you sure want to delete this photo?")){
            dispatch(deletePhoto({photo, auth, socket}))
            return history.push("/")
        }
    }

    const handleCopyLink = () => {
        navigator.clipboard.writeText(`${BASE_URL}/photo/${photo._id}`)
    }

    return (
        <div className="card_header" style={{position:"relative"}} >
            <div className="d-flex">
                <Avatar src={photo.user.avatar} size="big-avatar" />

                <div className="card_name">
                    <h6 className="m-0">
                        <Link to={`/profile/${photo.user._id}`} className="text-dark">
                            {photo.user.username}
                        </Link>
                    </h6>
                    <small className="text-muted">
                        {moment(photo.createdAt).fromNow()}
                    </small>
                </div>
            </div>
                                             <div
               style={{position:"absolute" ,right:"20px", top:"22px", zIndex: 10}}>
               <MoreVertIcon onClick={() => setDropDown(true)}/> 
          </div > 
          {dropdown && ( 
                 <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }} style={{position:"absolute",minWidth:"250px", backgroundColor:"white", bottom:0, right:0, padding:"1rem", borderRadius:"5px"}} 
                 onClick={() => setOpenImg(false)}>
                                     {
                        auth.user._id === photo.user._id &&
                        <>
                            <div onClick={handleEditPost}>
                                <span className="material-icons">create</span> Редактировать
                            </div>
                            <div onClick={handleDeletePost} >
                                <span className="material-icons">delete_outline</span> Удалить пост
                            </div>
                        </>
                    }
                </motion.div> 
               )}
        </div>
    )
}

export default CardHeader