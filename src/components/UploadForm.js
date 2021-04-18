import React, { useState } from "react";
import imageCompression from "browser-image-compression";
import { Box, Center } from "@chakra-ui/react";

import ProgressBar from "./ProgressBar";

const UploadForm = () => {
  const [file, setFile] = useState(null);

  // -------------image compress codes-------------------

  async function handleImageUpload(event) {
    const imageFile = event.target.files[0];
    // console.log("originalFile instanceof Blob", imageFile instanceof Blob); // true
    // console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1024,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(imageFile, options);
      // console.log(
      //   "compressedFile instanceof Blob",
      //   compressedFile instanceof Blob
      // ); // true
      // console.log(
      //   `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
      // ); // smaller than maxSizeMB

      await setFile(compressedFile); // write your own logic
    } catch (error) {
      console.log(error);
    }
  }

  // ----------------image compress codes--------------------

  return (
    <Center>
      <Box borderWidth='2px' borderRadius='lg' p={5} borderColor='light-grey'>
        <form>
          <label>
            {/* <input type='file' accept='image/*' onChange={handleChange} /> */}
            <input
              type='file'
              accept='image/*'
              onChange={(event) => handleImageUpload(event)}
            />
            <span>+</span>
          </label>
          <Center>
            {/* {error && <div className='error'>{error}</div>} */}
            {file && <div style={{ paddingRight: "5px" }}>{file.name} </div>}
            {file && <ProgressBar file={file} setFile={setFile} />}
          </Center>
        </form>
      </Box>
    </Center>
  );
};

export default UploadForm;
