import React from "react";
import { Box, Flex, Text, Button, Menu, MenuButton, MenuList, MenuItem, IconButton } from "@chakra-ui/react";
import { FaUserCircle } from "react-icons/fa";

const Navbar = ({ user, onLogin, onSignup, onLogout, setIsModalOpen }) => {
  return (
    <Flex bg="gray.100" p={4} justifyContent="space-between" alignItems="center">
      <Box>
        <Text fontSize="lg" fontWeight="bold">
          PhotoRate
        </Text>
      </Box>
      <Box>
        {user ? (
          <Menu>
            <MenuButton as={IconButton} icon={<FaUserCircle />} variant="outline" aria-label="Options" />
            <MenuList>
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Uploads</MenuItem>
              <MenuItem onClick={onLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Button colorScheme="blue" onClick={() => setIsModalOpen(true)}>
            Login / Sign Up
          </Button>
        )}
      </Box>
    </Flex>
  );
};

export default Navbar;
