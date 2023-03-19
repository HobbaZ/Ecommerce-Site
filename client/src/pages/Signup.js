import React, { useEffect, useState } from "react";

import { Container, Button, Form } from "react-bootstrap";

import Auth from "../utils/auth";

let emailRegex =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const login = () => {
  window.location.replace("/login");
};

if (document.getElementsByTagName("input").required) {
  document.getElementsByTagName("label").setAttribute("*");
}

const Signup = () => {
  const [confirmPassword, setConfirmPassword] = useState("");

  // state for messages
  const [infoMessage, setInfoMessage] = useState("");

  const [formInput, setFormInput] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });

  useEffect(() => {
    document.title = "Signup";
  }, []);

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
                  <Form.Label htmlFor="nameInput" className="required">
                    Your Name
                  </Form.Label>
                  <Form.Control
                    id="nameInput"
                    type="text"
                    name="name"
                    value={formInput.name.trim() || ""}
                    placeholder="Enter Your Name"
                    onChange={handleChange}
                    required
                    minLength={2}
                    aria-invalid={
                      formInput.name !== "" && formInput.name.length < 2
                    }
                  />
                </Form.Group>

                {formInput.name === "" && (
                  <p className=" sr-only text-center text-danger" role="alert">
                    Name needs to be at least 2 characters
                  </p>
                )}

                {formInput.name !== "" && formInput.name.length < 2 && (
                  <p className="text-center text-danger" role="alert">
                    Name needs to be at least 2 characters
                  </p>
                )}

                <Form.Group className="mb-3">
                  <Form.Label htmlFor="usernameInput" className="required">
                    Create a username
                  </Form.Label>
                  <Form.Control
                    id="usernameInput"
                    type="text"
                    name="username"
                    value={formInput.username.trim() || ""}
                    placeholder="Enter a username"
                    onChange={handleChange}
                    required
                    minLength={2}
                    aria-invalid={
                      formInput.username !== "" && formInput.username.length < 2
                    }
                  />
                </Form.Group>

                {formInput.username === "" && (
                  <p className=" sr-only text-center text-danger" role="alert">
                    Username needs to be at least 2 characters
                  </p>
                )}

                {formInput.username !== "" && formInput.username.length < 2 && (
                  <p className="text-center text-danger" role="alert">
                    Username needs to be at least 2 characters
                  </p>
                )}

                <Form.Group className="mb-3">
                  <Form.Label htmlFor="emailInput" className="required">
                    Email address
                  </Form.Label>
                  <Form.Control
                    id="emailInput"
                    type="email"
                    name="email"
                    value={formInput.email.trim() || ""}
                    placeholder="Enter email address"
                    onChange={handleChange}
                    required
                    minLength={2}
                    aria-invalid={
                      formInput.email !== "" &&
                      !emailRegex.test(formInput.email)
                    }
                  />
                </Form.Group>

                {formInput.email === "" && (
                  <p className=" sr-only text-center text-danger" role="alert">
                    Entered Email address is invalid
                  </p>
                )}

                {formInput.email !== "" &&
                  !emailRegex.test(formInput.email) && (
                    <p
                      className="text-center text-danger"
                      role="status"
                      aria-live="assertive"
                    >
                      Entered Email address is invalid
                    </p>
                  )}

                <Form.Group className="mb-3">
                  <Form.Label htmlFor="passwordInput" className="required">
                    Password
                  </Form.Label>
                  <Form.Control
                    id="passwordInput"
                    type="password"
                    name="password"
                    value={formInput.password || ""}
                    placeholder="Create a Password"
                    onChange={handleChange}
                    required
                    minLength={8}
                    aria-describedby="passwordError"
                    aria-invalid={
                      formInput.password !== "" && formInput.password.length < 8
                    }
                  />
                </Form.Group>
                {formInput.password === "" && (
                  <p className="sr-only" id="passwordError" role="status">
                    Password needs to be at least 8 characters
                  </p>
                )}
                {formInput.password !== "" && formInput.password.length < 8 && (
                  <p className=" text-center text-danger" role="status">
                    Password needs to be at least 8 characters (currently only
                    {" " + formInput.password.length})
                  </p>
                )}
                <Form.Group className="mb-3">
                  <Form.Label
                    htmlFor="confirmpasswordInput"
                    className="required"
                  >
                    Re Type Password
                  </Form.Label>
                  <Form.Control
                    id="confirmpasswordInput"
                    type="password"
                    name="confirmpassword"
                    value={confirmPassword}
                    placeholder="Re-type Password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    aria-describedby="confirmPasswordError"
                    aria-invalid={
                      confirmPassword !== "" &&
                      formInput.password !== confirmPassword
                    }
                    required
                  />
                </Form.Group>
                {confirmPassword === "" && (
                  <p
                    className="sr-only"
                    id="confirmPasswordError"
                    role="status"
                  >
                    Passwords do not match
                  </p>
                )}
                {confirmPassword !== "" &&
                  formInput.password !== confirmPassword && (
                    <div role="alert" className="text-center text-danger">
                      Passwords do not match
                    </div>
                  )}

                {infoMessage && (
                  <div className="text-center" role="alert">
                    {infoMessage}
                  </div>
                )}

                <div className="text-center" tabIndex="0">
                  <Button
                    aria-disabled={
                      !formInput.email ||
                      !formInput.name ||
                      !formInput.username ||
                      !formInput.password ||
                      !emailRegex.test(formInput.email) ||
                      formInput.password !== confirmPassword
                    }
                    disabled={
                      !formInput.email ||
                      !formInput.name ||
                      !formInput.username ||
                      !formInput.password ||
                      !emailRegex.test(formInput.email) ||
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
