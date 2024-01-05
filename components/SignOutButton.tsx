import React, { FC, useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@chakra-ui/react";

interface SignOutButtonProps {
  children: React.ReactNode;
}

const SignOutButton: FC<SignOutButtonProps> = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      // Make a POST request to sign-out API route
      const response = await fetch("/signout", {
        method: "POST",
      });

      if (response.ok) {
        router.push("/signin");
      } else {
        // If the response status is not 200, throw an error
        throw new Error(`Sign out failed with status: ${response.status}`);
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
