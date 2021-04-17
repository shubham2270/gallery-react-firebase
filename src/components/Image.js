import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { projectFirestore } from "../firebase/config";

const Image = ({ setSelectedImg, doc }) => {
  const collectionRef = projectFirestore.collection("images");

  console.log("docccc", doc);

  // Deletes the image from database
  const removeImage = (imageId) => {
    console.log("imageId>>>>", imageId);
    collectionRef
      .doc(imageId)
      .delete()
      .then(() => {
        console.log("Image successfully deleted!");
      })
      .catch((error) => {
        console.log("Error deleting image", error);
      });
  };

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
      <button onClick={() => removeImage(doc.id)}>DELETE IMAGE</button>
    </div>
  );
};

export default Image;
