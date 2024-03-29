import React from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@chakra-ui/react";

const AgeConfirmationModal = ({ isOpen, onConfirm }) => {
  return (
    <Modal isOpen={isOpen} onClose={() => {}}>
      <ModalOverlay bg="blackAlpha.700" backdropFilter="blur(10px)" />
      <ModalContent>
        <ModalHeader>Age Confirmation</ModalHeader>
        <ModalBody>
          <p>Please confirm that you are over 21 years old to proceed.</p>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={onConfirm}>
            I am over 21
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AgeConfirmationModal;
