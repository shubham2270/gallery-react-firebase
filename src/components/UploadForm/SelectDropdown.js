import React from "react";
import { Select } from "@chakra-ui/react";

import { artTypes } from "../../constants/artTypes";

const SelectDropdown = ({ setArtType }) => {
  const handleDropdownChange = (e) => {
    setArtType(e.target.value);
  };

  return (
    <Select
      placeholder='Select art type'
      size='sm'
      onChange={(e) => handleDropdownChange(e)}
      isRequired
    >
      {artTypes.map((type) => {
        const { value } = type;
        return (
          <option value={value} key={value}>
            {value}
          </option>
        );
      })}
    </Select>
  );
};

export default SelectDropdown;
