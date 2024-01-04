import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  /* remove cookies from request header */
  res.setHeader("Set-Cookie", [
    cookie.serialize("ACCESS_TOKEN", "", {
      maxAge: -1,
      path: "/",
    }),
  ]);

  res.statusCode = 200;
  res.end();
};
