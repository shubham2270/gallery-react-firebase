import React, { memo } from "react";
import {
  Flex,
  Heading,
  Spacer,
  Text,
  Avatar,
  useMediaQuery,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

import SignIn from "./SignIn";

const MotionText = motion(Text);
const MotionAvatar = motion(Avatar);

const NavBar = ({ userData }) => {
  const [isSmallerThan720] = useMediaQuery("(max-width: 720px)");

  return (
    <Flex p={4}>
      <Heading
        as='h6'
        size={isSmallerThan720 ? "xs" : "md"}
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
          size={isSmallerThan720 ? "xs" : "md"}
        />
      )}
      <Flex
        alignItems={isSmallerThan720 ? "flex-end" : "center"}
        direction={isSmallerThan720 ? "column" : "row"}
      >
        {userData && (
          <MotionText
            fontSize={isSmallerThan720 ? "0.8rem" : "1.2rem"}
            p={isSmallerThan720 ? "0px 0px 3px 0px" : "0px 15px 0px 0px"}
            initial={{ x: 1000, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 1.5 }}
          >
            Hi, {userData.displayName}
          </MotionText>
        )}
        <SignIn isSmallerThan720={isSmallerThan720} />
      </Flex>
    </Flex>
  );
};

export default memo(NavBar);
