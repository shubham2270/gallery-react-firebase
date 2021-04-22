import React, { useState, useEffect } from "react";
import * as R from "ramda";
import useFirestore from "../hooks/useFirestore";
import { Box, useMediaQuery } from "@chakra-ui/react";

// import useWindowSize from "../hooks/useWindowSize";

import Image from "./Image";

const ImageGrid = ({ setSelectedImg, isAdmin, filterList, levelFilter }) => {
  const [docImageData, setDocImageData] = useState([]);
  const [filters, setFilters] = useState([]);
  const [isSmallerThan720] = useMediaQuery("(max-width: 720px)");
  const { docs } = useFirestore("images");

  // Check if filter is applied or not
  const isAdvance = levelFilter[0].isChecked;
  const isBasics = levelFilter[1].isChecked;

  // Filters out object from array that contains provided value;
  const filterImageData = (val) =>
    R.filter(R.compose(R.any(R.contains(val)), R.values));

  // Store applied filter in filters array & remove if not applied
  useEffect(() => {
    // const filterByAdvance = filterImageData("advance")(docs);
    // const filterByBasic = filterImageData("basic")(docs);
    // setDocImageData(
    //   isAdvance && !isBasics
    //     ? filterByAdvance
    //     : isBasics && !isAdvance
    //     ? filterByBasic
    //     : docs
    // );

    // --------------------------

    levelFilter.map((levelItem) => {
      // Push checked item to filters array
      if (levelItem.isChecked) {
        let applied = [...filters];
        // only push to array if item is not there
        if (!R.includes(levelItem.value, applied)) {
          applied.push(levelItem.value);
          setFilters([...applied]);
        }
      } else {
        // if not checked
        let applied = [...filters];
        // if filters is applied
        if (R.contains(levelItem.value, applied)) {
          let removedUnChecked = R.filter((item) => {
            return levelItem.value !== item;
          }, applied);
          setFilters([...removedUnChecked]);
        }
      }
    });
  }, [levelFilter]);

  // Update docs based on filter applied
  useEffect(() => {
    let filteredDocs = [];
    filters.map((filterItem) => {
      filteredDocs = [...filteredDocs, ...filterImageData(filterItem)(docs)];
    });
    setDocImageData(filteredDocs);

    // display all images if no filter applied
    if (filteredDocs.length < 1) {
      setDocImageData(docs);
    }
  }, [docs, filters]);

  return (
    <Box p={10} pl={isSmallerThan720 ? 0 : 20} pr={isSmallerThan720 ? 0 : 20}>
      {console.log("FILTERS>>>>>", filters)}
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
