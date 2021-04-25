import React, { useCallback } from "react";
import imageCompression from "browser-image-compression";

const ChooseFile = ({
  // setShowImagePreview,
  // selectedImageUrl,
  // setSelectedImageUrl,
  // setFile,
  // file,
  setImageData,
}) => {
  // Reset selected images if upload is clicked
  // const resetSelectedImage = useCallback(() => {
  //   // setFile([]);
  //   setSelectedImageUrl([]);
  // }, [setFile, setSelectedImageUrl]);

  // -------------image compress codes-------------------
  async function handleImageSelect(event) {
    // setShowImagePreview(true);
    // const imageFile = event.target.files[0];

    const totalFilesLength = event.target.files.length;

    // let allImageURL = [];
    // let imageFiles = [...file];

    // loop over multiple selected files
    if (event.target.files) {
      for (let i = 0; i < totalFilesLength; i++) {
        const imageFile = event.target.files[i];
        // allImageURL = [...allImageURL, URL?.createObjectURL(imageFile)];
        // setSelectedImageUrl(allImageURL);

        event.persist();

        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1024,
          useWebWorker: true,
        };

        try {
          const compressedFile = await imageCompression(imageFile, options);
          // imageFiles = [...imageFiles, compressedFile];
          await setImageData((prevState) => [
            ...prevState,
            {
              file: compressedFile,
              selectedImageUrl: URL?.createObjectURL(imageFile),
            },
          ]);
          // await setFile(imageFiles); // write your own logic
        } catch (error) {
          console.log(error);
        }
      }
    }
  }

  return (
    <label className='selectLabel'>
      <input
        type='file'
        accept='image/*'
        multiple
        onChange={(event) => handleImageSelect(event)}
        // onClick={() => resetSelectedImage()}
        className='selectFileInput'
      />
      <span>+</span>
    </label>
  );
};

export default ChooseFile;
