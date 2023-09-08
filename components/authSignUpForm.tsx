import React, { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Flex, Input, Button } from "@chakra-ui/react";
import NextImage from "next/image";
import { signUp } from "lib/mutations";

const AuthSignUp: FC<{ mode: "signup" }> = ({ mode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    await signUp(mode, { email, password, firstName, lastName });
    setIsLoading(false);
    const url = "/";
    router.push(url);
  };

  return (
    <Box height="100vh" width="100vw" bg="black" color="white">
      <Flex
        justify="center"
        align="center"
        height="100px"
        borderBottom="#00d956 1px solid"
        paddingTop="70px"
        paddingBottom="70px"
      >
        <NextImage
          src="/spotify-logo.svg"
          alt="site-logo"
          height={60}
          width={120}
        />
      </Flex>
      <Flex justify="center" align="center" height="calc(100vh - 150px)">
        <Box
          padding="50px"
          paddingBottom="20px"
          bg="gray.900"
          borderRadius="5px"
        >
          <form onSubmit={handleSubmit}>
            <Box marginBottom="10px" width="100%">
              <Input
                size="lg"
                placeholder="Email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>
            <Box marginBottom="10px" width="100%">
              <Input
                size="lg"
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Box>
            <Box marginBottom="10px" width="100%">
              <Input
                size="lg"
                placeholder="First Name"
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Box>
            <Box marginBottom="10px" width="100%">
              <Input
                size="lg"
                placeholder="Last Name"
                type="text"
                onChange={(e) => setLastName(e.target.value)}
              />
            </Box>

            <Box
              marginTop="20px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="100%"
            >
              <Button
                type="submit"
                bg="green.500"
                isLoading={isLoading}
                sx={{
                  "&:hover": {
                    bg: "green.300",
                  },
                }}
              >
                Sign up
              </Button>
            </Box>
          </form>
        </Box>
      </Flex>
    </Box>
  );
};

export default AuthSignUp;
