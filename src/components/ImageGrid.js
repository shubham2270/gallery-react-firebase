import React, { useState, useEffect } from "react";
import * as R from "ramda";
import useFirestore from "../hooks/useFirestore";
import { Box, useMediaQuery } from "@chakra-ui/react";

// import useWindowSize from "../hooks/useWindowSize";

import Image from "./Image";

const ImageGrid = ({ setSelectedImg, isAdmin, filterList }) => {
  const [docImageData, setDocImageData] = useState([]);
  const [isSmallerThan720] = useMediaQuery("(max-width: 720px)");
  const { docs } = useFirestore("images");

  // Check if filter is applied or not
  const isAdvance = filterList[0].isChecked;
  const isBasics = filterList[1].isChecked;

  // Filters out object from array that contains provided value;
  const filterImageData = (val) =>
    R.filter(R.compose(R.any(R.contains(val)), R.values));

  useEffect(() => {
    const filterByAdvance = filterImageData("advance")(docImageData);
    const filterByBasic = filterImageData("basic")(docImageData);

    setDocImageData(
      isAdvance && !isBasics
        ? filterByAdvance
        : isBasics && !isAdvance
        ? filterByBasic
        : docs
    );
  }, [
    filterList,
    // filterByAdvance,
    docs,
    // filterByBasic,
    isBasics,
    isAdvance,
    setDocImageData,
    docImageData,
  ]);

  // useEffect(() => {
  //   setDocImageData(docs);
  // }, [docs, setDocImageData]);

  console.log(">>>>>>>>>>>>>>>>>>>>>>>", docImageData);

  return (
    <Box p={10} pl={isSmallerThan720 ? 0 : 20} pr={isSmallerThan720 ? 0 : 20}>
      {console.log("docccccc", docs)}
      <div className='row'>
        {docs &&
          docImageData?.map((doc) => (
            <Image
              doc={doc}
              setSelectedImg={setSelectedImg}
              isAdmin={isAdmin}
              key={doc.id}
            />
          ))}
      </div>
    </Box>
  );
};

export default ImageGrid;
