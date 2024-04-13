import React, { useState } from "react";
import styled from "styled-components";
import Login from "./components/Login";
import Register from "./components/Register";

const LoginPage: React.FC = () => {
  const [action, setAction] = useState<"Login" | "Register">("Login");

  return (
    <Container>
      <article className="left-side">
        <img className="logo" src="images/Logo.png" />
        <Inputs>
          <div className="action-select">
            <p
              className={action === "Login" ? "selected" : ""}
              onClick={() => setAction("Login")}
            >
              Login
            </p>
            <p
              className={action === "Register" ? "selected" : ""}
              onClick={() => setAction("Register")}
            >
              Register
            </p>
          </div>

          {action === "Login" ? <Login /> : <Register />}
        </Inputs>
      </article>
      <img src="images/LoginImage.png" className="right-side"></img>
    </Container>
  );
};

export default LoginPage;

const Container = styled.article`
  width: 100vw;
  max-width: 2420px;
  display: flex;
  height: 100vh;
  background-color: ${(props) => props.theme.primaryColor};

  .left-side {
    width: 30%;
    min-width: 20rem;

    .logo {
      width: 6rem;
      margin: 1rem 0 0 1rem;
    }
  }

  .right-side {
    width: 70%;
    object-fit: cover;
    overflow: hidden;
  }
`;

const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  align-items: center;

  .action-select {
    height: clamp(6rem, 12vw, 12rem);
    display: flex;
    width: 80%;
    justify-content: space-between;
    align-items: end;

    p {
      font-size: clamp(1.75rem, 2.25vw, 2.25rem);
      font-family: "Lusitana", serif;
      font-weight: 400;
      font-style: normal;
      color: ${(props) => props.theme.textColorSecondary};
      cursor: pointer;
    }

    .selected {
      color: ${(props) => props.theme.textColorPrimary};
    }
  }
`;

export const Form = styled.form`
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: clamp(1rem, 1.5vw, 1.5rem);

  p {
    display: flex;
    justify-content: center;
    color: ${(props) => props.theme.textColorPrimary};
    font-family: "Inter", sans-serif;
    text-align: center;
    font-size: clamp(0.75rem, 1vw, 0.9rem);
  }

  input[type="text"],
  input[type="password"],
  input[type="email"],
  input[type="date"],
  select {
    background-color: ${(props) => props.theme.SecondaryColor};
    color: ${(props) => props.theme.primaryColor};
    height: clamp(2rem, 3vw, 3rem);
    padding-left: 1rem;
    border: none;
    border-radius: 0.5rem;
    font-family: "Inter", sans-serif;
    font-size: 1rem;

    &::placeholder {
      color: ${(props) => props.theme.textColorSecondary};
    }

    .error {
      background-color: red;
    }
  }

  input[type="date"] {
    width: 62%;
    border-right: 10px solid transparent;
  }

  select {
    width: 30%;

    border-right: 10px solid transparent;
  }
  option {
    font-size: 1.15rem;
  }

  .checkbox {
    cursor: pointer;
    display: flex;
    justify-content: flex-start;
    margin: 0;

    input[type="checkbox"] {
      margin: 0;
      cursor: pointer;
    }

    label {
      display: flex;
      align-items: center;
      padding-left: 1rem;
      color: ${(props) => props.theme.textColorPrimary};
      font-size: 1rem;
      font-family: "Inter", sans-serif;
      cursor: pointer;
    }
  }

  .buttons {
    display: flex;
    justify-content: space-between;
  }

  .submitButton {
    display: flex;
    justify-content: flex-end;

    input[type="submit"],
    button {
      background-color: ${(props) => props.theme.SecondaryColor};
      color: ${(props) => props.theme.textColorSecondary};
      padding-left: 0rem;
      width: clamp(7rem, 10vw, 10rem);
      height: 3rem;
      border-radius: 0.5rem;
      border: none;
      font-size: 1.25rem;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: "Inter", sans-serif;
    }
  }

  .sex-birth {
    display: flex;
    justify-content: space-between;
  }
`;
