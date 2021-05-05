import React, { useState, useEffect, createContext } from "react";
import {
  Modal as ChakaraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Button,
} from "@chakra-ui/react";

import UploadForm from "./index";
import useStorage from "../../hooks/useStorage";

const UploadFormModal = ({ isOpen, onClose, isAdmin }) => {
  const { uploadToFirebase, uploadCompleted, progress } = useStorage();

  const [uploading, setUploading] = useState(false);
  const [disableUploadBtn, setDisableUploadBtn] = useState(true);
  const [imageData, setImageData] = useState([]);

  const handleImageUpload = () => {
    setUploading(true);
    uploadToFirebase(imageData, "upload");
  };

  // clear selected image on modal close
  useEffect(() => {
    if (!isOpen) {
      setImageData([]);
    }
  }, [isOpen, setImageData]);

  return (
    <ChakaraModal
      // isCentered
      onClose={onClose}
      isOpen={isOpen}
      scrollBehavior='outside'
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Upload Art</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {isAdmin && (
            <UploadForm
              closeUploadModal={onClose}
              uploading={uploading}
              setUploading={setUploading}
              uploadToFirebase={uploadToFirebase}
              uploadCompleted={uploadCompleted}
              progress={progress}
              disableUploadBtn={disableUploadBtn}
              setDisableUploadBtn={setDisableUploadBtn}
              imageData={imageData}
              setImageData={setImageData}
            />
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme='green'
            _hover={{ background: "g.dark" }}
            _disabled={{ opacity: "0.3", cursor: "not-allowed" }}
            background='g.light'
            size='md'
            mt={6}
            onClick={handleImageUpload}
            disabled={uploading || disableUploadBtn}
          >
            {"Upload"}
          </Button>
          {/* </Flex> */}
        </ModalFooter>
      </ModalContent>
    </ChakaraModal>
  );
};

export default UploadFormModal;
