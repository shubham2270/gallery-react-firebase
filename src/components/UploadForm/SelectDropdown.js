import React from "react";
import produce from "immer";
import { Select } from "@chakra-ui/react";

import { artTypes } from "../../constants/artTypes";

const SelectDropdown = ({ setImageData, index, imageData, selectedImage }) => {
  const handleDropdownChange = (e) => {
    e.persist();
    imageData.map((item, i) => {
      // change only clicked dropdown data in state
      setImageData(
        produce((draft) => {
          if (i === index) {
            draft[index].type = e.target.value;
          }
        })
      );
    });
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
