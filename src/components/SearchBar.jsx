import React from "react";
import { IoSearch } from "react-icons/io5";
import { actionType } from "../Context/reducer";
import { useStateValue } from "../Context/StateProvider";

const SearchBar = () => {
  const [{ searchTerm }, dispatch] = useStateValue();

  const setSearchTerm = (value) => {
    dispatch({
      type: actionType.SET_SEARCH_TERM,
      searchTerm: value,
    });
  };

  return (
    <div >
      <div >
        <IoSearch  />
        <input
          type="text"
          value={searchTerm}
          
          placeholder="Найди музыку ...."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchBar;
