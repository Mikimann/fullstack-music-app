import AuthForm from "components/authForm";

const signIn = () => {
  return <AuthForm mode="signin" />;
};

signIn.authPage = true;

export default signIn;
