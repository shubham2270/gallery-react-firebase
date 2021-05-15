import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Box, Center, Flex, Text, Image } from "@chakra-ui/react";

import ProgressBar from "../ProgressBar";
import SelectDropdown from "./SelectDropdown";
import RadioButtons from "./RadioButtons";
import Input from "./Input";
import ChooseFile from "./ChooseFile";

const MotionBox = motion(Box);
const MotionText = motion(Text);
const MotionImage = motion(Image);

const UploadForm = ({
  closeUploadModal,
  uploading,
  setUploading,
  uploadToFirebase,
  uploadCompleted,
  progress,
  disableUploadBtn,
  setDisableUploadBtn,
  imageData,
  setImageData,
  setUploadCompleted,
}) => {
  // Track if file is uploading or not
  useEffect(() => {
    if (uploadCompleted) {
      setUploading(false);
    }
  }, [uploadCompleted, setUploading]);

  // close modal if upload is completed
  useEffect(() => {
    if (uploadCompleted) {
      closeUploadModal();
      setUploadCompleted(false);
    }
  }, [setUploadCompleted, closeUploadModal, uploadCompleted]);

  // Disable upload button if all image data is not filled
  useEffect(() => {
    for (let i = 0; i < imageData.length; i++) {
      if (imageData[i].type && imageData[i].type !== "" && imageData[i].level) {
        setDisableUploadBtn(false);
      } else {
        setDisableUploadBtn(true);
        break;
      }
    }
  }, [imageData, setDisableUploadBtn]);

  return (
    <Center>
      <Box p={0}>
        <form>
          {!uploading && (
            <ChooseFile setImageData={setImageData} imageData={imageData} />
          )}
          <Center>
            <Flex
              justifyContent='space-between'
              flexDirection='column'
              // maxHeight={400}
              // overflow='auto'
            >
              {uploading && (
                <Box>
                  <Center>
                    <ProgressBar progress={progress} />
                  </Center>
                </Box>
              )}
              {!uploading && (
                <Flex direction='column'>
                  {/* Preview image after selecting */}
                  {imageData.map((data, i) => {
                    const { selectedImageUrl: url, file, type } = data;
                    return (
                      <Flex
                        key={url}
                        justifyContent='space-between'
                        pb={10}
                        alignItems='center'
                      >
                        <MotionImage
                          w={100}
                          alt='painting'
                          pr={5}
                          src={url}
                          key={url}
                          borderRadius
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.2 }}
                        />

                        <Flex
                          direction='column'
                          pr={5}
                          height={130}
                          justifyContent='space-around'
                        >
                          <MotionText
                            style={{ paddingRight: "5px" }}
                            isTruncated
                            maxW={200}
                            initial={{ x: 100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.2 }}
                          >
                            {file.name}{" "}
                          </MotionText>
                          <motion.div
                            initial={{ x: 100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.1, duration: 0.2 }}
                          >
                            <SelectDropdown
                              setImageData={setImageData}
                              index={i}
                              imageData={imageData}
                              selectedImage={data}
                            />
                          </motion.div>
                          <AnimatePresence>
                            <Box height='24px'>
                              {type &&
                                type.length > 0 &&
                                type !== "select-one" && (
                                  <MotionBox
                                    initial={{ scale: 0.7 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0.1 }}
                                    transition={{
                                      duration: 0.4,
                                      type: "spring",
                                    }}
                                  >
                                    <RadioButtons
                                      setImageData={setImageData}
                                      imageData={imageData}
                                      index={i}
                                      // key={url}
                                      selectedImage={data}
                                    />
                                  </MotionBox>
                                )}
                            </Box>
                          </AnimatePresence>
                          <motion.div
                            initial={{ x: 100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.2 }}
                          >
                            <Input
                              i={i}
                              imageData={imageData}
                              setImageData={setImageData}
                            />
                          </motion.div>
                        </Flex>
                      </Flex>
                    );
                  })}
                </Flex>
              )}
            </Flex>
          </Center>
          {/* <Flex justifyContent={uploading ? "center" : "flex-end"}>
            <Button
              colorScheme='green'
              _hover={{ background: "g.dark" }}
              _disabled={{ opacity: "0.3", cursor: "not-allowed" }}
              background='g.light'
              size='md'
              mt={6}
              onClick={handleImageUpload}
              disabled={uploading || disableUploadBtn}
            >
              {"Upload"}
            </Button>
          </Flex> */}
        </form>
      </Box>
    </Center>
  );
};

export default UploadForm;
