import React from "react";
import imageCompression from "browser-image-compression";

const ChooseFile = ({ setShowImagePreview, setSelectedImageUrl, setFile }) => {
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

  return (
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
  );
};

export default ChooseFile;
