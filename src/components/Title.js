import React from "react";
import { Typography } from "@material-ui/core";

const Title = () => {
  return (
    <div className='title'>
      <Typography variant='h1'>Sneha's gallery</Typography>
      <Typography variant='h2'>Sneha Gupta Paintings</Typography>
      <p>
        Learn these drawings/paintings from basic to advanced in{" "}
        <a
          target='_blank'
          href='https://www.youtube.com/channel/UCM-Xo1DRAj7BjQFSTBm74zQ'
        >
          Kids Art Creation
        </a>{" "}
        Youtube channel
      </p>
    </div>
  );
};

export default Title;
