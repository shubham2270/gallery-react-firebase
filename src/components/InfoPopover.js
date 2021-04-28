import React from "react";
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
import { InfoIcon } from "@chakra-ui/icons";

const InfoPopover = ({ level, type }) => {
  return (
    <Popover placement='top-start'>
      <PopoverTrigger>
        <InfoIcon w={5} h={5} color='y.light' ml={1} mr={3} />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Info</PopoverHeader>
        <PopoverBody>
          <Flex justifyContent='space-between' direction='column'>
            <Flex pb={2}>
              <Text as='b' fontSize='sm' pr={3}>
                Art type:{" "}
              </Text>
              <Tag
                size='sm'
                borderRadius='md'
                colorScheme='teal'
                variant='subtle'
                height='70%'
                pl={1}
                pr={1}
                border='2px solid'
                borderColor='g.light'
                justifySelf='left'
              >
                <TagLabel fontWeight='bold'>{type}</TagLabel>
              </Tag>
            </Flex>
            <Flex>
              <Text as='b' fontSize='sm' pr={3}>
                Difficulty:{" "}
              </Text>
              <Tag
                size='sm'
                borderRadius='md'
                colorScheme='red'
                variant='subtle'
                height='70%'
                pl={1}
                pr={1}
                border='2px solid'
                borderColor='r.light'
                justifySelf='left'
              >
                <TagLabel fontWeight='bold' textTransform='capitalize'>
                  {level}
                </TagLabel>
              </Tag>
            </Flex>
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default InfoPopover;

// InfoIcon
