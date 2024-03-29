import React, { useEffect, useState } from "react";

import { Container, Button, Form } from "react-bootstrap";

import Auth from "../utils/auth";

let emailRegex =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

function Greeting(props) {
  const date = new Date();
  let currentHour = date.getHours();
  let currentGreeting = "";

  if (currentHour >= 0 && currentHour < 12) {
    currentGreeting = "Good Morning";
  } else if (currentHour >= 12 && currentHour < 18) {
    currentGreeting = "Good Afternoon";
  } else {
    currentGreeting = "Good Evening";
  }
  return (
    <>
      <div className="w-100">
        <h1 className="text-center">
          {currentGreeting} {props.name}
        </h1>
        <hr />
        <h4 className="text-center">Your current details are:</h4>
        <div className="w-75 mx-auto">
          <p>
            <b>Name:</b> {props.name}
          </p>
          <p>
            <b>Username:</b> {props.username}
          </p>

          <p>
            <b>Email:</b> {props.email}
          </p>

          <p>
            <b>Selling status:</b>
            {!!props.isAdmin ? " Seller Account Active" : " No Seller Account"}
          </p>

          {!!props.isAdmin ? (
            <p>
              <b>Stores:</b> {props.userData.stores?.length}
            </p>
          ) : null}

          {!!props.isAdmin ? (
            <p>
              <b>Products:</b> {props.userData.products?.length}
            </p>
          ) : null}
        </div>
      </div>
    </>
  );
}

const Profile = () => {
  const [userData, setUserData] = useState({});

  const [formInput, setFormInput] = useState({
    username: userData.username,
    email: userData.email,
    name: userData.name,
  });

  const [showEditForm, setShowEditForm] = useState(false);

  // state for messages
  const [infoMessage, setInfoMessage] = useState("");

  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = Auth.loggedIn()
          ? Auth.getToken()
          : window.location.replace("/login");

        if (!token) {
          console.log("Need to be logged in to do this");
          window.location.replace("/login");
          return false;
        }

        const response = await fetch(`/api/users/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          setInfoMessage("something went wrong getting user data!");
          throw new Error("something went wrong getting user data!");
        }

        const user = await response.json();
        document.title = `${user.name}'s Profile`;
        console.log(user);
        setUserData(user);
      } catch (err) {
        console.error(err);
      }
    };

    getUserData();
  }, []);

  //Delete account if logged in
  const deleteAccount = async () => {
    try {
      const token = Auth.loggedIn()
        ? Auth.getToken()
        : window.location.replace("/login");

      const response = await fetch(`/api/users/${userData.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("something went wrong with deleting account!");
      }

      //Delete user account, destroy access token and redirect to signup page if successful
      setInfoMessage("Account deleted!");
      console.log("user deleted");
      Auth.logout();
      window.location.replace("/signup");
    } catch (err) {
      console.error(err);
    }
  };

  function cancelAction() {
    setFormInput("");
    setShowEditForm(false);
  }

  //Update function for form
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formInput) {
      return false;
    }

    //Send data to update user endpoint
    try {
      const token = Auth.loggedIn()
        ? Auth.getToken()
        : window.location.replace("/login");

      const response = await fetch(`/api/users/${userData.id}`, {
        method: "PUT",
        body: JSON.stringify({ ...formInput }),
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.log(response);
        throw new Error("something went wrong updating your details!");
      }

      const user = await response.json();
      setInfoMessage("Details updated!");
      window.location.replace("/profile");
      console.log(user);

      setFormInput("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = async (event) => {
    const { name, value, checked } = event.target;
    setFormInput({
      ...formInput,
      [name]: event.target.type === "checkbox" ? checked : value,
    });
  };

  const welcome = (
    <Greeting
      name={userData.name}
      username={userData.username}
      email={userData.email}
      isAdmin={userData.isAdmin}
      isVerified={userData.isVerified}
      userData={userData}
    />
  );

  return (
    <Container fluid>
      <div className="col-sm-8 col-md-4 mt-5 mx-auto">
        <>
          {Auth.loggedIn() ? (
            <>
              <div>{welcome}</div>
              {infoMessage && <div className="text-center">{infoMessage}</div>}

              {userData.isVerified ? (
                <>
                  <div className="text-center">
                    <Button
                      variant="primary"
                      className="my-2 w-50"
                      onClick={() => setShowEditForm(!showEditForm)}
                    >
                      Edit Details <i className="fas fa-pen"></i>
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center text-danger" tabIndex="0">
                  You must have a verified email to edit your information
                </div>
              )}

              {showEditForm && (
                <>
                  <Container fluid>
                    <hr />
                    <div className="w-100 m-auto">
                      <h3 className="text-center">Update Your Details</h3>
                      <Form onSubmit={handleSubmit} className="mx-auto">
                        <Form.Group className="mb-3">
                          <Form.Label>Update Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            value={formInput.name || userData.name}
                            placeholder={userData.name}
                            onChange={handleChange}
                            minLength={2}
                          />
                        </Form.Group>

                        {formInput.name === "" && (
                          <p
                            className=" sr-only text-center text-danger"
                            role="alert"
                          >
                            Name needs to be at least 2 characters
                          </p>
                        )}

                        {formInput.name !== "" &&
                          formInput.name?.length < 2 && (
                            <p className="text-center text-danger" role="alert">
                              Name needs to be at least 2 characters
                            </p>
                          )}

                        <Form.Group className="mb-3">
                          <Form.Label>Update Username</Form.Label>
                          <Form.Control
                            type="text"
                            name="username"
                            value={formInput.username || userData.username}
                            placeholder={userData.username}
                            onChange={handleChange}
                            minLength={2}
                          />
                        </Form.Group>

                        {formInput.username === "" && (
                          <p
                            className=" sr-only text-center text-danger"
                            role="alert"
                          >
                            Username needs to be at least 2 characters
                          </p>
                        )}

                        {formInput.username !== "" &&
                          formInput.username?.length < 2 && (
                            <p className="text-center text-danger" role="alert">
                              Username needs to be at least 2 characters
                            </p>
                          )}

                        <Form.Group className="mb-3">
                          <Form.Label>Update Email address</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={formInput.email || userData.email}
                            placeholder={userData.email}
                            onChange={handleChange}
                            minLength={2}
                          />
                        </Form.Group>

                        {formInput.email === "" && (
                          <p className=" sr-only" role="alert">
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
                          <Form.Label>Update Selling Status </Form.Label>
                          <div className="ml-3">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                name="isAdmin"
                                checked={formInput.isAdmin || userData.isAdmin}
                                onChange={handleChange}
                              ></input>
                            </div>
                            I want a selling account
                          </div>
                        </Form.Group>

                        {infoMessage && (
                          <div className="text-center">{infoMessage}</div>
                        )}

                        <div className="text-center">
                          <Button
                            variant="primary"
                            type="submit"
                            className="my-2 w-50"
                          >
                            Update
                          </Button>
                        </div>

                        <div className="text-center">
                          <Button
                            onClick={cancelAction}
                            variant="danger"
                            type="button"
                            className="my-2 w-50"
                          >
                            Cancel
                          </Button>
                        </div>
                      </Form>
                    </div>
                  </Container>
                </>
              )}
              <hr />
              <div className="text-center">
                <Button
                  variant="danger"
                  className="my-2 w-50"
                  onClick={deleteAccount}
                >
                  Delete Account <i className="fas fa-trash-alt"></i>
                </Button>
                <p className="text-center text-danger">
                  Warning: Deleting your account is permanent and can't be
                  undone.
                </p>
              </div>
            </>
          ) : (
            window.location.replace("/login")
          )}
        </>
      </div>
    </Container>
  );
};

export default Profile;
