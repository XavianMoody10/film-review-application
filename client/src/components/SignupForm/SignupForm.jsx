import { useState } from "react";
import { FormButton } from "../FormButton/FormButton";
import { FormInput } from "../FormInput/FormInput";
import { useMutation } from "@tanstack/react-query";
import { FormErrorMessage } from "../FormErrorMessage/FormErrorMessage";
import { useNavigate } from "react-router-dom";

export const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Create account via server
  async function createAccountRequest() {
    try {
      if (!username) {
        throw new Error("Please enter a username");
      }

      if (!email) {
        throw new Error("Please enter a email");
      }

      if (!password) {
        throw new Error("Please enter a password");
      }

      const response = await fetch(
        "http://localhost:3000/authentication/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Inform the server the body is JSON
          },
          credentials: "include",
          body: JSON.stringify({ username, email, password }),
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
    mutationFn: createAccountRequest,
    onSuccess: (data) => {
      console.log(data);
      navigate("/");
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
          type={"text"}
          placeholder={"Create A Username"}
          onChangeEvent={(e) => {
            if (mutate.isError) {
              mutate.reset();
            }
            setUsername(e.target.value);
          }}
        />
        <FormInput
          type={"text"}
          placeholder={"Add Valid Email"}
          onChangeEvent={(e) => {
            if (mutate.isError) {
              mutate.reset();
            }
            setEmail(e.target.value);
          }}
        />
        <FormInput
          type={"password"}
          placeholder={"Create A Password"}
          onChangeEvent={(e) => {
            if (mutate.isError) {
              mutate.reset();
            }
            setPassword(e.target.value);
          }}
        />
      </div>

      <FormButton>Signup</FormButton>
    </form>
  );
};
