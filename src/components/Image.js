import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Button,
  Skeleton,
  Box,
  Flex,
  Spacer,
  Image as ChakaraImage,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

import { projectFirestore, projectStorage } from "../firebase/config";
import youtubeLogo from "../assets/youtube.png";
import InfoPopover from "./InfoPopover";

const Image = ({ setSelectedImg, doc, isAdmin }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const collectionRef = projectFirestore.collection("images");

  // Deletes the image from database
  const removeImage = (imageId, imageUrl) => {
    // Remove the image doc from firestore
    collectionRef
      .doc(imageId)
      .delete()
      .then(() => {
        // Deletes the image file from storage
        projectStorage.refFromURL(imageUrl).delete();
        console.log("Image successfully deleted!");
      })
      .catch((error) => {
        console.log("Error deleting image", error);
      });
  };

  const confirmDelete = (imageId, imageUrl) => {
    const userAction = window.confirm("Are you sure you want to delete image?");
    if (userAction) {
      console.log("DELETED!!!!");
      removeImage(imageId, imageUrl);
    } else {
      console.log("CANCELLED");
      return;
    }
  };

  return (
    <Flex
      borderWidth='4px'
      borderRadius='lg'
      borderColor='b.light'
      maxH='full'
      className='column'
      m='5px'
      flexDirection='column'
      bg='dark'
    >
      <Box>
        <div
          style={{ width: "100%", background: "white" }}
          key={doc.id}
          pr={2}
          pl={2}
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
      <Flex
        pl='5px'
        bg='whiteAlpha.400'
        p='5px'
        justifyContent='space-between'
        alignItems='center'
      >
        <Flex>
          {/* Image info pop over */}
          <InfoPopover level={doc.level} type={doc.type} />
          {doc.youtube && doc.youtube.length > 0 && (
            <a href={doc.youtube}>
              {loading && <Skeleton w={35} h={5} />}
              <ChakaraImage
                src={youtubeLogo}
                style={{
                  width: "30px",
                  marginTop: "0",
                  display: `${loading ? "none" : "block"}`,
                }}
                ml={2}
                alt='youtube logo hd'
                cursor='pointer'
                onLoad={() => setLoading(false)}
              />
            </a>
          )}
        </Flex>
        {isAdmin && (
          <Button
            variant='solid'
            background='r.light'
            _hover={{ bg: "r.dark" }}
            color='white'
            size={"xs"}
            onClick={() => confirmDelete(doc.id, doc.url)}
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
