import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import prisma from "lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // What to be POSTed on the route
  const { email, password } = req.body;

  // Find a user with this email, since email is unqiue in the schema
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  // If there is an user and check user password vs password hash
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        time: Date.now(),
      },
      "mikiman123",
      {
        expiresIn: "8h",
      }
    );
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("ACCESS_TOKEN", token, {
        httpOnly: true, // http request accesible only
        maxAge: 8 * 60 * 60, // expiration time
        path: "/", // it works on the website, the root.
        sameSite: "lax", //  allow the user to maintain a logged in status while arriving from an external link.
        secure: process.env.NODE_ENV === "production", // secure only in production, as in HTTPS.
      })
    );

    res.json(user);
  } else {
    res.status(401);
    res.json({ error: "Email or password is invalid!" });
  }
};
