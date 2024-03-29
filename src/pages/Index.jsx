import React, { useState, useEffect } from "react";
import { Box, Button, Container, FormControl, FormLabel, Heading, Image, Input, Stack, Textarea, useToast, HStack, IconButton, Text, VStack } from "@chakra-ui/react";
import AgeConfirmationModal from "../components/AgeConfirmationModal";
import { FaStar, FaRegStar, FaRegCommentDots, FaUpload } from "react-icons/fa";
import LoginSignupModal from "../components/LoginSignupModal";
import Navbar from "../components/Navbar";
// Assuming "@supabase/supabase-js" is correctly installed and the issue is with the build process

const createClient = window.Supabase.createClient;

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_API_KEY);

const Index = () => {
  const [isOverAge, setIsOverAge] = useState(false);
  const toast = useToast();
  const [photoUrl, setPhotoUrl] = useState("https://images.unsplash.com/photo-1705443066928-737885fbc365?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxyYW5kb20lMjBuYXR1cmV8ZW58MHx8fHwxNzExNzIzOTM4fDA&ixlib=rb-4.0.3&q=80&w=1080");

  const [user, setUser] = useState(null);
  const isAuthenticated = user !== null;
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => {
      authListener.unsubscribe();
    };
  }, []);

  const handleLogin = async (email, password) => {
    const { error } = await supabase.auth.signIn({ email, password });
    const currentUser = supabase.auth.user();
    if (!error && currentUser) {
      setUser(currentUser);
    }
    if (error) {
      toast({
        title: "Error logging in",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleSignup = async (email, password) => {
    const { error } = await supabase.auth.signUp({ email, password });
    const currentUser = supabase.auth.user();
    if (!error && currentUser) {
      setUser(currentUser);
    }
    if (error) {
      toast({
        title: "Error signing up",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setUser(null);
    }
  };

  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState([]);

  useEffect(() => {}, [photoUrl]);

  const handleRatePhoto = async (selectedRating) => {
    if (!isAuthenticated) {
      setIsModalOpen(true);
      return;
    }
    setRating(selectedRating);
    const { data, error } = await supabase.from("ratings").upsert({ photo_id: photoUrl, user_id: user.id, rating: selectedRating });

    toast({
      title: "Photo rated!",
      description: `You gave this photo ${selectedRating} star(s).`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleComment = async (event) => {
    event.preventDefault();
    if (!isAuthenticated) {
      setIsModalOpen(true);
      return;
    }
    const commentText = event.target.elements.comment.value;
    const { data, error } = await supabase.from("comments").insert({ photo_id: photoUrl, user_id: user.id, content: commentText });

    if (error) {
      toast({
        title: "Error posting comment",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      setComments([...comments, data[0]]);
    }
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

  useEffect(() => {
    const fetchRating = async () => {
      const { data, error } = await supabase.from("ratings").select("rating").eq("photo_id", photoUrl).eq("user_id", user?.id).single();

      if (data) setRating(data.rating);
    };

    const fetchComments = async () => {
      const { data, error } = await supabase.from("comments").select("*").eq("photo_id", photoUrl).order("created_at", { ascending: true });

      if (data) setComments(data);
    };

    if (isAuthenticated) {
      fetchRating();
      fetchComments();
    }
  }, [user, photoUrl]);

  return (
    <>
      <AgeConfirmationModal isOpen={!isOverAge} onConfirm={() => setIsOverAge(true)} />
      {isOverAge && (
        <>
          <Navbar user={user} isAuthenticated={isAuthenticated} onLogin={handleLogin} onSignup={handleSignup} onLogout={handleLogout} setIsModalOpen={setIsModalOpen} />
          <Container maxW="container.md" py={10}>
            <Heading mb={6}>Photo Rating Web App</Heading>
            <Box borderWidth="1px" borderRadius="lg" overflow="hidden" mb={6}>
              <Image src={photoUrl} alt="Random Photo" />
            </Box>
            <Stack spacing={4} direction="row" justify="center" mb={6}>
              <HStack spacing={2}>
                {[1, 2, 3, 4, 5].map((value) => (
                  <IconButton key={value} icon={rating >= value ? <FaStar /> : <FaRegStar />} onClick={() => handleRatePhoto(value)} variant="unstyled" size="lg" color="yellow.500" />
                ))}
              </HStack>
              {user && (
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
              <Heading size="md" mb={4}>
                Comments
              </Heading>
              {comments.length === 0 ? (
                <Text>No comments yet.</Text>
              ) : (
                <VStack spacing={4} align="stretch">
                  {comments.map((comment) => (
                    <Box key={comment.id} borderWidth={1} borderRadius="md" p={4}>
                      <Text>{comment.content}</Text>
                      <Text fontSize="sm" color="gray.500">
                        By {comment.user_id}
                      </Text>
                    </Box>
                  ))}
                </VStack>
              )}
            </Box>

            <form onSubmit={handleComment}>
              <FormControl id="comment" mb={6}>
                <FormLabel>Leave a comment</FormLabel>
                <Textarea name="comment" placeholder="Write your comment here..." />
                <Button type="submit" mt={4} colorScheme="blue">
                  Post Comment
                </Button>
              </FormControl>
            </form>

            <LoginSignupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onLogin={handleLogin} onSignup={handleSignup} />
            <Box textAlign="center" mt={6}>
              <Button colorScheme="purple" onClick={() => setPhotoUrl(`https://source.unsplash.com/random/800x600?sig=${Date.now()}`)}>
                Show Next
              </Button>
            </Box>
          </Container>
        </>
      )}
    </>
  );
};

export default Index;
