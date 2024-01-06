import { Box, Flex, Input, Button, Text, Link } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
// import { useSWRConfig } from "swr";
import { signIn } from "lib/mutations";
import { FC, useState } from "react";
import NextImage from "next/image";

// useSWRConfig is a hook that updates the local cache of the app,
// handles data fetching, caching, updates, refetching and revalidating.

const AuthForm: FC<{ mode: "signin" }> = ({ mode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    await signIn(mode, { email, password });
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
          padding="100px"
          paddingBottom="25px"
          bg="gray.900"
          borderRadius="5px"
        >
          <form onSubmit={handleSubmit}>
            <Input
              marginBottom="10px"
              size="lg"
              placeholder="Email"
              type="email"
              width="100%"
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              marginBottom="10px"
              size="lg"
              placeholder="Password"
              type="password"
              width="100%"
              onChange={(e) => setPassword(e.target.value)}
              required
            />

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
                colorScheme="white"
                size="lg"
              >
                Sign in
              </Button>
            </Box>
            <Text fontSize="lg" marginTop="20px" textAlign="center">
              Don`t have an account?{" "}
              <Link color="green.300" href="/signup">
                Sign up
              </Link>
            </Text>
          </form>
        </Box>
      </Flex>
    </Box>
  );
};

export default AuthForm;
