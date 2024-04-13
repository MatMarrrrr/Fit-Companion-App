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
  const [error, setError] = useState<Array<string>>([""]);
  const [page, setPage] = useState<1 | 2>(1);

  const {
    register,
    reset,
    handleSubmit,

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
        return;
      }
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  const handleBackButton = () => {
    setError([]);
    setPage(1);
  };

  const validateUserData = () => {
    const formData = getValues();
    const newErrors = [];
    const specialChars = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~0-9]/;
    if (formData.login.length < 8) {
      newErrors.push("Login must contain at least 8 characters.");
    }
    if (!specialChars.test(formData.login)) {
      newErrors.push("Login must contain at least 1 special character");
    }
    if (formData.password.length < 8) {
      newErrors.push("Password must contain at least 8 characters.");
    }
    if (!specialChars.test(formData.password)) {
      newErrors.push("Password must contain at least 1 special character");
    }
    if (!validator.isEmail(formData.email)) {
      newErrors.push("Invalid email address.");
    }
    if (formData.password !== formData.repeatPassword) {
      newErrors.push("Passwords do not match.");
    }

    setError(newErrors);

    if (newErrors.length === 0) {
      setPage(2);
    }
  };

  const validatePersonalInfo = () => {
    const formData = getValues();
    const currentDate = new Date();
    const minDate = new Date();
    minDate.setFullYear(currentDate.getFullYear() - 100);
    const selectedDate = new Date(formData.birthDate);
    const newErrors = [];

    if (formData.username.length < 8) {
      newErrors.push("Username must contain at least 8 characters.");
    }
    if (formData.firstName.length < 3) {
      newErrors.push("Name must contain at least 3 characters.");
    }
    if (formData.lastName.length < 3) {
      newErrors.push("Surname must contain at least 3 characters.");
    }

    if (
      selectedDate < minDate ||
      selectedDate > currentDate ||
      !formData.birthDate
    ) {
      newErrors.push("Birth of year must be within 100 years.");
    }

    setError(newErrors);

    if (newErrors.length === 0) {
      setPage(2);
    }
  };

  const isSpecialChar = (value: string) => {
    return /[!@#$%^&*(),.?":{}|<>]/.test(value);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {page === 1 ? (
        <>
          <input
            {...register("login", {
              required: true,
              minLength: 8,
              validate: isSpecialChar,
            })}
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
            {...register("password", {
              required: true,
              minLength: 8,
              validate: isSpecialChar,
            })}
            placeholder="Password"
            type="password"
            key={"password"}
          />
          <input
            {...register("repeatPassword", { required: true })}
            placeholder="Repeat password"
            type="password"
            key={"repeatPassword"}
          />
          <div className="submitButton" style={{ marginTop: "3.1rem" }}>
            <button onClick={() => validateUserData()}>Next</button>
          </div>
        </>
      ) : (
        <>
          <input
            {...register("username", { required: true, minLength: 8 })}
            placeholder="Username"
            type="text"
            key={"username"}
          />
          <input
            {...register("firstName", { required: true, minLength: 3 })}
            placeholder="Name"
            type="text"
            key={"firstName"}
          />
          <input
            {...register("lastName", { required: true, minLength: 3 })}
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
              <button onClick={() => handleBackButton()}>Back</button>
            </div>
            <div className="submitButton">
              <button onClick={() => validatePersonalInfo()}>Sign up</button>
            </div>
          </div>
        </>
      )}
      <div className="errors">
        {error.map((err, index) => (
          <p key={index}>{err}</p>
        ))}
      </div>
    </Form>
  );
};

export default Register;
