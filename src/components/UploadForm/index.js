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
    // setImageData({
    //   file,
    //   type: artType,
    //   level,
    //   selectedImageUrl,
    // });

    // uploadToFirebase(file, artType, level);
    setShowImagePreview(false);
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
        borderWidth='2px'
        borderRadius='lg'
        p={5}
        pt={2}
        borderColor='light-grey'
      >
        <form>
          <ChooseFile
            setShowImagePreview={setShowImagePreview}
            setSelectedImageUrl={setSelectedImageUrl}
            selectedImageUrl={selectedImageUrl}
            setFile={setFile}
            file={file}
            setImageData={setImageData}
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
              height={130}
            >
              <Flex>
                {/* Preview image after selecting */}
                {selectedImageUrl &&
                  showImagePreview &&
                  selectedImageUrl.map((url) => {
                    return (
                      <Image
                        w={150}
                        alt='painting'
                        pr={5}
                        src={url}
                        key={url}
                      />
                    );
                  })}
                {imageData?.map((info, i) => {
                  return (
                    <Text
                      style={{ paddingRight: "5px" }}
                      isTruncated
                      maxW={200}
                      key={i}
                    >
                      {info.file.name}{" "}
                    </Text>
                  );
                })}
                {imageData?.map((item, i) => {
                  return (
                    <div key={item.file.name}>
                      <SelectDropdown
                        setArtType={setArtType}
                        setImageData={setImageData}
                        index={i}
                        imageData={imageData}
                        selectedImage={item}
                      />
                      <RadioButtons
                        level={level}
                        setLevel={setLevel}
                        artType={artType}
                        setImageData={setImageData}
                        imageData={imageData}
                        index={i}
                        selectedImage={item}
                      />
                    </div>
                  );
                })}
              </Flex>
              <Button
                colorScheme='green'
                _hover={{ background: "g.dark" }}
                _disabled={{ opacity: "0.3", cursor: "not-allowed" }}
                background='g.light'
                size='sm'
                onClick={handleImageUpload}
                // disabled={
                //   imageData?.length < 1 || !level || !artType ? true : false
                // }
              >
                Upload
              </Button>
            </Flex>
          </Center>
        </form>
      </Box>
    </Center>
  );
};

export default UploadForm;
