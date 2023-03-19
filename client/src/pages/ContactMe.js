import React, { useState, useRef, useEffect } from "react";

import emailjs from "@emailjs/browser";

import { Container, Button, Form } from "react-bootstrap";

let emailRegex =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

function ContactMe({ ...props }) {
  const formRef = useRef();

  const [subjectInput, setSubjectInput] = useState();
  const [nameInput, setNameInput] = useState();
  const [emailInput, setEmailInput] = useState();
  const [messageInput, setMessageInput] = useState();

  const [validated] = useState(false);

  // state for messages
  const [infoMessage, setInfoMessage] = useState("");

  // submit form
  const submitForm = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    //send details to email provider
    emailjs
      .sendForm(
        process.env.REACT_APP_SERVICEID,
        process.env.REACT_APP_TEMPLATEID,
        formRef.current,
        process.env.REACT_APP_USERID
      )
      .then(
        (result) => {
          console.log("Email succeeded", result);
          setInfoMessage("Email Succeeded");
          setTimeout(() => {
            setInfoMessage("");
          }, 3000);
        },
        (error) => {
          console.log("Email failed: ", error);
          setInfoMessage("Email Failed");
          setTimeout(() => {
            setInfoMessage("");
          }, 3000);
        }
      );
  };

  return (
    <Container fluid>
      <div className="col-sm-8 col-md-4 mt-5 mx-auto">
        <h1 className="text-center" tabIndex="0">
          Contact Me
        </h1>

        <Form
          validated={validated}
          onSubmit={submitForm}
          className="mx-auto"
          ref={formRef}
        >
          <Form.Group>
            <label className="">Name</label>
            <input
              className="form-control"
              type="text"
              name="from_name"
              value={nameInput || ""}
              placeholder="Your Name"
              onChange={(e) => setNameInput(e.target.value)}
              required
            />
          </Form.Group>

          {nameInput === "" && (
            <p className=" sr-only text-center text-danger" role="alert">
              Name must be at least 2 characters
            </p>
          )}

          {nameInput !== "" && nameInput?.length < 2 && (
            <div className="text-center text-danger" role="alert">
              Name must be at least 2 characters
            </div>
          )}

          <br />

          <Form.Group>
            <label className="">Email address</label>
            <input
              className="form-control"
              type="email"
              name="user_email"
              value={emailInput || ""}
              placeholder="Enter email"
              onChange={(e) => setEmailInput(e.target.value)}
              required
            />
          </Form.Group>

          {emailInput != null && !emailRegex.test(emailInput) && (
            <div className="text-center text-danger" role="alert">
              Invalid email address entered
            </div>
          )}
          <br />

          <Form.Group>
            <label className="">Subject</label>
            <select
              className="form-control"
              value={subjectInput}
              required
              name="user_subject"
              onChange={(e) => setSubjectInput(e.target.value)}
            >
              <option value="Make a General Enquiry">
                Make a General Enquiry
              </option>
              <option value="Make a Complaint">Make a Complaint</option>
              <option value="Talk About a Project or Idea">
                Talk About a Project or Idea
              </option>
            </select>
          </Form.Group>

          <br />

          <Form.Group>
            <label className="">Message</label>
            <textarea
              className="form-control"
              type="text"
              rows="7"
              name="message"
              value={messageInput || ""}
              placeholder="Type your message (required)"
              onChange={(e) => setMessageInput(e.target.value)}
              required
            />
          </Form.Group>

          {messageInput === "" && (
            <p className=" sr-only text-center text-danger" role="alert">
              Message is required
            </p>
          )}

          {messageInput !== "" && messageInput?.length < 2 && (
            <div className="text-center text-danger">Message is required</div>
          )}

          <br />

          <div className="text-center">
            <Button
              type="submit"
              className="form-btn-primary"
              aria-disabled={
                !emailInput ||
                !nameInput ||
                !messageInput ||
                !emailRegex.test(emailInput)
              }
              disabled={
                !emailInput ||
                !nameInput ||
                !messageInput ||
                !emailRegex.test(emailInput)
              }
            >
              <div>Send Email</div>
            </Button>
          </div>

          {infoMessage && (
            <div className="text-center text-danger" role="alert">
              <p>{infoMessage}</p>
            </div>
          )}
        </Form>
      </div>
    </Container>
  );
}

export default ContactMe;
