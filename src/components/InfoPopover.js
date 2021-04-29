import React, { useState, useEffect, useContext } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  //   PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Tag,
  TagLabel,
  Flex,
  Text,
} from "@chakra-ui/react";
import { InfoIcon, EditIcon } from "@chakra-ui/icons";
import SelectDropdown from "./UploadForm/SelectDropdown";
import RadioButtons from "./UploadForm/RadioButtons";
import { isAdminContext } from "../App";

// This a component in same file
const ImageInfoItem = ({
  name,
  isType,
  type,
  level,
  info,
  cancelEdit,
  isPopClose,
  docId,
}) => {
  const [editing, setEditing] = useState(false);

  const isAdmin = useContext(isAdminContext);

  const handleEdit = (name) => {
    info.map((item) => {
      if (name === item.name) {
        setEditing((prevState) => !prevState);
      }
    });
  };

  useEffect(() => {
    if (isPopClose) {
      setEditing(false);
    }
  }, [isPopClose]);

  return (
    <Flex pb={2}>
      <Text as='b' fontSize='sm' width='5em'>
        {name}
      </Text>
      <Flex justifyContent='space-between' w={180}>
        {editing && isType && (
          <SelectDropdown isEdit id={docId} setEditing={setEditing} />
        )}
        {editing && !isType && (
          <RadioButtons
            level={level}
            isEdit
            id={docId}
            setEditing={setEditing}
          />
        )}
        {!editing && (
          <Tag
            size='sm'
            borderRadius='md'
            colorScheme={isType ? "teal" : "red"}
            variant='subtle'
            height='70%'
            pl={1}
            pr={1}
            border='2px solid'
            borderColor={isType ? "g.light" : "r.light"}
            justifySelf='left'
          >
            <TagLabel el fontWeight='bold' textTransform='capitalize'>
              {isType ? type : level}
            </TagLabel>
          </Tag>
        )}
        {/* Edit icon */}
        {isAdmin && (
          <EditIcon
            ml={5}
            color='b.light'
            cursor='pointer'
            onClick={() => handleEdit(name)}
          />
        )}
      </Flex>
    </Flex>
  );
};

const InfoPopover = ({ level, type, docId }) => {
  const [isPopClose, setIsPopClose] = useState(false);
  const info = [
    {
      name: "Art type",
    },
    {
      name: "Difficulty",
    },
  ];

  return (
    <Popover
      placement='top-start'
      onClose={() => setIsPopClose(true)}
      onOpen={() => setIsPopClose(false)}
    >
      <PopoverTrigger>
        <InfoIcon w={5} h={5} color='y.light' ml={1} mr={3} />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Info</PopoverHeader>
        <PopoverBody>
          <Flex justifyContent='space-between' direction='column'>
            {info.map((item) => {
              const { name } = item;
              const isType = name === "Art type";
              return (
                <ImageInfoItem
                  key={name}
                  name={name}
                  isType={isType}
                  level={level}
                  type={type}
                  info={info}
                  isPopClose={isPopClose}
                  docId={docId}
                />
                // <Flex pb={2}>
                //   <Text as='b' fontSize='sm' width='5em'>
                //     {name}
                //   </Text>
                //   <Flex justifyContent='space-between' w={180}>
                //     {editing && <SelectDropdown />}
                //     <Tag
                //       size='sm'
                //       borderRadius='md'
                //       colorScheme={isType ? "teal" : "red"}
                //       variant='subtle'
                //       height='70%'
                //       pl={1}
                //       pr={1}
                //       border='2px solid'
                //       borderColor={isType ? "g.light" : "r.light"}
                //       justifySelf='left'
                //     >
                //       <TagLabel fontWeight='bold' textTransform='capitalize'>
                //         {isType ? type : level}
                //       </TagLabel>
                //     </Tag>
                //     {/* Edit icon */}
                //     <EditIcon
                //       ml={5}
                //       color='b.light'
                //       cursor='pointer'
                //       onClick={() => handleEdit(name)}
                //     />
                //   </Flex>
                // </Flex>
              );
            })}
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default InfoPopover;

// InfoIcon
