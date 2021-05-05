import React, { useEffect, useCallback, memo } from "react";
import {
  Checkbox,
  useMediaQuery,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  IconButton,
} from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";

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
  const handleCheckbox = useCallback(
    (event) => {
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
    },
    [setLevelFilter, levelFilter]
  );

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
      <Menu variant='outline'>
        <MenuButton
          as={IconButton}
          aria-label='Filters'
          icon={<HamburgerIcon />}
          background='y.light'
        />
        <MenuList>
          <MenuGroup title='Filter by color used:' color='b.light'>
            {typeFilter.map((type) => {
              const { value } = type;
              return (
                <MenuItem closeOnSelect={false} key={value}>
                  <Checkbox
                    width={150}
                    onChange={(event) => handleTypeCheckbox(event)}
                    value={value}
                    isChecked={type.isChecked}
                  >
                    {value}
                  </Checkbox>
                </MenuItem>
              );
            })}
          </MenuGroup>
          <MenuGroup title='Filter by difficulty level:' color='b.light'>
            {levelFilter.map((filter) => {
              const { value, isChecked } = filter;
              return (
                <MenuItem closeOnSelect={false} key={value}>
                  <Checkbox
                    onChange={(event) => handleCheckbox(event)}
                    value={value}
                    key={value}
                    isChecked={isChecked}
                    textTransform='capitalize'
                  >
                    {value}
                  </Checkbox>
                </MenuItem>
              );
            })}
          </MenuGroup>
          {filters.length > 0 && (
            <MenuItem>
              <Button
                onClick={resetFilters}
                size='xs'
                colorScheme='red'
                leftIcon={<CloseIcon w={2} h={2} />}
              >
                Clear Filter
              </Button>
            </MenuItem>
          )}
        </MenuList>
      </Menu>
    </>
  );
};

export default memo(Filters);
