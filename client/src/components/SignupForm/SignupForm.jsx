import { FormButton } from "../FormButton/FormButton";
import { FormInput } from "../FormInput/FormInput";

export const SignupForm = () => {
  return (
    <form className=" flex flex-col gap-4 w-full">
      <div className=" flex flex-col gap-2">
        <FormInput type={"text"} placeholder={"Create A Username"} />
        <FormInput type={"email"} placeholder={"Add Valid Email"} />
        <FormInput type={"password"} placeholder={"Create A Password"} />
      </div>

      <FormButton>Signup</FormButton>
    </form>
  );
};
