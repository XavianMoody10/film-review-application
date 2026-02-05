import { useMutation } from "@tanstack/react-query";
import { FormButton } from "../FormButton/FormButton";
import { FormErrorMessage } from "../FormErrorMessage/FormErrorMessage";
import { FormInput } from "../FormInput/FormInput";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Create account via server
  async function accountLoginRequest() {
    try {
      if (!email) {
        throw new Error("Please enter a email");
      }

      if (!password) {
        throw new Error("Please enter a password");
      }

      const response = await fetch(
        "http://localhost:3000/authentication/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Inform the server the body is JSON
          },
          credentials: "include",
          body: JSON.stringify({ email: email, password }),
        },
      );

      if (!response.ok) {
        const data = await response.text();
        throw Error(data);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

  // Mutation (Post request from React Query)
  const mutate = useMutation({
    mutationFn: accountLoginRequest,
    onSuccess: (data) => {
      console.log(data);
      navigate(`/`);
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  return (
    <form
      className=" flex flex-col gap-4 w-full"
      onSubmit={(e) => {
        e.preventDefault();
        mutate.mutate();
      }}
    >
      {mutate.isError && <FormErrorMessage message={mutate.error.message} />}

      <div className=" flex flex-col gap-2">
        <FormInput
          type={"email"}
          placeholder={"Email"}
          onChangeEvent={(e) => {
            if (mutate.isError) {
              mutate.reset();
            }
            setEmail(e.target.value);
          }}
        />
        <FormInput
          type={"password"}
          placeholder={"Password"}
          onChangeEvent={(e) => {
            if (mutate.isError) {
              mutate.reset();
            }
            setPassword(e.target.value);
          }}
        />
      </div>

      <FormButton>Login</FormButton>
    </form>
  );
};
