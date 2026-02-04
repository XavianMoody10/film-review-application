import { FormButton } from "../FormButton/FormButton";
import { FormInput } from "../FormInput/FormInput";

export const LoginForm = () => {
  return (
    <form className=" flex flex-col gap-4 w-full">
      <div className=" flex flex-col gap-2">
        <FormInput type={"email"} placeholder={"Email"} />
        <FormInput type={"password"} placeholder={"Password"} />
      </div>
      <FormButton>Login</FormButton>
    </form>
  );
};
