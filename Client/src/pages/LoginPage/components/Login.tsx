import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";

interface UseFormInputs {
  loginOrEmail: string;
  password: string;
}

const Login: React.FC = () => {
  const [error, setError] = useState<string>("chuj chuj chuj");

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
        <label for="rememberMe">Remember me</label>
      </div>
      <div className="submitButton">
        <input type="submit" value={"Sign in"} />
      </div>
    </Form>
  );
};

export default Login;

const Form = styled.form`
  width: 80%;
  display: flex;
  flex-direction: column;

  input[type="text"],
  input[type="password"] {
    background-color: ${(props) => props.theme.SecondaryColor};
    color: ${(props) => props.theme.primaryColor};
    height: 3rem;
    padding-left: 1rem;
    border: none;
    border-radius: 0.5rem;

    &:first-child {
      margin-bottom: 1.5rem;
    }

    &::placeholder {
      color: ${(props) => props.theme.primaryColor};
    }
  }

  .checkbox {
    cursor: pointer;
    display: flex;
    justify-content: flex-start;
    margin: 1rem 0;

    input[type="checkbox"] {
      margin: 0;
      cursor: pointer;
    }

    label {
      display: flex;
      align-items: center;
      padding: 0.1rem 0 0 1rem;
      color: ${(props) => props.theme.SecondaryColor};
      font-size: 1rem;
      font-family: "Inter", sans-serif;
      font-weight: 300;
      cursor: pointer;
    }
  }

  .submitButton {
    display: flex;
    justify-content: flex-end;

    input[type="submit"] {
      padding-left: 0rem;
      width: 10rem;
      height: 3rem;
      border-radius: 0.5rem;
      font-size: 1.25rem;
      cursor: pointer;
      display: flex;
      justify-content: center;
    }
  }
`;
