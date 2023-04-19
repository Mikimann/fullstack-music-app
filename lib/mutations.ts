import fetcher from "./fetcher";

// Functions that mutate the db. All in one place.

// Function 'auth'
// export const auth = (
//   mode: "signin" | "signup",
//   body: { email: string; password: string }
// ) => {
//   return fetcher(`/${mode}`, body);
// };

export const signUp = (
  mode: "signup",
  body: { email: string; password: string; firstName: string; lastName: string }
) => {
  return fetcher(`/${mode}`, body);
};

export const signIn = (
  mode: "signin",
  body: { email: string; password: string }
) => {
  return fetcher(`/${mode}`, body);
};
