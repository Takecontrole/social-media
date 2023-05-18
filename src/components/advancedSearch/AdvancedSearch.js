import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getDataAPI } from '../../utils/fetchData'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import SearchUserCard from '../SearchUserCard'
import PostThumb from '../PostThumb'

import LoadIcon from '../../images/loading.gif'
import FlexBetween from "../FlexBetween";
import {Box, useMediaQuery, IconButton,
  InputBase, Tabs, Tab, AppBar} from "@mui/material"
import {Search as SearchIcon} from "@mui/icons-material" 
const AdvancedSearch = () => {
    const [search, setSearch] = useState('')
    const [users, setUsers] = useState([])
    const [posts, setPosts] = useState([])

    const { auth, theme } = useSelector(state => state)
    const dispatch = useDispatch()
    const [load, setLoad] = useState(false)
    
    let menuRef = useRef(); 
    const [tabvalue, setTabValue] = React.useState(0); 
    const isNonMobileScreens = useMediaQuery("(min-width:801px)");


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
            const users = await res;
            const posts = await res1;
            setUsers(users.data.users)
            setPosts(posts.data.posts)
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
                    users.map(user => (
                        <SearchUserCard 
                        key={user._id} 
                        user={user} 
                        border="border"
                        
                        />
                    ))
                }
      </div>}
            </div>
      {tabvalue === 1 && <div className="posts"> 
                        <PostThumb posts={posts} /> 
                     
      </div>} 
      
        </form> 
                </Box>
        
        {isNonMobileScreens && (
          <Box flexBasis="35%" sx={{ml:"0.7rem", border:"1px solid black"}} > 
                                <AppBar position="static" color="default">
        <Tabs
          onChange={handleTabsChange}
          value={tabvalue}
          orientation="vertical"
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example" 
          
        >
          <Tab label="Люди" />
          <Tab label="Посты" />
          <Tab label="Menu3" disabled />
        </Tabs>
      </AppBar> 
      

            </Box>
            )}
       </Box>
    )
}

export default AdvancedSearch
