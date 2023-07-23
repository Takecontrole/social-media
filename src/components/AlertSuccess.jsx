import React from "react";

import { BsEmojiSmile } from "react-icons/bs";
import { motion } from "framer-motion";

const AlertSuccess = ({ msg,handleShow,bgColor }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -100, scale: 0.6 }}
      animate={{ opacity: 1, y: 50, scale: 1 }}
      exit={{ opacity: 0, y: -100, scale: 0.6 }}
      
      style={{width:"100%", position:"fixed", zIndex:40, top:0, right:0, display:"flex", alignItems:"center", justifyContent:"center",textAlign:"center" }}
    >
      <div style={{width:"400px",height:"100px",backgroundImage:bgColor, padding:"0.7rem", borderRadius:"10px"}}>
        <BsEmojiSmile />
        <p style={{fontSize:"12px", fontWeight:"bold"}}>
          {msg?.length > 50 ? `${msg?.slice(0, 50)}...` : msg}
        </p>
        <button
                 style={{border:"none",background:"transparent",outline: 'none', fontWeight:"bold"}}
                onClick={handleShow}>
                    X 
                </button>
      </div>
    </motion.div>
  );
};

export default AlertSuccess;
