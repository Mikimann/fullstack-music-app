import AuthForm from "components/authSignInForm";

const signIn = () => {
  return <AuthForm mode="signin" />;
};

signIn.authPage = true;

export default signIn;
