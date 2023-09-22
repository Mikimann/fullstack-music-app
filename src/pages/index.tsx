import { Box, Text, Flex } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import GradientLayout from "components/GradientLayout";
import { useMe } from "lib/hooks";
import prisma from "lib/prisma";

const Home = ({ artists }) => {
  const { user, isLoading } = useMe();

  return (
    <div>
      <GradientLayout
        roundImage
        color="red"
        subtitle="profile"
        // Add a loading spinner/skeleton or something so undefined doesnt show when loading data"
        title={user ? `${user?.firstName} ${user?.lastName}` : isLoading}
        description={
          user ? `${user?.playlistCount} public playlists` : isLoading
        }
        image={
          user
            ? "https://golden-storage-production.s3.amazonaws.com/topic_images/6861ca1121e24652a45644fc1a29f546.png"
            : isLoading
        }
      >
        <Box color="white" paddingX="40px">
          <Box marginBottom="40px">
            <Text fontSize="2xl" fontWeight="bold">
              Top artists this month
            </Text>
            <Text fontSize="md">only visible to you</Text>
          </Box>
          {isLoading ? (
            // Render a loading indicator here
            "Loading..."
          ) : (
            <Flex>
              {artists.map((artist) => (
                <Box paddingX="10px" width="20%">
                  <Box
                    bg="gray.900"
                    borderRadius="4px"
                    padding="15px"
                    width="100%"
                  >
                    <Image
                      src="https://www.thestreet.com/.image/t_share/MTgyMDU5NDcwMTc4NzU1NzE1/boredape1.jpg"
                      borderRadius="100%"
                    />
                    <Box marginTop="20px">
                      <Text fontSize="large">{artist.name}</Text>
                      <Text fontSize="x-small">Artist</Text>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Flex>
          )}
        </Box>
      </GradientLayout>
    </div>
  );
};

// Use server-side for getting artists data from the server before the page renders. Function is ran when someone requests this page.
// Props is "injected" into the Home page
export const getServerSideProps = async () => {
  const artists = await prisma.artist.findMany({});
  // return an object with a props property.Whatever props you put here, that`s what is going to get injected into the home page
  return {
    props: { artists },
  };
};
export default Home;
