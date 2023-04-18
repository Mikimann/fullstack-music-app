import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import prisma from "lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const salt = bcrypt.genSaltSync();
  const { email, password, firstName, lastName } = req.body;

  let user;
  // Create user with email, hashed password, first and last name
  try {
    user = await prisma.user.create({
      data: {
        email,
        password: bcrypt.hashSync(password, salt),
        firstName,
        lastName,
      },
    });
    // If user creation fails send a 401 back and error message
  } catch (e) {
    res.status(401);
    res.json({ error: "User already exists" });
    return;
  }
  // If user creation succeeds create a json web token with email, userId, first and last name,
  // time when it was created, secret and expiration.
  const token = jwt.sign(
    {
      email: user.email,
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      time: Date.now(),
    },
    process.env.JWT_SECRET,
    { expiresIn: "8h" }
  );

  // Take the token and serialize it in a cookie called ACCESS_TOKEN and give it the following properties.

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
  // Send back user object from the db
  res.json(user);
};
