import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Text,
  VStack,
  Image,
  HStack,
  Divider,
  useTheme,
} from "@chakra-ui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import useApi from "../../services/useApi";
import { AuthenticationService } from "../../services/openapi";
import { useNavigate } from "react-router-dom";

// Validation schema using Yup

const SignUpPage = () => {
  const { isLoading, handleRequest } = useApi();
  const theme = useTheme();
  const navigate = useNavigate();
  const [isInAppBrowser, setIsInAppBrowser] = useState(false);
  useEffect(() => {
    // Check for Instagram or other in-app browsers
    const userAgent = navigator.userAgent || navigator.vendor;
    if (/instagram|fb_iab|fb4a|fbav/i.test(userAgent)) {
      setIsInAppBrowser(true);
    }
  }, []);
  const signUpWithEmail = async (values: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => {
    try {
      await handleRequest(AuthenticationService.authSignupPost(values));
      navigate("/login");
    } catch (err: any) {
      console.error(err.message);
    }
  };

  // Handle Google sign-in through backend
  const signUpWithGoogle = async () => {
    if (isInAppBrowser) {
      alert(
        "Por razões de segurança, abra este link no seu navegador padrão. Toque nos três pontos no canto superior direito e selecione 'Abrir no navegador.'"
      );
      return;
    }
    // Redirect user to Spring Security's OAuth2 login endpoint
    const width = 600; // Width of the popup
    const height = 600; // Height of the popup
    const left = window.innerWidth / 2 - width / 2; // Center horizontally
    const top = window.innerHeight / 2 - height / 2; // Center vertically

    // Open a new popup window for Spring Security's OAuth2 login endpoint
    window.open(
      `${process.env.REACT_APP_API_ENDPOINT}/oauth2/authorization/google`,
      "GoogleSignupPopup", // Name of the window
      `width=${width},height=${height},top=${top},left=${left}` // Popup features
    );
  };

  return (
    <Box maxW="md" mx="auto" mt={8} p={5}>
      {/* <Text as="b" fontSize=" xl" mb={6} textAlign="center" color="green.700">
        Login
      </Text> */}
      <Formik
        initialValues={{ email: "", password: "", firstName: "", lastName: "" }}
        onSubmit={(values, { setSubmitting }) => {
          signUpWithEmail(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <VStack spacing={4}>
              <FormControl id="email" isRequired>
                <FormLabel color="green.700">Email</FormLabel>
                <Field
                  borderColor="gray.400"
                  _hover={{ borderColor: "gray.500" }}
                  color="green.600"
                  name="email"
                  as={Input}
                  type="email"
                  placeholder="Insere o teu e-mail"
                />
                <ErrorMessage name="email" component={Text} />
              </FormControl>
              <FormControl id="firstName" isRequired>
                <FormLabel color="green.700">Nome</FormLabel>
                <Field
                  borderColor="gray.400"
                  _hover={{ borderColor: "gray.500" }}
                  color="green.600"
                  name="firstName"
                  as={Input}
                  type="text"
                  placeholder="Insere o teu nome"
                />
                <ErrorMessage name="firstName" component={Text} />
              </FormControl>
              <FormControl id="lastName" isRequired>
                <FormLabel color="green.700">Apelido</FormLabel>
                <Field
                  borderColor="gray.400"
                  _hover={{ borderColor: "gray.500" }}
                  color="green.600"
                  name="lastName"
                  as={Input}
                  type="text"
                  placeholder="Insere o teu apelido"
                />
                <ErrorMessage name="lastName" component={Text} />
              </FormControl>

              <FormControl id="password" isRequired>
                <FormLabel color="green.700">Password</FormLabel>
                <Field
                  borderColor="gray.400"
                  _hover={{ borderColor: "gray.500" }}
                  color="green.600"
                  name="password"
                  as={Input}
                  type="password"
                  placeholder="Insere a tua password"
                />
                <ErrorMessage name="password" component={Text} />
              </FormControl>

              <HStack width="full" mt={2}>
                <Button
                  type="submit"
                  color="white"
                  backgroundColor="green.500"
                  _hover={{ backgroundColor: "green.400" }}
                  isLoading={isSubmitting}
                  width="full"
                  value="Entrar"
                >
                  Registar
                </Button>
                {!isInAppBrowser && (
                  <>
                    <Text fontSize="xs" w="20%" color="green.700">
                      ou
                    </Text>

                    <Image
                      borderRadius="full"
                      border={`1px solid ${theme.colors.gray[300]}`}
                      boxSize="40px"
                      src="/google.webp"
                      mx="auto"
                      objectFit="cover"
                      cursor="pointer"
                      onClick={() => signUpWithGoogle()}
                    />
                  </>
                )}
              </HStack>

              <Divider my={2} />

              <Text textAlign="center" fontSize="xs" as="b" color="green.600">
                Já tens conta?&nbsp;
                <Button
                  variant="link"
                  colorScheme="green"
                  fontSize="xs"
                  onClick={() => navigate("/login")}
                >
                  Entra!
                </Button>
              </Text>
            </VStack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default SignUpPage;
