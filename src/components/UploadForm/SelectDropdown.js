import React from "react";
import { Select } from "@chakra-ui/react";

const SelectDropdown = ({ setArtType }) => {
  const handleDropdownChange = (e) => {
    setArtType(e.target.value);
  };

  return (
    <Select
      placeholder='Select art type'
      size='sm'
      onChange={(e) => handleDropdownChange(e)}
    >
      <option value='Water Color'>Water Color</option>
      <option value='Oil Pastel Sketch'>Oil Pastel Sketch</option>
      <option value='Colored Pencil'>Colored Pencil</option>
      <option value='Pencil Drawings'>Pencil Drawings</option>
      <option value='Acrylic Paintings'>Acrylic Paintings</option>
      <option value='Oil Paintings'>Oil Paintings</option>
      <option value='Others'>Others</option>
    </Select>
  );
};

export default SelectDropdown;
