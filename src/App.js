import React, { useState, useEffect } from "react";
import { Box, useMediaQuery, Divider } from "@chakra-ui/react";

import Title from "./components/Title";
import UploadForm from "./components/UploadForm";
import ImageGrid from "./components/ImageGrid";
import Modal from "./components/Modal";
import { auth } from "./firebase/config";
import NavBar from "./components/Navbar";
import Filters from "./components/Filters";
import useFirestore from "./hooks/useFirestore";

function App() {
  const { docs } = useFirestore("images");
  const [isSmallerThan720] = useMediaQuery("(max-width: 720px)");
  const [selectedImg, setSelectedImg] = useState(null);
  const [userData, setUserData] = useState("");
  const [levelFilter, setLevelFilter] = useState([
    {
      value: "advance",
      isChecked: false,
    },
    {
      value: "basic",
      isChecked: false,
    },
  ]);
  const [typeFilter, setTypeFilter] = useState([]);

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
        <Divider mb={5} pt={5} />
        <Filters
          levelFilter={levelFilter}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          setLevelFilter={setLevelFilter}
        />
        {isAdmin && <UploadForm />}
        <Divider pt={5} />
        <ImageGrid
          setSelectedImg={setSelectedImg}
          isAdmin={isAdmin}
          levelFilter={levelFilter}
          docs={docs}
        />
        {selectedImg && (
          <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
        )}
      </Box>
    </>
  );
}

export default App;
