import React, { memo } from "react";
import {
  Heading,
  Text,
  Link,
  Box,
  Center,
  useMediaQuery,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

const Title = () => {
  const [isSmallerThan720] = useMediaQuery("(max-width: 720px)");
  return (
    <Box className='title'>
      <Center>
        <Heading
          as='h2'
          size={isSmallerThan720 ? "md" : "xl"}
          color='black'
          fontFamily='Nunito'
        >
          Sneha Art & Paintings
        </Heading>
      </Center>
      <Center>
        <Text fontSize={isSmallerThan720 ? "md" : "lg"}>
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
      </Center>
    </Box>
  );
};

export default memo(Title);
