import React, { useState, useEffect } from "react";
import {
  Box,
  Center,
  Button,
  Flex,
  Text,
  Image,
  Input,
} from "@chakra-ui/react";
import produce from "immer";

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
    console.log("IMage data---", imageData);
    setUploading(true);
    uploadToFirebase(imageData, "upload");
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

  const handleYoutubeInput = (e, index) => {
    e.persist();
    imageData.map((item, i) => {
      // change only clicked input data in state
      setImageData(
        produce((draft) => {
          if (i === index) {
            draft[index].youtube = e.target.value;
          }
        })
      );
    });
  };

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
              maxHeight={400}
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
                          w={100}
                          alt='painting'
                          pr={5}
                          src={url}
                          key={url}
                          borderRadius
                        />

                        <Flex
                          direction='column'
                          pr={5}
                          height={130}
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
                          <Input
                            size='sm'
                            placeholder='Paste youtube video link'
                            onChange={(e) => handleYoutubeInput(e, i)}
                          />
                        </Flex>
                      </Flex>
                    );
                  })}
                </Flex>
              )}
            </Flex>
          </Center>
          <Flex justifyContent={uploading ? "center" : "flex-end"}>
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
          </Flex>
        </form>
      </Box>
    </Center>
  );
};

export default UploadForm;
