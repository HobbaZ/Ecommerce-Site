import React, { useState } from "react";

import { Container, Button, Form } from "react-bootstrap";

import Auth from "../utils/auth";

let emailRegex =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const login = () => {
  window.location.replace("/login");
};

const Signup = () => {
  const [confirmPassword, setConfirmPassword] = useState("");

  const [formInput, setFormInput] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });

  document.title = "Signup";

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formInput) {
      return false;
    }

    //Send data to create user endpoint
    try {
      const response = await fetch(`api/users`, {
        method: "POST",
        body: JSON.stringify({ ...formInput }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        console.log(response);
        throw new Error("something went wrong!");
      }

      const { token, user } = await response.json();
      console.log(user);
      Auth.login(token);

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
            <div>
              <h1 className="text-center" tabIndex="0">
                Sign Up
              </h1>
              <Form onSubmit={handleSubmit} className={`mx-auto`}>
                <Form.Group className="mb-3">
                  <Form.Label>Your Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formInput.name.trim() || ""}
                    placeholder="Your Name"
                    onChange={handleChange}
                    required
                    minLength={2}
                  />
                </Form.Group>

                {formInput.name !== "" && formInput.name.length < 2 && (
                  <p className="text-center text-danger">
                    Name needs to be at least 2 characters
                  </p>
                )}

                <Form.Group className="mb-3">
                  <Form.Label>Create a username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={formInput.username.trim() || ""}
                    placeholder="username"
                    onChange={handleChange}
                    required
                    minLength={2}
                  />
                </Form.Group>

                {formInput.username !== "" && formInput.username.length < 2 && (
                  <p className="text-center text-danger">
                    Username needs to be at least 2 characters
                  </p>
                )}

                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formInput.email.trim() || ""}
                    placeholder="Enter email"
                    onChange={handleChange}
                    required
                    minLength={2}
                  />
                </Form.Group>

                {formInput.email !== "" &&
                  !emailRegex.test(formInput.email) && (
                    <p className="text-center text-danger">
                      Entered Email address is invalid
                    </p>
                  )}

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formInput.password || ""}
                    placeholder="Password"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                {formInput.password !== "" && formInput.password.length < 8 && (
                  <p className="text-center text-danger">
                    Password needs to be at least 8 characters
                  </p>
                )}

                <Form.Group className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmpassword"
                    value={confirmPassword}
                    placeholder="Password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                {formInput.password !== confirmPassword &&
                  "Passwords don't match"}

                <div className="text-center">
                  <Button
                    disabled={
                      !formInput.email ||
                      !formInput.name ||
                      !formInput.username ||
                      !formInput.password ||
                      formInput.password !== confirmPassword
                    }
                    variant="primary"
                    type="submit"
                    className="my-2 w-50"
                  >
                    Sign Up
                  </Button>
                </div>
              </Form>

              <div className="text-center">
                <Button variant="primary" className="my-2 w-50" onClick={login}>
                  login instead
                </Button>
              </div>
            </div>
          </div>
        </Container>
      ) : (
        window.location.replace("/profile")
      )}
    </>
  );
};

export default Signup;
