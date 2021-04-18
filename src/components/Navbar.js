import React from "react";
import { Flex, Heading, Spacer } from "@chakra-ui/react";
import SignIn from "./SignIn";

const NavBar = () => {
  return (
    <Flex p={4}>
      <Heading
        as='h6'
        size='md'
        color='black'
        display='flex'
        alignItems='center'
      >
        Sneha's gallery
      </Heading>
      <Spacer />
      <SignIn />
    </Flex>
  );
};

export default NavBar;
