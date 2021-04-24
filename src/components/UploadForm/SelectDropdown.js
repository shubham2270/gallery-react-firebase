import React from "react";
import { Select } from "@chakra-ui/react";

import { artTypes } from "../../constants/artTypes";

const SelectDropdown = ({ setImageData, index, imageData, selectedImage }) => {
  const handleDropdownChange = (e) => {
    let copyImageData = imageData;
    imageData.map((item, i) => {
      // change only clicked dropdown data in state
      if (i === index) {
        return (copyImageData[index].type = e.target.value);
      }
    });
    setImageData(copyImageData);
  };

  return (
    <Select
      placeholder='Select art type'
      size='sm'
      onChange={(e) => handleDropdownChange(e)}
      isRequired
      value={selectedImage.type}
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
