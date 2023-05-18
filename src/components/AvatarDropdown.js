import * as React from "react";
import {Link} from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import {Box, Typography, useMediaQuery} from "@mui/material/";
import LogoutIcon from '@mui/icons-material/Logout';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../redux/actions/authAction'
import Avatarka from './Avatar'
import NotifyModal from './NotifyModal'
import Menu from './header/Menu'
import { GLOBALTYPES } from '../redux/actions/globalTypes'
const AvatarDropdown = () => { 
  const { auth, theme, notify } = useSelector(state => state)
    const dispatch = useDispatch()
  const [avatarEl, setAvatarEl] = React.useState(
    null
  );
const isNonMobile = useMediaQuery("(min-width: 801px)");
  const [invisible, setInvisible] = React.useState(false);

  const handleAvatarClick = (e) => {
    setAvatarEl(e.currentTarget);
  };

  const handleAvatarClose = () => {
    setAvatarEl(null);
  };

  const [notifyEl, setNotifyEl] = React.useState(
    null
  );

  const handleBadgeVisibility = () => {
    setInvisible(!invisible);
  };

  const handleNotifyOpen = (e) => {
    setNotifyEl(e.currentTarget);
    if (!invisible) {
      handleBadgeVisibility();
    }
  };

  const handleNotifyClose = () => {
    setNotifyEl(null);
  };

  const open = Boolean(avatarEl);
  const id = open ? "simpe-popover" : undefined;

  const notifyOpen = Boolean(notifyEl);
  const notifyId = notifyOpen ? "simpe-notify" : undefined;
  return (
    <div>
      <Stack  direction="row" spacing={1}> 
              <Button aria-describedby={id} onClick={handleAvatarClick}>
                        <Avatarka src={auth.user.avatar} size="medium-avatar" />
       {!isNonMobile && (
       <Box display="flex"
       flexDirection="column"
       ml="1rem"
       color="black">
       <Typography variant="h7">
       {auth.user.fullname} 
       </Typography>
       <Typography variant="h8">
       {auth.user.username}
       </Typography>
       </Box>
       )}
          <KeyboardArrowDownIcon />
        </Button>
        <Button aria-describedby={id} onClick={handleNotifyOpen}>
          <Badge
            color="warning"
            overlap="circular"
            badgeContent={notify.data.length}
            invisible={notify.data.length > 0 ? invisible : !invisible}
            showZero={true}
          >
            <NotificationsIcon />
          </Badge>
        </Button>
      </Stack>

      <Popover
        id={id}
        open={open}
        anchorEl={avatarEl}
        onClose={handleAvatarClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
      >
        <List sx={{p:1}} disablePadding>
          <ListItem disablePadding>
          <Link style={{color:"black"}} to={`/profile/${auth.user._id}`}>
            <ListItemButton >
              <ListItemText primary="Профиль" />
            </ListItemButton>
            </Link>
          </ListItem>
          <Divider />
          <ListItem sx={{pt:0.5}} disablePadding>
          <ListItemButton>
                    <label htmlFor="theme" 
                    onClick={() => dispatch({
                        type: GLOBALTYPES.THEME, payload: !theme
                    })}>

                        {theme ? 'Светлый режим' : 'Ночной режим'}
                    </label>
              </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton component={Link} href="/">
              <ListItemText primary="Выйти" onClick={() => dispatch(logout())}
              /> <LogoutIcon/>
            </ListItemButton>
          </ListItem>
        </List>
      </Popover>

      <Popover
        id={notifyId}
        open={notifyOpen}
        anchorEl={notifyEl}
        onClose={handleNotifyClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
      >
        <List disablePadding>
<NotifyModal />         
        </List>
      </Popover>
    </div>
  );
};

export default AvatarDropdown;
