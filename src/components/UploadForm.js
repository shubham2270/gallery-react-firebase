import React, { useState, useEffect } from "react";
import imageCompression from "browser-image-compression";
import {
  Box,
  Center,
  Select,
  Button,
  Flex,
  Text,
  Image,
  Stack,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";

import ProgressBar from "./ProgressBar";

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

  // -------------image compress codes-------------------
  async function handleImageSelect(event) {
    setShowImagePreview(true);
    const imageFile = event.target.files[0];

    setSelectedImageUrl(URL.createObjectURL(imageFile));

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1024,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(imageFile, options);

      await setFile(compressedFile); // write your own logic
    } catch (error) {
      console.log(error);
    }
  }

  const handleDropdownChange = (e) => {
    setArtType(e.target.value);
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
          <label className='selectLabel'>
            {/* <input type='file' accept='image/*' onChange={handleChange} /> */}
            <input
              type='file'
              accept='image/*'
              onChange={(event) => handleImageSelect(event)}
              className='selectFileInput'
            />
            <span>+</span>
          </label>
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
            {/* {error && <div className='error'>{error}</div>} */}
            <Flex
              justifyContent='space-between'
              flexDirection='column'
              height={130}
            >
              <Text style={{ paddingRight: "5px" }} isTruncated maxW={200}>
                {file?.name}{" "}
              </Text>

              <Select
                placeholder='Select art type'
                size='sm'
                onChange={(e) => handleDropdownChange(e)}
              >
                <option value='Water Color'>Water Color</option>
                <option value='Oil Pastel Sketch'>Oil Pastel Sketch</option>
                <option value='Colored Pencil'>Colored Pencil</option>
                <option value='Pencil Drawings'>Pencil Drawings</option>
                <option value='Acrylic Paintings'>Acrylic Paintings</option>
                <option value='Oil Paintings'>Oil Paintings</option>
                <option value='Others'>Others</option>
              </Select>
              <Box w={169} height={5}>
                {artType && (
                  <RadioGroup onChange={setLevel} value={level}>
                    <Stack direction='row' spacing={5}>
                      <Radio value='basic' colorScheme='teal'>
                        Basic
                      </Radio>
                      <Radio value='advance' colorScheme='teal'>
                        Advance
                      </Radio>
                    </Stack>
                  </RadioGroup>
                )}
              </Box>
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
