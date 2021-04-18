import React, { useState } from "react";
import useFirestore from "../hooks/useFirestore";
import { Box, useMediaQuery } from "@chakra-ui/react";

// import useWindowSize from "../hooks/useWindowSize";

import Image from "./Image";

const ImageGrid = ({ setSelectedImg, isAdmin }) => {
  const [isSmallerThan720] = useMediaQuery("(max-width: 720px)");
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
    <Box p={10} pl={isSmallerThan720 ? 0 : 20} pr={isSmallerThan720 ? 0 : 20}>
      <div className='row'>
        {docs &&
          docs.map((doc) => (
            <Image
              doc={doc}
              setSelectedImg={setSelectedImg}
              isAdmin={isAdmin}
            />
          ))}
      </div>
    </Box>
  );
};

export default ImageGrid;
