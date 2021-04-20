import React, { useState, useEffect } from "react";
import { Box, Center, Button, Flex, Text, Image } from "@chakra-ui/react";

import ProgressBar from "../ProgressBar";
import SelectDropdown from "./SelectDropdown";
import RadioButtons from "./RadioButtons";
import ChooseFile from "./ChooseFile";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [artType, setArtType] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [showImagePreview, setShowImagePreview] = useState(true);
  const [level, setLevel] = useState(null);

  const handleImageUpload = () => {
    setImageData({
      file,
      level,
      type: artType,
      selectedImageUrl,
    });
    setShowImagePreview(false);
  };

  useEffect(() => {
    if (!imageData) {
      setFile(null);
      setSelectedImageUrl(null);
      setLevel(null);
      setArtType(null);
    }
  }, [setFile, setArtType, setSelectedImageUrl, setLevel, imageData]);
  return (
    <Center>
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
            setFile={setFile}
          />
          <Center>
            {/* Preview image after selecting */}
            {selectedImageUrl && showImagePreview && (
              <Image w={150} alt='painting' pr={5} src={selectedImageUrl} />
            )}
            {imageData && file && (
              <Box w={150}>
                <Center>
                  <ProgressBar
                    file={file}
                    setFile={setFile}
                    setImageData={setImageData}
                    imageData={imageData}
                    type={artType}
                  />
                </Center>
              </Box>
            )}
            <Flex
              justifyContent='space-between'
              flexDirection='column'
              height={130}
            >
              <Text style={{ paddingRight: "5px" }} isTruncated maxW={200}>
                {file?.name}{" "}
              </Text>
              <SelectDropdown setArtType={setArtType} />
              <RadioButtons
                level={level}
                setLevel={setLevel}
                artType={artType}
              />
              <Button
                colorScheme='teal'
                size='sm'
                onClick={handleImageUpload}
                disabled={!file || !level || !artType ? true : false}
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
