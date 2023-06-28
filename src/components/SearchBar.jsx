import React, {useEffect} from "react";
import { IoSearch } from "react-icons/io5";
import { actionType } from "../Context/reducer";
import { useStateValue } from "../Context/StateProvider";
import FlexBetween from "./FlexBetween";
import {Box,useTheme, IconButton,
  InputBase} from "@mui/material"
import {Search as SearchIcon} from "@mui/icons-material"
let scroll = 0;
const SearchBar = () => {
  const [{ searchTerm }, dispatch] = useStateValue();
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light; 
  const setSearchTerm = (value) => {
    dispatch({
      type: actionType.SET_SEARCH_TERM,
      searchTerm: value,
    });
  };
window.addEventListener('scroll', () => {
        if(window.location.pathname === '/allmusic'){
            scroll = window.pageYOffset
            return scroll;
        }
    })

    useEffect(() => {
        setTimeout(() => {
            window.scrollTo({top: scroll, behavior: 'smooth'})
        }, 100)
    },[])
  return (
            <form className="search_form">
          <FlexBetween
            backgroundColor={neutralLight}
            gap="3rem"
            padding="0.1rem 1.5rem" 
          >
            <InputBase 
            type="text" name="search" id="search" 
          value={searchTerm}
          placeholder="Найди музыку ...."
          onChange={(e) => setSearchTerm(e.target.value)}/>
            <IconButton>
              <SearchIcon />
            </IconButton> 
          </FlexBetween>
        </form>
  );
};

export default SearchBar;
