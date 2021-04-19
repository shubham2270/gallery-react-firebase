import React, { useState } from "react";
import imageCompression from "browser-image-compression";
import {
  Box,
  Center,
  Select,
  Button,
  Flex,
  Text,
  Image,
} from "@chakra-ui/react";

import ProgressBar from "./ProgressBar";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [artType, setArtType] = useState("");
  const [imageData, setImageData] = useState(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [showImagePreview, setShowImagePreview] = useState(true);

  const handleImageUpload = () => {
    setImageData({
      file,
      type: artType,
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
          <label>
            {/* <input type='file' accept='image/*' onChange={handleChange} /> */}
            <input
              type='file'
              accept='image/*'
              onChange={(event) => handleImageSelect(event)}
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
                  <ProgressBar file={file} setFile={setFile} type={artType} />
                </Center>
              </Box>
            )}
            {/* {error && <div className='error'>{error}</div>} */}
            <Flex
              justifyContent='space-between'
              flexDirection='column'
              height={120}
            >
              <Text style={{ paddingRight: "5px" }} isTruncated maxW={200}>
                {file?.name}{" "}
              </Text>

              <Select
                placeholder='Select art type'
                size='sm'
                onChange={(e) => handleDropdownChange(e)}
              >
                <option value='Painting'>Painting</option>
                <option value='Pencil Sketch'>Pencil Sketch</option>
                <option value='Others'>Others</option>
              </Select>

              <Button
                colorScheme='teal'
                size='sm'
                onClick={handleImageUpload}
                disabled={artType === "" || file === null ? true : false}
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
