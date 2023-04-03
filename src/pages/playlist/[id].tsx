import React from "react";
import prisma from "lib/prisma";
import { validateToken } from "lib/auth";

// Because there are multiple playlist pages, there is going to be needed a dynamic page, like a route with a parameter in.
const Playlist = ({ playlist }) => {
  return <div>{playlist.name}</div>;
};

export const getServerSideProps = async ({ query, req }) => {
  const { id } = validateToken(req.cookies.ACCESS_TOKEN);
  const [playlist] = await prisma.playlist.findMany({
    where: {
      // this is playlist id, if you call the page [abc] then it will be abc here instead
      // the query string is always going to be a value type of string where all ids are numbers so you have to convert
      // this to a number by putting + in front of it
      id: +query.id,
      userId: id,
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
