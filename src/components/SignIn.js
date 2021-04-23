import React, { useState, useEffect } from "react";
import { auth, signInWithGoogle } from "../firebase/config";
import { Button } from "@chakra-ui/react";

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
          background='r.light'
          _hover={{ bg: "r.dark" }}
          color='white'
          onClick={() => auth.signOut()}
        >
          Sign Out
        </Button>
      ) : (
        <Button
          background='g.light'
          color='white'
          _hover={{ bg: "g.dark" }}
          onClick={signInWithGoogle}
        >
          SignIn With Google
        </Button>
      )}
    </>
  );
};

export default SignIn;
