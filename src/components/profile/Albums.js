import React, {useState, useEffect } from "react";
import { actionType } from "../../Context/reducer";
import { useStateValue } from "../../Context/StateProvider";
import { getAllAlbums, getAllArtist } from "../../api";
import { filterByLanguage, filters } from "../../utils/supportfunctions";
import FilterButtonsProfile from "../FilterButtonsProfile";
import { MdClearAll } from "react-icons/md";
import { motion } from "framer-motion";

const Albums = () => {
  const [{ allAlbums }, dispatch] = useStateValue();
  const [filterName, setFilterName] = useState(null);
  const [filterImg, setFilterImg] = useState(null);
useEffect(() => {
    if (!allAlbums) {
      getAllAlbums().then((data) => {
        dispatch({ type: actionType.SET_ALL_ALBUMNS, allAlbums: data.data });
      });
    }
  }, []);
  
  return (
    <>
          <FilterButtonsProfile filterData={allAlbums} setFilterName={setFilterName} setFilterImg={setFilterImg}  flag={"Albums"} />

    </>
  );
};

export default Albums;
