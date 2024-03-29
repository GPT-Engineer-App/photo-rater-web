import React from "react";
import { Box, Flex, Spacer, Link, Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";

const Navbar = ({ isAuthenticated, onLogin, onLogout, username }) => {
  return (
    <Box bg="gray.100" py={4}>
      <Flex maxW="container.lg" mx="auto" align="center">
        <Box>
          <Link href="/" fontWeight="bold" fontSize="xl">
            Photo Rating App
          </Link>
        </Box>
        <Spacer />
        <Box>
          {isAuthenticated ? (
            <Menu>
              <MenuButton as={Button} colorScheme="blue">
                {username}
              </MenuButton>
              <MenuList>
                <MenuItem>Link 1</MenuItem>
                <MenuItem>Link 2</MenuItem>
                <MenuItem>Link 3</MenuItem>
                <MenuItem>Link 4</MenuItem>
                <MenuItem onClick={onLogout}>Log Out</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Button colorScheme="green" onClick={onLogin}>
              Log In / Sign Up
            </Button>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;
