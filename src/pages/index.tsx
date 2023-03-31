import GradientLayout from "components/GradientLayout";
import prisma from "lib/prisma";

const Home = ({ artists }) => {
  return (
    <div>
      <GradientLayout
        roundImage
        color="red"
        subtitle="profile"
        title="Miki Jurja"
        description="50 Public Playlists"
        image="https://golden-storage-production.s3.amazonaws.com/topic_images/6861ca1121e24652a45644fc1a29f546.png"
      >
        <div>Home</div>
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
