import React from "react";
import prisma from "lib/prisma";
import { validateToken } from "lib/auth";
import GradientLayout from "components/GradientLayout";
import SongTable from "components/SongTable";

// random colour generator
const getBGColour = (id) => {
  const colours = [
    "red",
    "green",
    "blue",
    "orange",
    "purple",
    "gray",
    "yellow",
  ];
  // return colours whatever id you pass OR if id doesn`t exist it will give you a random colour
  return colours[id - 1] || colours[Math.floor(Math.random() * colours.length)];
};

// Because there are multiple playlist pages, there is going to be needed a dynamic page, like a route with a parameter in.
const Playlist = ({ playlist }) => {
  const colour = getBGColour(playlist.id);
  return (
    <GradientLayout
      color={colour}
      roundImage={false}
      title={playlist.name}
      subtitle="playlist"
      description={`${playlist.songs.length} songs`}
      image={`https://picsum.photos/400?random=${playlist.id}`}
    >
      <SongTable songs={playlist.songs} />
    </GradientLayout>
  );
};

export const getServerSideProps = async ({ query, req }) => {
  let user;

  try {
    user = validateToken(req.cookies.ACCESS_TOKEN);
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: "/signin",
      },
    };
  }

  const [playlist] = await prisma.playlist.findMany({
    where: {
      // this is playlist id, if you call the page [abc] then it will be abc here instead
      // the query string is always going to be a value type of string where all ids are numbers so you have to convert
      // this to a number by putting + in front of it
      id: +query.id,
      userId: user.id,
    },
    // include the songs in the playlist query so instead of making another db query to get the songs after you get the playlist
    // you can do it all in one by using `include`
    include: {
      songs: {
        include: {
          artist: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
  });
  return {
    props: { playlist },
  };
};
export default Playlist;
