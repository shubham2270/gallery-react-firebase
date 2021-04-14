import React, { useState } from "react";
import useFirestore from "../hooks/useFirestore";
// import { motion } from "framer-motion";
// import { Grid } from "react-responsive-image-grid";

// import useWindowSize from "../hooks/useWindowSize";

import Image from "./Image";

const ImageGrid = ({ setSelectedImg }) => {
  const { docs } = useFirestore("images");

  // get width & height of image
  // const dimensions = (imgSrc: string) => {
  //   // Create new offscreen image to test
  //   const theImage = new Image();
  //   theImage.src = imgSrc;
  //   // Get accurate measurements from that.
  //   const imageWidth = theImage.width;
  //   const imageHeight = theImage.height;
  //   // Create an object to save the image width and height
  //   const imgDimensions = { width: imageWidth, height: imageHeight };
  //   // Return the result
  //   return imgDimensions;
  // };

  return (
    <div className='row'>
      {docs &&
        docs.map((doc) => <Image doc={doc} setSelectedImg={setSelectedImg} />)}
    </div>
  );
};

export default ImageGrid;
