import React from "react";
import { Heading, Text, Link } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

const Title = () => {
  return (
    <div className='title'>
      <Heading as='h6' size='md'>
        Sneha's gallery
      </Heading>
      <Heading as='h2' size='xl' color='black'>
        Sneha Gupta Art & Paintings
      </Heading>
      <Text fontSize='xl'>
        Learn these drawings/paintings from basic to advanced in{" "}
        <Link
          color='teal.500'
          isExternal
          target='_blank'
          href='https://www.youtube.com/channel/UCM-Xo1DRAj7BjQFSTBm74zQ'
        >
          Kids Art Creation <ExternalLinkIcon mx='1px' />
        </Link>{" "}
        Youtube channel
      </Text>
    </div>
  );
};

export default Title;
