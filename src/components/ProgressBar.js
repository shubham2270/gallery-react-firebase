import React from "react";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";

const ProgressBar = ({ progress }) => {
  return (
    <>
      <CircularProgress
        value={progress}
        color='g.light'
        size='180px'
        thickness='12px'
      >
        <CircularProgressLabel>
          {`${Math.round(progress)}%`}
        </CircularProgressLabel>
      </CircularProgress>
    </>
  );
};

export default ProgressBar;
