import React from "react";
import { Flex, Heading, Spacer, Text, Avatar } from "@chakra-ui/react";
import { motion } from "framer-motion";

import SignIn from "./SignIn";

const MotionText = motion(Text);
const MotionAvatar = motion(Avatar);

const NavBar = ({ userData }) => {
  return (
    <Flex p={4}>
      <Heading
        as='h6'
        size='md'
        color='black'
        display='flex'
        alignItems='center'
        fontFamily='Nunito'
      >
        Sneha's gallery
      </Heading>
      <Spacer />
      {userData && (
        <MotionAvatar
          src={userData.photoURL}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 1.5 }}
          mr='12px'
        />
      )}
      <Flex alignItems='center'>
        {userData && (
          <MotionText
            fontSize='1.2rem'
            pr='15px'
            initial={{ x: 1000, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 1.5 }}
          >
            Hi, {userData.displayName}
          </MotionText>
        )}
        <SignIn />
      </Flex>
    </Flex>
  );
};

export default NavBar;
