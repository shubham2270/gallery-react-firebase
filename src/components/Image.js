import React, { useState, useContext, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Button,
  Skeleton,
  Box,
  Flex,
  Spacer,
  Image as ChakaraImage,
  Tooltip,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon, CloseIcon } from "@chakra-ui/icons";

import { projectFirestore, projectStorage } from "../firebase/config";
import youtubeLogo from "../assets/youtube.png";
import InfoPopover from "./InfoPopover";
import { isAdminContext } from "../App";
import Input from "./UploadForm/Input";
import useIsValidUrl from "../hooks/useIsValidUrl";

const MotionFlex = motion(Flex);

const Image = ({ setSelectedImg, doc }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const collectionRef = projectFirestore.collection("images");

  // const isUrlValid = useIsValidUrl(inputValue);

  const isAdmin = useContext(isAdminContext);

  const isYoutubeLink = doc?.youtube && doc.youtube.length;

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

  // handle youtube url editing
  const handleEdit = (name) => {
    if (name === doc.name) {
      setEditing((prevState) => !prevState);
    }
  };

  useEffect(() => {
    setInputValue(doc.youtube);
  }, [doc]);

  const handleYoutubeUrlSave = () => {
    if (inputValue === "") {
      const collectionRef = projectFirestore.collection("images");
      collectionRef.doc(doc.id).update({ youtube: inputValue || "" });
      setEditing(false); // close the edit after selecting
    } else {
      alert("Please enter a valid youtube URL!");
      setInputValue("");
    }
  };

  return (
    <MotionFlex
      borderWidth='4px'
      borderRadius='lg'
      borderColor='b.light'
      maxH='full'
      className='column'
      m='5px'
      flexDirection='column'
      bg='dark'
      initial={{ x: -1000, opacity: 0 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
      exit={{ x: -1000, opacity: 0 }}
      layout
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
            initial={{ y: 500, opacity: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.7, type: "spring" }}
            onLoad={() => setImageLoaded(doc.url)}
            layout={false}
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
        <Flex alignItems='center'>
          {/* Image info pop over */}
          <InfoPopover level={doc.level} type={doc.type} docId={doc.id} />

          {!editing && (
            <Tooltip
              label={
                isYoutubeLink
                  ? "Watch on Youtube!"
                  : "Youtube link will be updated soon!"
              }
            >
              <a
                href={doc.youtube}
                onClick={(e) => (isYoutubeLink ? {} : e.preventDefault())}
                target='blank'
              >
                {loading && <Skeleton w={35} h={5} />}
                <ChakaraImage
                  src={youtubeLogo}
                  style={{
                    width: "30px",
                    marginTop: "0",
                    display: `${loading ? "none" : "block"}`,
                    opacity: `${isYoutubeLink ? 1 : 0.3}`,
                  }}
                  ml={2}
                  alt='logo'
                  cursor='pointer'
                  onLoad={() => setLoading(false)}
                />
              </a>
            </Tooltip>
          )}
          {/* Youtube edit input field */}
          {editing && (
            <Input
              isEdit
              inputValue={inputValue}
              setInputValue={setInputValue}
            />
          )}
          {/* Save button for youtube edit */}
          {editing && (
            <Button
              background='g.light'
              size='xs'
              onClick={handleYoutubeUrlSave}
              ml='2px'
            >
              Save
            </Button>
          )}
          {/* Edit icon */}
          {isAdmin && !editing ? (
            <EditIcon
              ml={5}
              color='y.light'
              cursor='pointer'
              onClick={() => handleEdit(doc.name)}
            />
          ) : isAdmin ? (
            <CloseIcon
              color='y.light'
              ml={3}
              onClick={() => handleEdit(doc.name)}
            />
          ) : null}
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
    </MotionFlex>
  );
};

export default Image;
