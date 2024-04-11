import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import validator from "validator";

import { Form } from "../LoginPage";

interface UseFormInputs {
  login: string;
  email: string;
  password: string;
  repeatPassword: string;
  username: string;
  firstName: string;
  lastName: string;
  sex: string;
  birthDate: Date;
}

const Register: React.FC = () => {
  const [error, setError] = useState<string>("");
  const [page, setPage] = useState<1 | 2>(1);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<UseFormInputs>({
    defaultValues: {
      login: "",
      email: "",
      password: "",
      repeatPassword: "",
      username: "",
      firstName: "",
      lastName: "",
      sex: "male",
      birthDate: undefined,
    },
  });

  const onSubmit: SubmitHandler<UseFormInputs> = async (
    data: UseFormInputs
  ) => {
    try {
      const currentDate = new Date();
      const minDate = new Date();
      minDate.setFullYear(currentDate.getFullYear() - 100);
      const selectedDate = new Date(data.birthDate);
      if (selectedDate < minDate || selectedDate > currentDate) {
        setError("Please select a birth date within the last 100 years.");
        return;
      }
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  const handleNextButtonClick = () => {
    const formData = getValues();

    const emailIsValid = validator.isEmail(formData.email);
    const passwordsMatch = formData.password === formData.repeatPassword;

    if (!formData.login) setError("Please enter a login.");
    else if (!emailIsValid) {
      setError("Please enter a valid email address.");
    } else if (!formData.password) {
      setError("Please enter a password.");
    } else if (formData.password.length < 8) {
      setError("Password must contain at least 8 characters");
    } else if (!formData.repeatPassword) {
      setError("Please repeat your password.");
    } else if (!passwordsMatch) {
      setError("Passwords do not match.");
    } else {
      setError("");
      setPage(2);
    }
  };

  const handleSignupButton = () => {
    const formData = getValues();

    if (!formData.username) setError("Please enter a username.");
    else if (!formData.firstName) {
      setError("Please enter your name.");
    } else if (!formData.lastName) {
      setError("Please enter your surname.");
    } else if (!formData.birthDate) {
      setError("Please select your date of birth.");
    } else {
      setError("");
      setPage(2);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {page === 1 ? (
        <>
          <input
            {...register("login", { required: true })}
            placeholder="Login"
            type="text"
            key={"login"}
          />
          <input
            {...register("email", { required: true })}
            placeholder="Email"
            type="email"
            key={"email"}
          />
          <input
            {...register("password", { required: true, minLength: 8 })}
            placeholder="Password"
            type="password"
            key={"password"}
          />
          <input
            {...register("repeatPassword", { required: true, minLength: 8 })}
            placeholder="Repeat password"
            type="password"
            key={"repeatPassword"}
          />
          <div className="submitButton" style={{ marginTop: "3.1rem" }}>
            <button onClick={() => handleNextButtonClick()}>Next</button>
          </div>
        </>
      ) : (
        <>
          <input
            {...register("username", { required: true })}
            placeholder="Username"
            type="text"
            key={"username"}
          />
          <input
            {...register("firstName", { required: true })}
            placeholder="Name"
            type="text"
            key={"firstName"}
          />
          <input
            {...register("lastName", { required: true })}
            placeholder="Surname"
            type="text"
            key={"lastName"}
          />
          <div className="sex-birth">
            <select
              defaultValue="male"
              {...register("sex", { required: true })}
              key={"sex"}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <input
              {...register("birthDate", { required: true })}
              placeholder="Date of birth"
              type="date"
            />
          </div>
          <div className="checkbox">
            <input type="checkbox" value="lsRememberMe" id="rememberMe" />{" "}
            <label htmlFor="rememberMe">Remember me</label>
          </div>
          <div className="buttons" style={{ marginTop: "1rem" }}>
            <div className="submitButton">
              <button onClick={() => setPage(1)}>Previous</button>
            </div>
            <div className="submitButton">
              <button onClick={() => handleSignupButton()}>Sign up</button>
            </div>
          </div>
        </>
      )}
      <p>{error}</p>
    </Form>
  );
};

export default Register;
