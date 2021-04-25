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
    let copyImageData = imageData;
    imageData.map((item, i) => {
      // change only clicked dropdown data in state
      if (i === index) {
        return (copyImageData[index].level = value);
      }
    });
    setImageData(copyImageData);
  };
  return (
    <Box w={169} height={5}>
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
