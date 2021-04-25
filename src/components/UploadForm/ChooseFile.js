import React from "react";
import imageCompression from "browser-image-compression";

const ChooseFile = ({ setImageData }) => {
  // -------------image compress codes-------------------
  async function handleImageSelect(event) {
    const totalFilesLength = event.target.files.length;

    // loop over multiple selected files
    if (event.target.files) {
      for (let i = 0; i < totalFilesLength; i++) {
        const imageFile = event.target.files[i];

        event.persist();

        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1024,
          useWebWorker: true,
        };

        try {
          const compressedFile = await imageCompression(imageFile, options);
          await setImageData((prevState) => [
            ...prevState,
            {
              file: compressedFile,
              selectedImageUrl: URL?.createObjectURL(imageFile),
            },
          ]);
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
        className='selectFileInput'
      />
      <span>+</span>
    </label>
  );
};

export default ChooseFile;
