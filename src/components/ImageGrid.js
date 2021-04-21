import React, { useState, useEffect } from "react";
import * as R from "ramda";
import useFirestore from "../hooks/useFirestore";
import { Box, useMediaQuery } from "@chakra-ui/react";

// import useWindowSize from "../hooks/useWindowSize";

import Image from "./Image";

const ImageGrid = ({ setSelectedImg, isAdmin, filterList, levelFilter }) => {
  const [docImageData, setDocImageData] = useState([]);
  const [isSmallerThan720] = useMediaQuery("(max-width: 720px)");
  const { docs } = useFirestore("images");

  // Check if filter is applied or not
  const isAdvance = levelFilter[0].isChecked;
  const isBasics = levelFilter[1].isChecked;

  // Filters out object from array that contains provided value;
  const filterImageData = (val) =>
    R.filter(R.compose(R.any(R.contains(val)), R.values));

  useEffect(() => {
    const filterByAdvance = filterImageData("advance")(docs);
    const filterByBasic = filterImageData("basic")(docs);

    setDocImageData(
      isAdvance && !isBasics
        ? filterByAdvance
        : isBasics && !isAdvance
        ? filterByBasic
        : docs
    );
  }, [docs, isBasics, isAdvance]);

  useEffect(() => {
    setDocImageData(docs);
  }, [docs, setDocImageData]);

  return (
    <Box p={10} pl={isSmallerThan720 ? 0 : 20} pr={isSmallerThan720 ? 0 : 20}>
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
