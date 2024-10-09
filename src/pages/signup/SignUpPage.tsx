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
import * as Yup from "yup";
import useApi from "../../services/useApi";
import { AuthenticationService } from "../../services/openapi";

// Validation schema using Yup
const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required"),
});

const SignUpPage = () => {
  const { isLoading, handleRequest } = useApi();
  const signUpWithEmail = async (values: {
    email: string;
    password: string;
  }) => {
    try {
      await handleRequest(AuthenticationService.authSignupPost(values));
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
        Sign Up
      </Text>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={SignupSchema}
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
                Sign Up with Email
              </Button>

              <Button colorScheme="red" onClick={signUpWithGoogle} width="full">
                Sign Up with Google
              </Button>
            </VStack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default SignUpPage;
