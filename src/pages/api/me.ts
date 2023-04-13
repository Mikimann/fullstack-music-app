import { validateRoute } from "lib/auth";
import prisma from "lib/prisma";

// This file gets the user. validateRoute already gets the user, it just sends it back here after wrapping it.

export default validateRoute(async (req, res, user) => {
  // count() does the same as findMany() but instead of returning what it finds, it returns the count
  const playlistCount = await prisma.playlist.count({
    where: {
      userId: user.id,
    },
  });
  res.json({ ...user, playlistCount });
});
