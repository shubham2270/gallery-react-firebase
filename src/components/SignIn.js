import React, { useState, useEffect } from "react";
import { auth, signInWithGoogle } from "../firebase/config";

const SignIn = ({ file, setFile }) => {
  const [userData, setUserData] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => setUserData(user));
  }, [setUserData]);

  console.log("------------", userData);

  return (
    <>
      {userData ? (
        <button onClick={() => auth.signOut()}>Sign Out</button>
      ) : (
        <button onClick={signInWithGoogle}>SignIn With Google</button>
      )}
    </>
  );
};

export default SignIn;
