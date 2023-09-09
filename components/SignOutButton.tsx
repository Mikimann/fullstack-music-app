import { useRouter } from "next/router";
import { Button } from "@chakra-ui/react";
import { FC, useState } from "react";

const SignOutButton: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      // Make a POST request to sign-out API route
      const response = await fetch("/api/signout", {
        method: "POST",
      });

      if (response) {
        // Sign-out successful, redirect to the login page
        router.push("/"); // Replace with the actual login page URL
      }
    } catch (error) {
      console.log("Error during sign-out:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      bg="gray.900"
      sx={{
        "&:hover": {
          bg: "green.300",
        },
      }}
      onClick={handleSignOut}
      isLoading={isLoading}
      colorScheme="white"
    >
      Sign Out
    </Button>
  );
};

export default SignOutButton;
