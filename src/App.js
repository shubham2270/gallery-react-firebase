import React, { useState, useEffect, createContext } from "react";
import {
  Box,
  useMediaQuery,
  Divider,
  Flex,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

import Title from "./components/Title";
import ImageGrid from "./components/ImageGrid";
import Modal from "./components/Modal";
import { auth } from "./firebase/config";
import NavBar from "./components/Navbar";
import Filters from "./components/Filters";
import useFirestore from "./hooks/useFirestore";
import { artTypes } from "./constants/artTypes";
import { levelTypes } from "./constants/levelTypes";
import UploadFormModal from "./components/UploadForm/UploadFormModal";

function App() {
  const { docs } = useFirestore("images");
  const [isSmallerThan720] = useMediaQuery("(max-width: 720px)");
  const [selectedImg, setSelectedImg] = useState(null);
  const [userData, setUserData] = useState("");
  const [levelFilter, setLevelFilter] = useState([]); // Manage difficulty level filter
  const [typeFilter, setTypeFilter] = useState([]); // Manage art type filter
  const [filters, setFilters] = useState([]); // stores all applied filters
  const [docImageData, setDocImageData] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

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
      <isAdminContext.Provider value={isAdmin}>
        <UploadFormModal isOpen={isOpen} onClose={onClose} isAdmin={isAdmin} />
        <NavBar userData={userData} />
        <Box w='100%' p={isSmallerThan720 ? 5 : 10}>
          <Title />
          <Divider mb={5} pt={5} />
          <Flex
            direction={isSmallerThan720 ? "column" : "row"}
            justifyContent='space-between'
          >
            <div
              style={{
                position: "fixed",
                top: isSmallerThan720 ? "50px" : "100px",
                left: isSmallerThan720 ? "-3px" : "",
                zIndex: "10",
              }}
            >
              <Filters
                levelFilter={levelFilter}
                setLevelFilter={setLevelFilter}
                typeFilter={typeFilter}
                setTypeFilter={setTypeFilter}
                filters={filters}
                setFilters={setFilters}
                docImageData={docImageData}
              />
            </div>

            {isAdmin && (
              <Button
                background='y.light'
                _hover={{ bg: "y.dark" }}
                onClick={onOpen}
              >
                Upload New Art
              </Button>
            )}
          </Flex>
          <Divider pt={5} />
          <ImageGrid
            setSelectedImg={setSelectedImg}
            levelFilter={levelFilter}
            typeFilter={typeFilter}
            docs={docs}
            filters={filters}
            setFilters={setFilters}
            docImageData={docImageData}
            setDocImageData={setDocImageData}
          />
          {selectedImg && (
            <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
          )}
        </Box>
      </isAdminContext.Provider>
    </>
  );
}

export const isAdminContext = createContext(false);
export default App;
