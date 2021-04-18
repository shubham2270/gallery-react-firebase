import React, { useState, useEffect } from "react";
import { auth, signInWithGoogle } from "../firebase/config";
import { Button } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

const SignIn = ({ file, setFile }) => {
  const [userData, setUserData] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => setUserData(user));
  }, [setUserData]);

  return (
    <>
      {userData ? (
        <Button
          variant='solid'
          colorScheme='teal'
          onClick={() => auth.signOut()}
        >
          Sign Out
        </Button>
      ) : (
        <Button variant='solid' colorScheme='purple' onClick={signInWithGoogle}>
          SignIn With Google
        </Button>
      )}
    </>
  );
};

export default SignIn;
