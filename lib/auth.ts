import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "./prisma";

// HOFunction that is going to be used as middleware to
// protect the api routes. API route will be wrapped in this HOF
// and protected from accesing it unauthorized.
// Checks for token in the cookie, validity.

export const validateRoute = (handler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies.ACCESS_TOKEN;

    if (token) {
      let user;

      try {
        const { id } = jwt.verify(token, "mikiman123");
        user = await prisma.user.findUnique({
          where: { id },
        });

        if (!user) {
          throw new Error("User doesn`t exist");
        }
      } catch (error) {
        res.status(401);
        res.json({ error: "You`re not authorized" });
        return;
      }
      // Pass the user to the next handler
      return handler(req, res, user);
    }
    // If you don`t have a token to begin with.
    res.status(401);
    res.json({ error: "You`re not authorized" });
  };
};

// function that verifies the token and gets id from the cookie
export const validateToken = (token) => {
  const user = jwt.verify(token, "mikiman123");
  return user;
};
