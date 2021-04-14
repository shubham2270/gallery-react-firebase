import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Image = ({ setSelectedImg, doc }) => {
  return (
    <div className='column'>
      <motion.div
        // className='column'
        style={{ width: "100%" }}
        key={doc.id}
        layout
        whileHover={{ opacity: 1 }}
        s
        onClick={() => setSelectedImg(doc.url)}
      >
        <motion.img
          src={doc.url}
          alt='uploaded pic'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        />
      </motion.div>
    </div>
  );
};

export default Image;
