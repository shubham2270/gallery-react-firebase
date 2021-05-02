import React from "react";
import { Box, Flex, Text, Heading } from "@chakra-ui/react";
import "@lottiefiles/lottie-player";
import { motion } from "framer-motion";

const MotionHeading = motion(Heading);
const MotionText = motion(Text);

const NoResult = () => {
  return (
    <Flex
      w='100%'
      h='100%'
      justifyContent='center'
      alignItems='center'
      justifySelf='center'
    >
      <Flex justifyContent='center' direction='column'>
        <MotionHeading
          textAlign='center'
          fontFamily='Nunito'
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
        >
          No paintings found!
        </MotionHeading>
        <MotionText
          textAlign='center'
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1, type: "spring" }}
          color='b.dark'
        >
          Try changing filters or clear filter
        </MotionText>

        <lottie-player
          autoplay
          loop
          mode='normal'
          src='https://assets5.lottiefiles.com/packages/lf20_QqBMf0.json'
          style={{ width: "320px" }}
        ></lottie-player>
      </Flex>
    </Flex>
  );
};

export default NoResult;
