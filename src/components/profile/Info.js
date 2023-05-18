import React, { useState, useEffect } from 'react'
import Avatar from '../Avatar'
import EditProfile from './EditProfile'
import FollowBtn from '../FollowBtn'
import Followers from './Followers'
import Following from './Following'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
  useMediaQuery
} from "@mui/material";
import {HomeOutlined,PublicOutlined} from "@mui/icons-material";
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import {LocalPhoneTwoTone} from "@mui/icons-material";
import AlternateEmailTwoToneIcon from '@mui/icons-material/AlternateEmailTwoTone';
import Person2TwoToneIcon from '@mui/icons-material/Person2TwoTone';
import UserCard from '../UserCard'
import { MESS_TYPES, getConversations } from '../../redux/actions/messageAction'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
const items = [
  {
    text: "Имя",
    icon: <Person2TwoToneIcon />,
  },
  {
    text: "Телефон",
    icon: <LocalPhoneTwoTone />,
  },
  {
    text: "Адрес",
    icon: <HomeOutlined />,
  },
  {
    text: "Email",
    icon: <AlternateEmailTwoToneIcon />,
  },
  {
    text: "Сайт",
    icon: < PublicOutlined/>,
  },

];

const Info = ({id, auth, profile, dispatch}) => { 
  const { online } = useSelector(state => state)
    const [userData, setUserData] = useState([])
    const [onEdit, setOnEdit] = useState(false) 
    const { palette } = useTheme();
    const theme = useTheme(); 
    const isNonMobile = useMediaQuery("(min-width: 801px)");

    const [showFollowers, setShowFollowers] = useState(false)
    const [showFollowing, setShowFollowing] = useState(false)  
    const history = useHistory()
    const isActive = (user) => {
        if(id === user._id) return 'active';
        return ''
    }
    const handleAddUser = (user) => {
        dispatch({type: MESS_TYPES.ADD_USER, payload: {...user, text: '', media: []}})
        dispatch({type: MESS_TYPES.CHECK_ONLINE_OFFLINE, payload: online})
        return history.push(`/message/${user._id}`)
    }

    useEffect(() => {
        if(id === auth.user._id){
            setUserData([auth.user])
        }else{
            const newData = profile.users.filter(user => user._id === id)
            setUserData(newData)
        }
    }, [id, auth, dispatch, profile.users])


    useEffect(() => {
        if(showFollowers || showFollowing || onEdit){
            dispatch({ type: GLOBALTYPES.MODAL, payload: true})
        }else{
            dispatch({ type: GLOBALTYPES.MODAL, payload: false})
        }
    },[showFollowers, showFollowing, onEdit, dispatch])
    

    return (
        <Box sx={{width: "100%",
            maxWidth: "100vw",
        }}> 

            {
                userData.map(user => (
                <Box>
                 <Box sx={{height:{xs:"200px",md:"200px"}, backgroundColor:"white"}}>
        <img src={user.bg} style={{height:"110%", width:"100%", objectFit:"cover",}} />
        </Box>
                    <Box sx={{position:"relative",width: "100%",
    display: "flex", alignItems:{xs:"center",md:"start"}, justifyContent:{xs:"center",md:"start"},
    flexWrap: "wrap"}} key={user._id}>
    <Box sx={{position:"absolute",top:"-70px", ml:{md:"20px"}}}>  
           
                        <Avatar src={user.avatar} size="supper-avatar"/> 
      </Box>                   

                        <Box  sx={{minWidth: "250px",
                      width: "100%", 
                      backgroundColor:"white",
                      flex: 1,
                      borderRadius: '22px',
                          
                        }}>
                            <Box sx={{position:"relative",display:"flex", alignItems:"center", justifyContent:"center", height:{xs:"200px",md:"80px"}}}>
                     <Box sx={{position:"absolute",textAlign:"center",left:{md:"180px"}, bottom:{md:"38%"}}}>           <Typography variant="h4b">{user.fullname}</Typography>
                                <Typography variant="h6">{user.username}</Typography>
                      </Box>   
                                 {
                                    user._id === auth.user._id
                                    ?  
         <Button
                    onClick={() => setOnEdit(true)}
              sx={{ 
                position:"absolute",
                right:0,
                bottom:{xs:0, md:"38%"},
                m: "0.5rem ",
                px: "2rem", 
                borderRadius:"10px",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
                                "&:focus": { outline: "none !important"}
              }}
            >
              
           
                    Редактировать  
                </Button>         
                            
                                    : 
                               <Box>     
                               
                               <FollowBtn user={user} />
                              

                               {isNonMobile && (
                               
                                    <Button sx={{ 
                position:"absolute",
                right:{sm:"160px"},
                bottom:{xs:0, md:"38%"},
                m: "0.5rem ",
                p: "0.5rem", 
                px:"2rem",
                borderRadius:"15px",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
                                "&:focus": { outline: "none !important"}
              }} key={user._id}
                                onClick={() => handleAddUser(user)}> <span style={{marginRight:"5px"}}> <ForumOutlinedIcon/></span> Сообщение
                                </Button>
                         )}   
                               {!isNonMobile && (
                               
                                    <Button sx={{ 
                position:"absolute",
                left:0,
                bottom:{xs:0, md:"38%"},
                m: "0.5rem ",
                p: "0.5rem", 
                px:"2rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
                                "&:focus": { outline: "none !important"}
              }} key={user._id}
                                onClick={() => handleAddUser(user)}> <span style={{marginRight:"5px"}}> <ForumOutlinedIcon/></span> Сообщение
                                </Button>
                         )}   
                                </Box>
                                } 
                                                                
                      </Box>        

<Divider/>
 
            <List sx={{display:"flex",right:0, left:0,flexDirection:"column", overflow:"none"}}> 
            <Box sx={{display:"flex"}}>
            <Box>
              {items.map(({ text, path, icon }) => {

                return (
                  <ListItem  key={text} disablePadding> 

                       <ListItemButton>
                      <ListItemIcon 
                        sx={{
                          ml: {xs:-2, md:"2rem"},  justifyContent:"center",
                          color: theme.palette.neutral.main }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText 
                      sx={{
                          ml:0,
                          color: theme.palette.neutral.main }}
                      primary={text} />
  </ListItemButton>
 </ListItem>
                );
              })}
                        </Box>
                        <Box>
                                    <ListItem  disablePadding> 
                      <ListItemButton>
                            <ListItemText 
                           
                            primary={user.fullname ? user.fullname : "Информация не указана"} />         
                     </ListItemButton>
                      </ListItem > 
                                    <ListItem  disablePadding> 
                     <ListItemButton>
                            <ListItemText 
                            
                            primary={user.mobile ? user.mobile : "Информация не указана"} />         
                      </ListItemButton>
                      </ListItem > 
                                    <ListItem  disablePadding> 
                     <ListItemButton>
                            <ListItemText 
                              primary={user.address ? user.address : "Информация не указана"} />         
                                </ListItemButton>     
                      </ListItem > 
                                
                                <ListItem  disablePadding> 
                    
                     <ListItemButton>
                            <ListItemText 
                              primary={user.email ? user.email : "Информация не указана"} />         
                    </ListItemButton>
                      </ListItem > 
                                    <ListItem  disablePadding> 
                     <ListItemButton>
                            <ListItemText 
                            
                            primary={user.website ? user.website : "Информация не указана"} />         
                      </ListItemButton>
                      </ListItem > 
                        </Box>
                                        {isNonMobile && (
                        <Box>
                        <ListItem  disablePadding> 
                     <ListItemButton>                   <Typography 
                            variant="h4">
                            {user.story} 
                            </Typography> 
                    </ListItemButton>
                      </ListItem > 
                        </Box>
                        )}
                        </Box> 
                        {!isNonMobile && (
                        <Box>
                        <ListItem  disablePadding> 
                     <ListItemButton>
                            <Typography 
                            variant="h5">
                            {user.story} 
                            </Typography>
                    </ListItemButton>
                      </ListItem > 
                        </Box>
                        )}
            </List>

                        </Box>

                        {
                            onEdit && <EditProfile setOnEdit={setOnEdit} />
                        }


                    </Box>
                    </Box>
                ))
            }
        </Box>
    )
}

export default Info
