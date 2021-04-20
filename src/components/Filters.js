import React, { useState, useEffect, useCallback } from "react";
import {
  Checkbox,
  Stack,
  Heading,
  Box,
  Flex,
  Divider,
  Center,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";

import { artTypes } from "../constants/artTypes";

const Filters = () => {
  const [filterList, setFilterList] = useState([
    {
      value: "Basic",
      isChecked: false,
    },
    {
      value: "Advance",
      isChecked: false,
    },
  ]);
  const [typeFilter, setTypeFilter] = useState([]);

  useEffect(() => {
    setTypeFilter(artTypes);
  }, [setTypeFilter]);

  // Handle difficulty level checkbox filter
  const handleCheckbox = useCallback(
    (event) => {
      const { value, checked } = event.target;
      let filters = filterList;
      filters.forEach((filter) => {
        if (filter.value === value) filter.isChecked = checked;
      });
      setFilterList(filters);
    },
    [filterList, setFilterList]
  );

  //  handle art type checkbox
  const handleTypeCheckbox = useCallback(
    (event) => {
      const { value, checked } = event.target;
      let filters = typeFilter;
      filters.forEach((filter) => {
        if (filter.value === value) filter.isChecked = checked;
      });
      setTypeFilter(filters);
    },
    [typeFilter, setTypeFilter]
  );

  return (
    <>
      <Flex w={750} justifyContent='space-between'>
        <Box>
          <Heading pb={2} as='h6' size='xs' color='teal'>
            Filter by difficulty level:
          </Heading>
          <Stack spacing={6} direction='row'>
            {filterList.map((filter) => {
              return (
                <Checkbox
                  onChange={(event) => handleCheckbox(event)}
                  value={filter.value}
                  key={filter.value}
                >
                  {filter.value}
                </Checkbox>
              );
            })}
          </Stack>
        </Box>
        <Center height='50px'>
          <Divider orientation='vertical' />
        </Center>
        <Box>
          <Heading pb={2} as='h6' size='xs' color='teal'>
            Filter by art type:
          </Heading>
          <Stack spacing={1} direction='row' width='500px' height='100px'>
            <Wrap>
              {typeFilter.map((type) => {
                const { value } = type;
                return (
                  <WrapItem key={value}>
                    <Center>
                      <Checkbox
                        width={150}
                        onChange={(event) => handleTypeCheckbox(event)}
                        value={value}
                      >
                        {value}
                      </Checkbox>
                    </Center>
                  </WrapItem>
                );
              })}
            </Wrap>
          </Stack>
        </Box>
      </Flex>
    </>
  );
};

export default Filters;