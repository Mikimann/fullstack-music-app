import AuthForm from "components/authForm";

const signUp = () => {
  return <AuthForm mode="signup" />;
};

signUp.authPage = true;

export default signUp;
