import React, { useState, useEffect } from "react";
import { Box, Center, Button, Flex, Text, Image } from "@chakra-ui/react";

import ProgressBar from "../ProgressBar";
import SelectDropdown from "./SelectDropdown";
import RadioButtons from "./RadioButtons";
import ChooseFile from "./ChooseFile";
import useStorage from "../../hooks/useStorage";

const UploadForm = ({ closeUploadModal }) => {
  const [file, setFile] = useState([]);
  const [artType, setArtType] = useState(null);
  const [imageData, setImageData] = useState([]);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [showImagePreview, setShowImagePreview] = useState(true);
  const [level, setLevel] = useState(null);
  const { uploadToFirebase } = useStorage();

  const handleImageUpload = () => {
    console.log(">>>>>>>>>>>>>>>>>>NNNNNN", imageData);
    uploadToFirebase(imageData);
    // setShowImagePreview(false);
  };

  console.log("Image Data::", imageData);

  // useEffect(() => {
  //   if (!imageData) {
  //     setFile(null);
  //     setSelectedImageUrl(null);
  //     setLevel(null);
  //     setArtType(null);
  //   }
  // }, [setFile, setArtType, setSelectedImageUrl, setLevel, imageData]);
  return (
    <Center>
      {console.log("Image Data::", imageData)}
      <Box
        // borderWidth='2px'
        // borderRadius='lg'
        p={5}
        pt={2}
        // borderColor='light-grey'
      >
        <form>
          <ChooseFile
            setShowImagePreview={setShowImagePreview}
            setSelectedImageUrl={setSelectedImageUrl}
            selectedImageUrl={selectedImageUrl}
            setFile={setFile}
            file={file}
            setImageData={setImageData}
            imageData={imageData}
          />
          <Center>
            {imageData.length > 0 && file?.length > 0 && (
              <Box w={150}>
                <Center>
                  <ProgressBar
                    file={file}
                    setFile={setFile}
                    setImageData={setImageData}
                    imageData={imageData}
                    type={artType}
                    closeUploadModal={closeUploadModal}
                  />
                </Center>
              </Box>
            )}
            <Flex
              justifyContent='space-between'
              flexDirection='column'
              maxHeight={500}
              minW={450}
              overflow='auto'
            >
              <Flex direction='column'>
                {/* Preview image after selecting */}
                {imageData.map((data, i) => {
                  const { selectedImageUrl: url, file } = data;
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
                      />

                      <Flex direction='column' pr={5}>
                        <Text
                          style={{ paddingRight: "5px" }}
                          isTruncated
                          maxW={200}
                          // key={i}
                        >
                          {file.name}{" "}
                        </Text>
                        <SelectDropdown
                          setArtType={setArtType}
                          setImageData={setImageData}
                          index={i}
                          imageData={imageData}
                          selectedImage={data}
                        />
                        <RadioButtons
                          level={level}
                          setLevel={setLevel}
                          artType={artType}
                          setImageData={setImageData}
                          imageData={imageData}
                          index={i}
                          selectedImage={data}
                        />
                      </Flex>
                    </Flex>
                  );
                })}
              </Flex>
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
              // disabled={
              //   imageData?.length < 1 || !level || !artType ? true : false
              // }
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
