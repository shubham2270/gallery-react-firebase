import React, { useState, useEffect } from "react";
import { auth, signInWithGoogle } from "../firebase/config";
import { Button } from "@material-ui/core";

const SignIn = ({ file, setFile }) => {
  const [userData, setUserData] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => setUserData(user));
  }, [setUserData]);

  return (
    <>
      {userData ? (
        <Button
          variant='contained'
          color='secondary'
          onClick={() => auth.signOut()}
        >
          Sign Out
        </Button>
      ) : (
        <Button variant='contained' color='primary' onClick={signInWithGoogle}>
          SignIn With Google
        </Button>
      )}
    </>
  );
};

export default SignIn;
