import React from "react";
import { Box, Stack, Radio, RadioGroup } from "@chakra-ui/react";

const RadioButtons = ({
  setLevel,
  level,
  artType,
  imageData,
  setImageData,
  selectedImage,
  index,
}) => {
  const handleRadioButtons = (value) => {
    console.log("event>>>>>>>>>>>", value);
    console.log("seleted Image>>>>", selectedImage);
    let copyImageData = imageData;
    imageData.map((item, i) => {
      // change only clicked dropdown data in state
      if (i === index) {
        console.log("::::::::::::");
        return (copyImageData[index].level = value);
      }
    });
    console.log("IIIIIII", copyImageData);
    setImageData(copyImageData);
  };
  return (
    <Box w={169} height={5}>
      {console.log("lllll", selectedImage)}
      <RadioGroup
        onChange={(e) => handleRadioButtons(e)}
        value={selectedImage.level}
      >
        <Stack direction='row' spacing={5}>
          <Radio value='basic' colorScheme='teal'>
            Basic
          </Radio>
          <Radio value='advance' colorScheme='teal'>
            Advance
          </Radio>
        </Stack>
      </RadioGroup>
    </Box>
  );
};

export default RadioButtons;
