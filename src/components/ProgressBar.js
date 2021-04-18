import React, { useEffect } from "react";
import useStorage from "../hooks/useStorage";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";

const ProgressBar = ({ file, setFile }) => {
  const { progress, url } = useStorage(file);

  useEffect(() => {
    if (url) {
      setFile(null);
    }
  }, [url, setFile]);

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
