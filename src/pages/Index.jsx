import React, { useState } from "react";
import { Box, Button, Container, FormControl, FormLabel, Heading, Image, Input, Stack, Textarea, useToast } from "@chakra-ui/react";
import { FaHeart, FaRegCommentDots, FaUpload } from "react-icons/fa";

const Index = () => {
  const toast = useToast();
  const [photoUrl, setPhotoUrl] = useState('https://images.unsplash.com/photo-1705443066928-737885fbc365?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxyYW5kb20lMjBuYXR1cmV8ZW58MHx8fHwxNzExNzIzOTM4fDA&ixlib=rb-4.0.3&q=80&w=1080');

  // Placeholder for user authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleRatePhoto = () => {
    // Placeholder for rating a photo
    toast({
      title: "Photo rated!",
      description: "Thank you for your feedback.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleComment = () => {
    // Placeholder for commenting on a photo
    toast({
      title: "Comment posted!",
      description: "Your comment has been added.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleUpload = () => {
    // Placeholder for uploading a photo
    toast({
      title: "Photo uploaded!",
      description: "Your photo has been submitted for rating.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Container maxW="container.md" py={10}>
      <Heading mb={6}>Photo Rating Web App</Heading>
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" mb={6}>
        <Image src={photoUrl} alt="Random Photo" />
      </Box>
      <Stack spacing={4} direction="row" justify="center" mb={6}>
        <Button leftIcon={<FaHeart />} colorScheme="pink" onClick={handleRatePhoto}>
          Like
        </Button>
        {isAuthenticated && (
          <Button leftIcon={<FaRegCommentDots />} colorScheme="teal" onClick={handleComment}>
            Comment
          </Button>
        )}
        {isAuthenticated && (
          <Button leftIcon={<FaUpload />} colorScheme="blue" onClick={handleUpload}>
            Upload
          </Button>
        )}
      </Stack>
      {isAuthenticated && (
        <FormControl id="comment" mb={6}>
          <FormLabel>Leave a comment</FormLabel>
          <Textarea placeholder="Write your comment here..." />
          <Button mt={4} colorScheme="blue" onClick={handleComment}>
            Post Comment
          </Button>
        </FormControl>
      )}
      {!isAuthenticated && (
        <Box textAlign="center">
          <Button colorScheme="green" onClick={() => setIsAuthenticated(true)}>
            Log In / Sign Up
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default Index;
