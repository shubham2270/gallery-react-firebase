import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button, Skeleton, Box, Flex, Spacer } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

import { projectFirestore } from "../firebase/config";

const Image = ({ setSelectedImg, doc, isAdmin }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const collectionRef = projectFirestore.collection("images");

  // Deletes the image from database
  const removeImage = (imageId) => {
    collectionRef
      .doc(imageId)
      .delete()
      .then(() => {
        console.log("Image successfully deleted!");
        setIsDelete(false);
      })
      .catch((error) => {
        console.log("Error deleting image", error);
      });
  };

  const confirmDelete = (imageId) => {
    const userAction = window.confirm("Are you sure you want to delete image?");
    setIsDelete(true);
    if (userAction) {
      console.log("DELETED!!!!");
      setIsDelete(true);
      removeImage(imageId);
    } else {
      console.log("CANCELLED");
      return;
    }
  };

  return (
    <Flex
      borderWidth='1px'
      borderRadius='lg'
      p='6px'
      maxH='full'
      className='column'
      m='5px'
      flexDirection='column'
      bg='#F8F8F8'
    >
      <Box>
        <div
          style={{ width: "100%", background: "white" }}
          key={doc.id}
          layout
          whileHover={{ opacity: 1 }}
          onClick={() => setSelectedImg(doc.url)}
        >
          {imageLoaded !== doc.url && <Skeleton height='400px' />}

          <motion.img
            style={
              imageLoaded === doc.url
                ? { borderRadius: "5px" }
                : { display: "none" }
            }
            src={doc.url}
            alt='uploaded pic'
            initial={{ opacity: 0.4 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            onLoad={() => setImageLoaded(doc.url)}
          />
        </div>
      </Box>
      <Spacer />
      <Flex pl='5px'>
        {isAdmin && (
          <Button
            variant='solid'
            colorScheme='red'
            size='sm'
            mt='10px'
            onClick={() => confirmDelete(doc.id)}
            leftIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default Image;
