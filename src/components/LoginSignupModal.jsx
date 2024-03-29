import React from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, FormControl, FormLabel, Input, Button, Stack } from "@chakra-ui/react";

const LoginSignupModal = ({ isOpen, onClose, onLogin }) => {
  const handleLogin = (event) => {
    event.preventDefault();
    onLogin();
    onClose();
  };

  const handleSignup = (event) => {
    event.preventDefault();
    onLogin();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Log In / Sign Up</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleLogin}>
            <FormControl id="email" mb={4}>
              <FormLabel>Email address</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="password" mb={6}>
              <FormLabel>Password</FormLabel>
              <Input type="password" />
            </FormControl>
            <Button type="submit" colorScheme="blue" mb={4}>
              Log In
            </Button>
          </form>
          <form onSubmit={handleSignup}>
            <FormControl id="email" mb={4}>
              <FormLabel>Email address</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="password" mb={6}>
              <FormLabel>Password</FormLabel>
              <Input type="password" />
            </FormControl>
            <Button type="submit" colorScheme="green">
              Sign Up
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LoginSignupModal;
