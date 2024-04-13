import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Form } from "../LoginPage";

interface UseFormInputs {
  loginOrEmail: string;
  password: string;
}

const Login: React.FC = () => {
  const [error] = useState<string>("");

  const { register, reset, handleSubmit } = useForm<UseFormInputs>({
    defaultValues: {
      loginOrEmail: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<UseFormInputs> = async () => {
    try {
      console.log(1);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("loginOrEmail", { required: true })}
        placeholder="Login/Email"
        type="text"
      />
      <input
        {...register("password", { required: true })}
        placeholder="Password"
        type="password"
      />
      <div className="checkbox">
        <input type="checkbox" value="lsRememberMe" id="rememberMe" />{" "}
        <label htmlFor="rememberMe">Remember me</label>
      </div>
      <div className="submitButton">
        <input type="submit" value={"Sign in"} />
      </div>
      <p>{error}</p>
    </Form>
  );
};

export default Login;
