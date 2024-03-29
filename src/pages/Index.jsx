import React, { useState, useEffect } from "react";
import { Box, Button, Container, FormControl, FormLabel, Heading, Image, Input, Stack, Textarea, useToast, HStack, IconButton, Text, VStack } from "@chakra-ui/react";
import { FaStar, FaRegStar, FaRegCommentDots, FaUpload } from "react-icons/fa";

const Index = () => {
  const toast = useToast();
  const [photoUrl, setPhotoUrl] = useState('https://images.unsplash.com/photo-1705443066928-737885fbc365?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxyYW5kb20lMjBuYXR1cmV8ZW58MHx8fHwxNzExNzIzOTM4fDA&ixlib=rb-4.0.3&q=80&w=1080');

  // Placeholder for user authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState([]);

  useEffect(() => {
   
   
   
  }, [photoUrl]);

  const handleRatePhoto = (selectedRating) => {
    setRating(selectedRating);
   
   
    toast({
      title: "Photo rated!",
      description: `You gave this photo ${selectedRating} star(s).`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleComment = (event) => {
    event.preventDefault();
    const commentText = event.target.comment.value;
   
   
    setComments([...comments, commentText]);
    event.target.reset();
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
        <HStack spacing={2}>
          {[1, 2, 3, 4, 5].map((value) => (
            <IconButton
              key={value}
              icon={rating >= value ? <FaStar /> : <FaRegStar />}
              onClick={() => handleRatePhoto(value)}
              variant="unstyled"
              size="lg"
              color="yellow.500"
            />
          ))}
        </HStack>
        {isAuthenticated && (
          <>
            <Button leftIcon={<FaRegCommentDots />} colorScheme="teal" onClick={handleComment}>
              Comment
            </Button>
            <Button leftIcon={<FaUpload />} colorScheme="blue" onClick={handleUpload}>
              Upload
            </Button>
          </>
        )}
      </Stack>
      <Box mb={6}>
        <Heading size="md" mb={4}>Comments</Heading>
        {comments.length === 0 ? (
          <Text>No comments yet.</Text>
        ) : (
          <VStack spacing={4} align="stretch">
            {comments.map((comment, index) => (
              <Box key={index} borderWidth={1} borderRadius="md" p={4}>
                <Text>{comment}</Text>
              </Box>
            ))}
          </VStack>
        )}
      </Box>

      {isAuthenticated && (
        <form onSubmit={handleComment}>
          <FormControl id="comment" mb={6}>
            <FormLabel>Leave a comment</FormLabel>
            <Textarea name="comment" placeholder="Write your comment here..." />
            <Button type="submit" mt={4} colorScheme="blue">
              Post Comment
            </Button>
          </FormControl>
        </form>
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
