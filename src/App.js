import React, { useState, useEffect } from "react";
import { Box, useMediaQuery } from "@chakra-ui/react";

import Title from "./components/Title";
import UploadForm from "./components/UploadForm";
import ImageGrid from "./components/ImageGrid";
import Modal from "./components/Modal";
import { auth } from "./firebase/config";
import NavBar from "./components/Navbar";

function App() {
  const [isSmallerThan720] = useMediaQuery("(max-width: 720px)");
  const [selectedImg, setSelectedImg] = useState(null);
  const [userData, setUserData] = useState("");

  const adminEmails = ["shubham2270@gmail.com", "guptasneha.sg53@gmail.com"];

  const isAdmin = adminEmails.includes(userData?.email);

  useEffect(() => {
    auth.onAuthStateChanged((user) => setUserData(user));
  }, [setUserData]);

  return (
    <>
      <NavBar />
      <Box w='100%' p={isSmallerThan720 ? 5 : 10}>
        <Title />
        {isAdmin && <UploadForm />}
        <ImageGrid setSelectedImg={setSelectedImg} isAdmin={isAdmin} />
        {selectedImg && (
          <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
        )}
      </Box>
    </>
  );
}

export default App;
