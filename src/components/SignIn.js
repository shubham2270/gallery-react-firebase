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
          background='r'
          color='white'
          onClick={() => auth.signOut()}
        >
          Sign Out
        </Button>
      ) : (
        <Button background='g' color='white' onClick={signInWithGoogle}>
          SignIn With Google
        </Button>
      )}
    </>
  );
};

export default SignIn;
