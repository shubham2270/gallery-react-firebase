import React, { useEffect } from "react";
import useStorage from "../hooks/useStorage";
import { motion } from "framer-motion";
import { LinearProgress, Box, Typography } from "@material-ui/core";

const ProgressBar = ({ file, setFile }) => {
  const { progress, url } = useStorage(file);

  useEffect(() => {
    if (url) {
      setFile(null);
    }
  }, [url, setFile]);

  return (
    <>
      <Box display='flex' alignItems='center'>
        <Box width='100%' mr={1}>
          <LinearProgress variant='determinate' value={progress} />
        </Box>
        <Box minWidth={35}>
          <Typography variant='body2' color='textSecondary'>{`${Math.round(
            progress
          )}%`}</Typography>
        </Box>
      </Box>
      {/* <motion.div
        className='progress-bar'
        initial={{ width: 0 }}
        animate={{ width: progress + "%" }}
      ></motion.div> */}
    </>
  );
};

export default ProgressBar;
