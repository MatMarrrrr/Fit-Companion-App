import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

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
    formState: { isValid, errors },
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
      console.log(data);
      reset();
    } catch (error) {
      console.log(error);
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
            className={errors.login ? "error" : ""}
          />
          <input
            {...register("email", { required: true })}
            placeholder="Email"
            type="email"
            key={"email"}
            className={errors.email ? "error" : ""}
          />
          <input
            {...register("password", { required: true })}
            placeholder="Password"
            type="password"
            key={"password"}
            className={errors.password ? "error" : ""}
          />
          <input
            {...register("repeatPassword", { required: true })}
            placeholder="Repeat password"
            type="password"
            key={"repeatPassword"}
            className={errors.repeatPassword ? "error" : ""}
          />
          <div className="submitButton" style={{ marginTop: "3.1rem" }}>
            <button onClick={() => setPage(2)} disabled={!isValid}>
              Next
            </button>
          </div>
        </>
      ) : (
        <>
          <input
            {...register("username", { required: true })}
            placeholder="Username"
            type="text"
            key={"username"}
            className={errors.username ? "error" : ""}
          />
          <input
            {...register("firstName", { required: true })}
            placeholder="Name"
            type="text"
            key={"firstName"}
            className={errors.firstName ? "error" : ""}
          />
          <input
            {...register("lastName", { required: true })}
            placeholder="Surname"
            type="text"
            key={"lastName"}
            className={errors.lastName ? "error" : ""}
          />
          <div className="sex-birth">
            <select
              defaultValue="male"
              {...register("sex", { required: true })}
              key={"sex"}
              className={errors.sex ? "error" : ""}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <input
              {...register("birthDate", { required: true })}
              placeholder="Date of birth"
              type="date"
              className={errors.birthDate ? "error" : ""}
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
              <input type="submit" value={"Sign up"} />
            </div>
          </div>
        </>
      )}
    </Form>
  );
};

export default Register;
