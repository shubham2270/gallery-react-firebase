import React from "react";
import { motion } from "framer-motion";
import { Button } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

import { projectFirestore } from "../firebase/config";

const Image = ({ setSelectedImg, doc, isAdmin }) => {
  const collectionRef = projectFirestore.collection("images");

  // Deletes the image from database
  const removeImage = (imageId) => {
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

  const confirmDelete = (imageId) => {
    const userAction = window.confirm("Are you sure you want to delete image?");

    if (userAction) {
      console.log("DELETED!!!!");
      removeImage(imageId);
    } else {
      console.log("CANCELLED");
      return;
    }
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
      {isAdmin && (
        <Button
          variant='solid'
          colorScheme='red'
          size='sm'
          onClick={() => confirmDelete(doc.id)}
          leftIcon={<DeleteIcon />}
        >
          Delete
        </Button>
      )}
    </div>
  );
};

export default Image;
