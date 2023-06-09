import React, { useEffect, useState } from "react";
import { IoChevronDown } from "react-icons/io5";

import { motion } from "framer-motion";
import { useStateValue } from "../Context/StateProvider";
import { actionType } from "../Context/reducer";

const FilterButtons = ({ filterData, flag }) => {
  const [filterName, setFilterName] = useState(null);
  const [filterMenu, setFilterMenu] = useState(false);

  const [{ artistFilter, albumFilter, filterTerm }, dispatch] = useStateValue();

  const updateFilterButton = (name) => {
    setFilterName(name);
    setFilterMenu(false);

    if (flag === "Artist") {
      dispatch({ type: actionType.SET_ARTIST_FILTER, artistFilter: name });
    }
    if (flag === "Language") {
      dispatch({ type: actionType.SET_LANGUAGE_FILTER, languageFilter: name });
    }

    if (flag === "Albums") {
      dispatch({ type: actionType.SET_ALBUM_FILTER, albumFilter: name });
    }

    if (flag === "Category") {
      dispatch({ type: actionType.SET_FILTER_TERM, filterTerm: name });
    }
  };

  return (
    <div >
      <p
        
        onClick={() => setFilterMenu(!filterMenu)}
      >
        {!filterName && flag}
        {filterName && (
          <>
            {filterName.length > 15
              ? `${filterName.slice(0, 14)}...`
              : filterName}
          </>
        )}
        <IoChevronDown
          
        />
      </p>
      {filterData && filterMenu && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          
        >
          {filterData?.map((data) => (
            <div
              key={data.name}
              
              onClick={() => updateFilterButton(data.name)}
            >
              {(flag === "Artist" || flag === "Albums") && (
                <img
                  src={data.imageURL}
                  style={{width:"70px", height:"70px"}}
                  alt=""
                />
              )}
              <p >
                {data.name.length > 15
                  ? `${data.name.slice(0, 14)}...`
                  : data.name}
              </p>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default FilterButtons;
