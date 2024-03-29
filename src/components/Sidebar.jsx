import React from "react";
import { useSelector } from 'react-redux'
import {
  Box,
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
import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  PublicOutlined,
  PointOfSaleOutlined,
  TodayOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
  PieChartOutlined,
} from "@mui/icons-material";
import PhotoLibrarySharpIcon from '@mui/icons-material/PhotoLibrarySharp';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';
import { useEffect, useState } from "react";
import {Link, useLocation, useHistory } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import AvatarDropdown from "./AvatarDropdown";
import Person2TwoToneIcon from '@mui/icons-material/Person2TwoTone';
import SearchIcon from '@mui/icons-material/Search';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import LibraryMusicOutlinedIcon from '@mui/icons-material/LibraryMusicOutlined';
const Sidebar = ({ isSidebarOpen, setIsSidebarOpen, drawerWidth}) => {
  const isNonMobile = useMediaQuery("(min-width: 801px)");
  const { auth } = useSelector(state => state)
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const history = useHistory();
  const theme = useTheme();
  
  const navItems = [
  {
    text: "Профиль",
    path: `/profile/${auth.user._id}`,
    icon: <Person2TwoToneIcon />,
  },
  {
    text: "Новости",
    path: "/",
    icon: <HomeOutlined />,
  },
  {
    text: "Сообщения",
    path: '/message',
    icon: <MailIcon />,
  },
  {
    text: "Поиск",
    path: '/search',
    icon: <SearchIcon />,
  },
  {
    text: "Обзор",
    path: '/discover',
    icon: <PublicOutlined />,
  },
  {
    text: "Закладки",
    path: '/favorite',
    icon: <BookmarksIcon />,
  },
  {
    text: "Музыка",
    path: '/music',
    icon: <LibraryMusicOutlinedIcon />,
  },
  {
    text: "Фотографии",
    path: `/usersphotos/${auth.user._id}`,
    icon: <PhotoLibrarySharpIcon />,
  },

];

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box 
    component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{"& .MuiDrawer-paper":{mt: {xs:0, md:10}, zIndex:{xs:10, md:0}, borderWidth: 0 }}}
        >
          <Box height="100vh" backgroundColor={!isNonMobile ?  "white" :"#F0F0F0"} 
          width="100%"> 
          {!isNonMobile && ( 
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween  color={theme.palette.primary.main}>
                <Box display="column" alignItems="center" gap="0.5rem">

                  <AvatarDropdown setIsSidebarOpen={setIsSidebarOpen}/>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            )} 
             {isNonMobile && (
            <List sx={{right:0, left:0}}>
              {navItems.map(({ text, path, icon }) => {

                return (
                  <ListItem  key={text} disablePadding> 
                 <Link 
                 style={{width:"100%",color: theme.palette.neutral.main, backgroundColor:
                          pathname === path
                            ? theme.palette.neutral.medium
                            : "transparent"}} to={path}>
                    <ListItemButton >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            pathname === path
                              ? 
                               theme.palette.secondary[200]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {pathname === path && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                    </Link>
                  </ListItem>
                );
              })}
            </List> 
            )}
            {!isNonMobile && (
             <List sx={{right:0, left:0}}>
              {navItems.map(({ text, path, icon }) => {

                return (
                  <ListItem  key={text} disablePadding> 
                 <Link 
                 onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                 style={{width:"100%",color: theme.palette.neutral.main, backgroundColor:
                          pathname === path
                            ? theme.palette.neutral.medium
                            : "transparent"}} to={path}>
                    <ListItemButton >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            pathname === path
                              ? 
                               theme.palette.secondary[200]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {pathname === path && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                    </Link>
                  </ListItem>
                );
              })}
            </List>
            )}
          </Box>


        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
