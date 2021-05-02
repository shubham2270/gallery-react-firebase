import React, { useState, useEffect, createContext } from "react";
import {
  Modal as ChakaraModal,
  Box,
  useMediaQuery,
  Divider,
  Flex,
  Button,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
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
  const [levelFilter, setLevelFilter] = useState([]); // Manage difficulty level filter
  const [typeFilter, setTypeFilter] = useState([]); // Manage art type filter
  const [filters, setFilters] = useState([]); // stores all applied filters
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
        <ChakaraModal
          isCentered
          onClose={onClose}
          isOpen={isOpen}
          motionPreset='slideInBottom'
        >
          <ModalOverlay />
          <ModalContent overflow='hidden' maxW={400}>
            <ModalHeader>Upload Art</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {isAdmin && <UploadForm closeUploadModal={onClose} />}
            </ModalBody>
            {/* <ModalFooter /> */}
          </ModalContent>
        </ChakaraModal>
        <NavBar userData={userData} />
        <Box w='100%' p={isSmallerThan720 ? 5 : 10}>
          <Title />
          <Divider mb={5} pt={5} />
          <Flex
            direction={isSmallerThan720 ? "column" : "row"}
            // bg='red'
            justifyContent='space-between'
          >
            <Filters
              levelFilter={levelFilter}
              typeFilter={typeFilter}
              setTypeFilter={setTypeFilter}
              setLevelFilter={setLevelFilter}
              filters={filters}
              setFilters={setFilters}
            />

            <lottie-player
              autoplay
              loop
              mode='normal'
              src='https://assets5.lottiefiles.com/packages/lf20_lcmz7vzg.json'
              style={{ width: "320px" }}
            ></lottie-player>
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
