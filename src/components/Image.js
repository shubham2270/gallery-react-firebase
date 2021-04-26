import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Button,
  Skeleton,
  Box,
  Flex,
  Spacer,
  Tag,
  TagLabel,
  Image as ChakaraImage,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

import { projectFirestore, projectStorage } from "../firebase/config";
import youtubeLogo from "../assets/youtube.png";

const Image = ({ setSelectedImg, doc, isAdmin }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
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
      borderWidth='3px'
      borderRadius='lg'
      borderColor='b.light'
      p='6px'
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
          layout
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
        bg='y.light'
        p='5px'
        justifyContent='space-between'
        alignItems='center'
      >
        <Flex>
          <Flex w={145} justifyContent='space-between'>
            <Tag
              size='sm'
              borderRadius='md'
              colorScheme='teal'
              variant='subtle'
              height='70%'
              pl={1}
              pr={1}
              border='2px solid'
              borderColor='g.light'
            >
              <TagLabel fontWeight='bold'>{doc.type}</TagLabel>
            </Tag>
            <Tag
              size='sm'
              borderRadius='md'
              colorScheme='red'
              variant='subtle'
              height='70%'
              pl={1}
              pr={1}
              border='2px solid'
              borderColor='r.light'
            >
              <TagLabel fontWeight='bold' textTransform='capitalize'>
                {doc.level}
              </TagLabel>
            </Tag>
          </Flex>
          {doc.youtube && doc.youtube.length > 0 && (
            <a href='https://youtu.be/YmnpjKotJQA'>
              <ChakaraImage
                src={youtubeLogo}
                style={{ width: "30px", marginTop: "0" }}
                ml={2}
                alt='youtube logo hd'
                cursor='pointer'
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
