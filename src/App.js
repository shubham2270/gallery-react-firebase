import React, { useState, useEffect } from "react";
import { Box, useMediaQuery, Divider, Flex } from "@chakra-ui/react";
import "@lottiefiles/lottie-player";

import Title from "./components/Title";
import UploadForm from "./components/UploadForm";
import ImageGrid from "./components/ImageGrid";
import Modal from "./components/Modal";
import { auth } from "./firebase/config";
import NavBar from "./components/Navbar";
import Filters from "./components/Filters";
import useFirestore from "./hooks/useFirestore";
import { artTypes } from "./constants/artTypes";
import { levelTypes } from "./constants/levelTypes";

function App() {
  const { docs } = useFirestore("images");
  const [isSmallerThan720] = useMediaQuery("(max-width: 720px)");
  const [selectedImg, setSelectedImg] = useState(null);
  const [userData, setUserData] = useState("");
  const [levelFilter, setLevelFilter] = useState([]);
  const [typeFilter, setTypeFilter] = useState([]);
  const [filters, setFilters] = useState([]);

  const adminEmails = ["shubham2270@gmail.com", "guptasneha.sg53@gmail.com"];

  const isAdmin = adminEmails.includes(userData?.email);

  useEffect(() => {
    setTypeFilter(artTypes);
    setLevelFilter(levelTypes);
  }, [setTypeFilter, setLevelFilter]);

  useEffect(() => {
    auth.onAuthStateChanged((user) => setUserData(user));
  }, [setUserData]);

  return (
    <>
      <NavBar />
      <Box w='100%' p={isSmallerThan720 ? 5 : 10}>
        <Title />
        <Divider mb={5} pt={5} />
        <Flex direction={isSmallerThan720 ? "column" : "row"}>
          <Filters
            levelFilter={levelFilter}
            typeFilter={typeFilter}
            setTypeFilter={setTypeFilter}
            setLevelFilter={setLevelFilter}
            filters={filters}
            setFilters={setFilters}
          />
          {isAdmin && <UploadForm />}
          <lottie-player
            autoplay
            loop
            mode='normal'
            src='https://assets5.lottiefiles.com/packages/lf20_lcmz7vzg.json'
            style={{ width: "320px" }}
          ></lottie-player>
        </Flex>
        <Divider pt={5} />
        <ImageGrid
          setSelectedImg={setSelectedImg}
          isAdmin={isAdmin}
          levelFilter={levelFilter}
          typeFilter={typeFilter}
          docs={docs}
          filters={filters}
          setFilters={setFilters}
        />
        {selectedImg && (
          <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
        )}
      </Box>
    </>
  );
}

export default App;
