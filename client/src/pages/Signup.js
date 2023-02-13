import React, { useState } from "react";

import { Container, Button, Form } from "react-bootstrap";

import Auth from "../utils/auth";

const login = () => {
  window.location.replace("/login");
};

const Signup = () => {
  const [formInput, setFormInput] = useState({
    username: "",
    email: "",
    password: "",
    firstname: "",
    lastname: "",
  });
  const [submittingForm, setSubmittingForm] = useState(false);

  document.title = "Signup";

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmittingForm(true);

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
      <Container className="fluid">
        <div>
          <h1 className="text-center">Sign Up</h1>
          <Form onSubmit={handleSubmit} className="mx-auto">
            <Form.Group className="mb-3" disabled={submittingForm}>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formInput.username.trim() || ""}
                placeholder="Username"
                onChange={handleChange}
                required
                minLength={2}
              />
            </Form.Group>

            <Form.Group className="mb-3" disabled={submittingForm}>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstname"
                value={formInput.firstname.trim() || ""}
                placeholder="First Name"
                onChange={handleChange}
                required
                minLength={2}
              />
            </Form.Group>

            <Form.Group className="mb-3" disabled={submittingForm}>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastname"
                value={formInput.lastname.trim() || ""}
                placeholder="Last Name"
                onChange={handleChange}
                required
                minLength={2}
              />
            </Form.Group>

            <Form.Group className="mb-3" disabled={submittingForm}>
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

            <Form.Group className="mb-3" disabled={submittingForm}>
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

            <Form.Group className="mb-3" disabled={submittingForm}>
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

            <div className="text-center">
              <Button
                variant="primary"
                type="submit"
                className="col-sm-8 col-md-4 col-lg-2 m-2"
                disabled={!formInput.username}
              >
                Sign Up
              </Button>
            </div>
          </Form>

          <div className="text-center">
            <Button
              variant="primary"
              className="col-sm-8 col-md-4 col-lg-2 m-2"
              onClick={login}
            >
              login instead
            </Button>
          </div>

          {submittingForm && <div>Submitting the form...</div>}
        </div>
      </Container>
    </>
  );
};

export default Signup;
