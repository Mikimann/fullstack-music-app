import { validateRoute } from "lib/auth";

// This file gets the user. validateRoute already gets the user, it just sends it back here after wrapping it.

export default validateRoute((req, res, user) => {
  res.json(user);
});
