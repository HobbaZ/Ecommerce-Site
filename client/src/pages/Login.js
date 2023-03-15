import React, { useState, useEffect } from "react";

import { Container, Button, Form } from "react-bootstrap";

import Auth from "../utils/auth";

let emailRegex =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const signup = () => {
  window.location.replace("/signup");
};

const Login = () => {
  const [formInput, setFormInput] = useState({ email: "", password: "" });
  const [submittingForm, setSubmittingForm] = useState(false);

  // state for messages
  const [infoMessage, setInfoMessage] = useState("");

  useEffect(() => {
    document.title = "Login";
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmittingForm(true);

    if (!formInput) {
      return false;
    }

    //Send data to login endpoint
    try {
      const response = await fetch(`/api/users/login`, {
        method: "POST",
        body: JSON.stringify({ ...formInput }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        console.log(response);
        setInfoMessage("Wrong email or password entered");
        throw new Error("something went wrong trying to log in!");
      }

      const { token } = await response.json();
      Auth.login(token);
      setInfoMessage("Logging in!");

      setFormInput("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = async (event) => {
    const { name, value } = event.target;
    setFormInput({ ...formInput, [name]: value });
  };

  return (
    <>
      {!Auth.loggedIn() ? (
        <Container fluid>
          <div className="col-sm-8 col-md-4 mt-5 mx-auto">
            <h1 className="text-center" tabIndex="0">
              Login
            </h1>
            <Form onSubmit={handleSubmit} className="mx-auto">
              <Form.Group className="mb-3" disabled={submittingForm}>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  aria-required={true}
                  type="email"
                  name="email"
                  value={formInput.email.trim() || ""}
                  placeholder="Enter your email"
                  onChange={handleChange}
                  required={true}
                />
              </Form.Group>

              {formInput.email !== "" && !emailRegex.test(formInput.email) && (
                <p className="text-center text-danger">
                  Entered Email address is invalid
                </p>
              )}

              <Form.Group className="mb-3" disabled={submittingForm}>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  aria-required={true}
                  aria-describedby="Password needs to be at least 8 characters"
                  type="password"
                  name="password"
                  value={formInput.password || ""}
                  placeholder="Enter your Password"
                  onChange={handleChange}
                  min={8}
                  required={true}
                />
              </Form.Group>

              {/*{formInput.password !== "" && formInput.password.length < 8 && (
                <p className="text-center text-danger">
                  Password needs to be at least 8 characters
                </p>
              )}*/}

              {infoMessage && <div className="text-center">{infoMessage}</div>}

              <div className="text-center">
                <Button
                  variant="primary"
                  type="submit"
                  className="my-2 w-50"
                  aria-disabled="true"
                  disabled={!(formInput.email && formInput.password)}
                >
                  Login
                </Button>
              </div>
            </Form>

            <div className="text-center">
              <Button variant="primary" className="my-2 w-50" onClick={signup}>
                Forgot Password
              </Button>
            </div>

            <div className="text-center">
              <Button variant="primary" className="my-2 w-50" onClick={signup}>
                Sign Up instead
              </Button>
            </div>
          </div>
        </Container>
      ) : (
        window.location.replace("/profile")
      )}
    </>
  );
};

export default Login;
