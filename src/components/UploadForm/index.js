import React, { useState, useEffect } from "react";
import * as R from "ramda";
import { Box, Center, Button, Flex, Text, Image } from "@chakra-ui/react";

import ProgressBar from "../ProgressBar";
import SelectDropdown from "./SelectDropdown";
import RadioButtons from "./RadioButtons";
import ChooseFile from "./ChooseFile";
import useStorage from "../../hooks/useStorage";

const UploadForm = ({ closeUploadModal }) => {
  const { uploadToFirebase, uploadCompleted, progress } = useStorage();

  const [imageData, setImageData] = useState([]);
  const [disableUploadBtn, setDisableUploadBtn] = useState(true);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = () => {
    setUploading(true);
    uploadToFirebase(imageData);
    // setShowImagePreview(false);
  };

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
    }
  }, [closeUploadModal, uploadCompleted]);

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

  console.log(R.find(R.propEq("type", ""))(imageData));
  return (
    <Center>
      <Box p={0} pt={2}>
        <form>
          {!uploading && (
            <ChooseFile setImageData={setImageData} imageData={imageData} />
          )}
          <Center>
            <Flex
              justifyContent='space-between'
              flexDirection='column'
              maxHeight={500}
              // minW={300}
              overflow='auto'
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
                        <Image
                          w={110}
                          alt='painting'
                          pr={5}
                          src={url}
                          key={url}
                          borderRadius
                        />

                        <Flex
                          direction='column'
                          pr={5}
                          height={120}
                          justifyContent='space-around'
                        >
                          <Text
                            style={{ paddingRight: "5px" }}
                            isTruncated
                            maxW={200}
                            // key={i}
                          >
                            {file.name}{" "}
                          </Text>
                          <SelectDropdown
                            // setArtType={setArtType}
                            setImageData={setImageData}
                            index={i}
                            imageData={imageData}
                            selectedImage={data}
                          />
                          {type && type.length > 0 && type !== "select-one" && (
                            <RadioButtons
                              setImageData={setImageData}
                              imageData={imageData}
                              index={i}
                              selectedImage={data}
                            />
                          )}
                        </Flex>
                      </Flex>
                    );
                  })}
                </Flex>
              )}
            </Flex>
          </Center>
          <Flex justifyContent='flex-end'>
            <Button
              colorScheme='green'
              _hover={{ background: "g.dark" }}
              _disabled={{ opacity: "0.3", cursor: "not-allowed" }}
              background='g.light'
              size='md'
              mt={6}
              onClick={handleImageUpload}
              disabled={disableUploadBtn}
            >
              Upload
            </Button>
          </Flex>
        </form>
      </Box>
    </Center>
  );
};

export default UploadForm;
