import React from "react";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import useApi from "../../services/useApi";
import { AuthenticationService } from "../../services/openapi";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { isLoading, handleRequest, error } = useApi();
  const navigate = useNavigate();
  const signUpWithEmail = async (values: {
    email: string;
    password: string;
  }) => {
    try {
      const response = await handleRequest(
        AuthenticationService.authLoginPost(values)
      );
      if (response) {
        localStorage.setItem("accessToken", response?.accessToken);
        localStorage.setItem("refreshToken", response?.refreshToken);
      }
      if (!error) {
        console.log(error);
        navigate("/comedians");
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  // Handle Google sign-in through backend
  const signUpWithGoogle = async () => {
    // Redirect user to Spring Security's OAuth2 login endpoint
    window.location.href =
      process.env.REACT_APP_API_ENDPOINT + "/oauth2/authorization/google";
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={5} boxShadow="md" borderRadius="md">
      <Text fontSize="2xl" mb={6}>
        Login
      </Text>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, { setSubmitting }) => {
          signUpWithEmail(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <VStack spacing={4}>
              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Field
                  name="email"
                  as={Input}
                  type="email"
                  placeholder="Enter your email"
                />
                <ErrorMessage name="email" component={Text} />
              </FormControl>

              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Field
                  name="password"
                  as={Input}
                  type="password"
                  placeholder="Enter your password"
                />
                <ErrorMessage name="password" component={Text} />
              </FormControl>

              <Button
                type="submit"
                colorScheme="blue"
                isLoading={isSubmitting}
                width="full"
              >
                Login with Email
              </Button>

              <Button colorScheme="red" onClick={signUpWithGoogle} width="full">
                Login with Google
              </Button>
            </VStack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default LoginPage;
