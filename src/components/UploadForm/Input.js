import React from "react";
import { produce } from "immer";
import { Input as ChakaraInput, useMediaQuery } from "@chakra-ui/react";

const Input = ({
  imageData,
  setImageData,
  selectedImage,
  isEdit,
  id,
  i,
  inputValue,
  setInputValue,
}) => {
  const [isSmallerThan720] = useMediaQuery("(max-width: 720px)");
  const handleYoutubeInput = (e, index) => {
    e.persist();
    if (isEdit) {
      setInputValue(e.target.value);
      return;
    } else {
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
    }
  };

  return (
    <ChakaraInput
      size={isEdit ? "xs" : "sm"}
      placeholder='Paste youtube video link'
      onChange={(e) => handleYoutubeInput(e, i)}
      value={inputValue}
      background='white'
      width={isSmallerThan720 ? "90px" : "185px"}
    />
  );
};

export default Input;
