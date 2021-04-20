import React, { useEffect } from "react";
import useStorage from "../hooks/useStorage";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";

const ProgressBar = ({ setImageData, imageData }) => {
  const { file, type, level } = imageData;
  const { progress, url } = useStorage(file, type, level);

  useEffect(() => {
    if (url) {
      setImageData(null);
    }
  }, [url, setImageData]);

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
