import React from "react";
import { Box, Stack, Radio, RadioGroup } from "@chakra-ui/react";

const RadioButtons = (setLevel, level, artType) => {
  return (
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
  );
};
