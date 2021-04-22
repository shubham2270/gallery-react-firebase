import React, { useState, useEffect } from "react";
import * as R from "ramda";
import useFirestore from "../hooks/useFirestore";
import { Box, useMediaQuery } from "@chakra-ui/react";

// import useWindowSize from "../hooks/useWindowSize";

import Image from "./Image";

const ImageGrid = ({
  setSelectedImg,
  isAdmin,
  filterList,
  levelFilter,
  typeFilter,
  filters,
  setFilters,
}) => {
  const [docImageData, setDocImageData] = useState([]);

  const [isSmallerThan720] = useMediaQuery("(max-width: 720px)");
  const { docs } = useFirestore("images");

  // Filters out object from array that contains provided value;
  const filterImageData = (val) =>
    R.filter(R.compose(R.any(R.contains(val)), R.values));

  // Store  applied filter in filters array & remove if not applied
  useEffect(() => {
    const allFilters = [...levelFilter, ...typeFilter];
    allFilters.map((levelItem) => {
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
  }, [levelFilter, typeFilter]);

  // Update docs based on filter applied
  useEffect(() => {
    let filteredDocs = [];
    filters.map((filterItem) => {
      filteredDocs = [...filteredDocs, ...filterImageData(filterItem)(docs)];
    });
    setDocImageData(R.uniq(filteredDocs));

    // display all images if no filter applied
    if (filteredDocs.length < 1) {
      setDocImageData(docs);
    }
  }, [docs, filters]);

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
