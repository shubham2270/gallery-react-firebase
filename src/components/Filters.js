import React, { useEffect, useCallback } from "react";
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
  useMediaQuery,
  Button,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

import { artTypes } from "../constants/artTypes";
import { levelTypes } from "../constants/levelTypes";

const Filters = ({
  levelFilter,
  typeFilter,
  setTypeFilter,
  setLevelFilter,
  setFilters,
  filters,
}) => {
  const [isSmallerThan720] = useMediaQuery("(max-width: 720px)");
  useEffect(() => {
    setTypeFilter(artTypes);
  }, [setTypeFilter]);

  // Handle difficulty level checkbox filter
  const handleCheckbox = (event) => {
    const { value, checked } = event.target;
    let filters = levelFilter;
    const newFilters = filters.map((filter) => {
      if (filter.value === value) {
        return { ...filter, isChecked: checked };
      } else {
        return filter;
      }
    });
    setLevelFilter(newFilters);
  };

  //  handle art type checkbox
  const handleTypeCheckbox = useCallback(
    (event) => {
      const { value, checked } = event.target;
      let filters = typeFilter;
      const newFilters = filters.map((filter) => {
        if (filter.value === value) {
          return { ...filter, isChecked: checked };
        } else {
          return filter;
        }
      });
      setTypeFilter(newFilters);
    },
    [typeFilter, setTypeFilter]
  );

  // Reset filters on clicking reset
  const resetFilters = () => {
    setLevelFilter(levelTypes);
    setTypeFilter(artTypes);
    setFilters([]);
  };

  return (
    <>
      <Flex
        w={isSmallerThan720 ? 200 : 820}
        justifyContent='space-between'
        direction={isSmallerThan720 ? "column" : "row"}
      >
        <Box>
          <Heading pb={2} as='h6' size='xs' color='teal' wordWrap='normal'>
            Filter by difficulty level:
          </Heading>
          <Stack spacing={6} direction='row'>
            {levelFilter.map((filter) => {
              return (
                <Checkbox
                  onChange={(event) => handleCheckbox(event)}
                  value={filter.value}
                  key={filter.value}
                  isChecked={filter.isChecked}
                >
                  {filter.value}
                </Checkbox>
              );
            })}
          </Stack>
        </Box>
        <Center height='50px'>
          <Divider orientation={isSmallerThan720 ? "horizontal" : "vertical"} />
        </Center>
        <Box>
          <Heading pb={2} as='h6' size='xs' color='teal'>
            Filter by art type:
          </Heading>
          <Stack
            spacing={1}
            direction={isSmallerThan720 ? "column" : "row"}
            width={isSmallerThan720 ? "300px" : "500px"}
          >
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
                        isChecked={type.isChecked}
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
        <Box pt={isSmallerThan720 ? 5 : 0} pb={5} w={94} h={24}>
          {filters.length > 0 && (
            <Button
              onClick={resetFilters}
              size='xs'
              colorScheme='red'
              leftIcon={<CloseIcon w={2} h={2} />}
            >
              Clear Filter
            </Button>
          )}
        </Box>
      </Flex>
    </>
  );
};

export default Filters;
