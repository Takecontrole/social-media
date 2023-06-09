import React, { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getDataAPI } from '../../utils/fetchData'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import SearchUserCard from '../SearchUserCard'
import LoadIcon from '../../images/loading.gif'
import FlexBetween from "../FlexBetween";
import {Box,useTheme, IconButton,
  InputBase} from "@mui/material"
import {Search as SearchIcon} from "@mui/icons-material"
const Search = () => {
    const [search, setSearch] = useState('')
    const [users, setUsers] = useState([])
    

    const { auth } = useSelector(state => state)
    const dispatch = useDispatch()
    const [load, setLoad] = useState(false)
    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light; 
    let menuRef = useRef(); 
    

    const handleSearch = async (e) => {
        e.preventDefault()
        if(!search) return;

        try {
            setLoad(true)
            
            const res = await getDataAPI(`search?username=${search}`, auth.token)
            
            const users = await res;
            
            setUsers(users.data.users)
            
            setLoad(false)
        } catch (err) {
            dispatch({
                type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}
            })
        }
    }
const handleClose = () => {
        setSearch('')
        
        setUsers([])
    }
    
useEffect(() => {
    let handler = (e)=>{
      if(!menuRef.current.contains(e.target)){
        
        setSearch('')
        
        setUsers([])
    
        console.log(menuRef.current);
      }      
    };

    document.addEventListener("mousedown", handler);
    

    return() =>{
      document.removeEventListener("mousedown", handler);
    }

  });
    return (
        <form ref={menuRef} className="search_form" onSubmit={handleSearch}>
          <FlexBetween
            backgroundColor={neutralLight}
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



            <div style={{borderRadius:"10px",boxShadow:"0 0 10px #ddd"}} className="users">
        {
                    users.map(user => (
                        <SearchUserCard 
                        key={user._id} 
                        user={user} 
                        border="border"
                        handleClose={handleClose} 
                        />
                    ))
                }

     
      
            </div>
        </form>
    )
}

export default Search
