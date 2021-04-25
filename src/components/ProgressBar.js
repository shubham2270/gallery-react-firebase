import React, { useEffect } from "react";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";

const ProgressBar = ({ progress }) => {
  return (
    <>
      <CircularProgress value={progress} color='teal.400'>
        <CircularProgressLabel>
          {`${Math.round(progress)}%`}
        </CircularProgressLabel>
      </CircularProgress>
    </>
  );
};

export default ProgressBar;
