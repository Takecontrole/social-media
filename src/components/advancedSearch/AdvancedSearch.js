import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getDataAPI } from '../../utils/fetchData'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import SearchUserCard from '../SearchUserCard'
import PostThumb from '../PostThumb'
import VideoThumb from '../VideoThumb'

import LoadIcon from '../../images/loading.gif'
import FlexBetween from "../FlexBetween";
import {Box, useMediaQuery, IconButton,
  InputBase, Tabs, Tab, AppBar, FormControl,  InputLabel,  MenuItem,  Select} from "@mui/material"
import {Search as SearchIcon} from "@mui/icons-material" 
const AdvancedSearch = () => {
    const [search, setSearch] = useState('')
    const [users, setUsers] = useState([])
    const [posts, setPosts] = useState([])
    const [videos, setVideos] = useState([])

    const { auth, theme } = useSelector(state => state)
    const dispatch = useDispatch()
    const [load, setLoad] = useState(false)
    
    let menuRef = useRef(); 
    const [tabvalue, setTabValue] = React.useState(0); 
    const isNonMobileScreens = useMediaQuery("(min-width:801px)");
   
    const [filters, setFilters] = useState({});
    const [filteredProducts, setFilteredProducts] = useState([]);
  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };

     useEffect(() => {
      setFilteredProducts(
        users.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [users, filters]);
  const handleTabsChange = (event, newValue) => {
    console.log(event);
    console.log(newValue);
    setTabValue(newValue);
  };

    const handleSearch = async (e) => {
        e.preventDefault()
        if(!search) return;

        try {
            setLoad(true)
            
            const res = await getDataAPI(`search?username=${search}`, auth.token)
            const res1 = await getDataAPI(`searchpost?content=${search}`, auth.token)
            const res2 = await getDataAPI(`searchvideo?content=${search}`, auth.token)
            const users = await res;
            const posts = await res1;
            const videos = await res2;
            setUsers(users.data.users)
            setPosts(posts.data.posts)
            setVideos(videos.data.videos)
            setLoad(false)
        } catch (err) {
            dispatch({
                type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}
            })
        }
    }


    return ( 
                  <Box
        width="100%"
        padding="1.5rem 0.7rem"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
        
      >
                   <Box
          flexBasis={isNonMobileScreens ? "65%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        > 
                                          {!isNonMobileScreens && (
                                                      <Box position="relative"
                     marginTop="1rem"     height="60px"
                     marginBottom="1rem"  
        >     
                  <AppBar position="absolute" top="0" color="default" sx={{  
                     borderRadius:"22px ! important", zIndex:"0 !important"}} >
        <Tabs
          onChange={handleTabsChange}
          value={tabvalue}
          indicatorColor="primary"
          textColor="black"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example" 
          
        >
            <Tab sx={{"&:focus": { outline: "none !important"}, "&.Mui-selected": {
          backgroundColor: `white ! important`,
         borderRadius:"22px !important", boxShadow: '0 4px 12px 0 rgba(0,0,0,0.16)',margin:"5px"}, margin:"5px"}} label="Посты" />
          <Tab sx={{"&:focus": { outline: "none !important"}, "&.Mui-selected": {
          backgroundColor: `white ! important`,
         borderRadius:"22px !important", boxShadow: '0 4px 12px 0 rgba(0,0,0,0.16)',margin:"5px"},margin:"5px"}}  label="Посты"  />
          <Tab sx={{"&:focus": { outline: "none !important"}, "&.Mui-selected": {
          backgroundColor: `white ! important`,
         borderRadius:"22px !important", boxShadow: '0 4px 12px 0 rgba(0,0,0,0.16)',margin:"5px"}, margin:"5px"}} label="Видео" />
        </Tabs>
      </AppBar> 
      </Box>
          )}
        <form className="search_form" onSubmit={handleSearch}>
          <FlexBetween
            
            borderRadius="9px"
            gap="3rem"
            padding="0.1rem 1.5rem" 
            
          >
            <InputBase 
            type="text" name="search" value={search} id="search" 
            onChange={e => setSearch(e.target.value.toLowerCase().replace(/ /g, ''))}
            placeholder="Поиск..." />
            <IconButton>
              <SearchIcon />
            </IconButton> 
          </FlexBetween>



            <div style={{borderRadius:"22px",boxShadow:"0 0 10px #ddd", backgroundColor:"white" }} className="posts">


      {tabvalue === 0 && <div>
                                      {
                    filteredProducts.map(user => (
                    <Box marginTop="1rem">
                        <SearchUserCard 
                        key={user._id} 
                        user={user} 
                        border="border"
                        
                        /> 
                      </Box>   
                    ))
                }
      </div>}
            </div>
      {tabvalue === 1 && <div className="posts"> 
                        <PostThumb posts={posts} /> 
                     
      </div>} 
      {tabvalue === 2 && <div className="posts">  
                        <VideoThumb videos={videos} /> 
                     
      </div>} 
      
        </form> 
                </Box>
        
        {isNonMobileScreens && (
          <Box flexBasis="35%" sx={{ml:"0.7rem"}} > 
<AppBar position="static" color="default" sx={{      
                     borderRadius:"22px ! important"                       }}>
        <Tabs
          onChange={handleTabsChange}
          value={tabvalue}
          orientation="vertical"
          indicatorColor="transparent"
          textColor="black"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example" 
          backgroundColor="transparent"
          overflow="hidden"
        >
          <Tab sx={{"&:focus": { outline: "none !important"}, "&.Mui-selected": {
          backgroundColor: `white ! important`,
         borderRadius:"22px !important", boxShadow: '0 4px 12px 0 rgba(0,0,0,0.16)',margin:"5px"}, margin:"5px"}} label="Люди" />
          <Tab sx={{"&:focus": { outline: "none !important"}, "&.Mui-selected": {
          backgroundColor: `white ! important`,
         borderRadius:"22px !important", boxShadow: '0 4px 12px 0 rgba(0,0,0,0.16)',margin:"5px"},margin:"5px"}}  label="Посты"  />
          <Tab sx={{"&:focus": { outline: "none !important"}, "&.Mui-selected": {
          backgroundColor: `white ! important`,
         borderRadius:"22px !important", boxShadow: '0 4px 12px 0 rgba(0,0,0,0.16)',margin:"5px"}, margin:"5px"}} label="Видео" />
        </Tabs>
      </AppBar> 
            {tabvalue === 0 && <Box>  

                           <FormControl 
                           sx={{marginTop:"1rem",backgroundColor:"white",
                           width:"100%"}} >
                           <InputLabel>Город</InputLabel>
   <Select name="address" onChange={handleFilters} defaultValue={""} > 
    <MenuItem value={""}>Все </MenuItem>
    <MenuItem value={"moscow"}>Москва
      </MenuItem>
    <MenuItem value={"Vyazov 13"}>Нью Йорк ул. Вязов 13
  </MenuItem>
  
 
  </Select>
  </FormControl>

            </Box>}
           </Box>
            )}
       </Box>
    )
}

export default AdvancedSearch
