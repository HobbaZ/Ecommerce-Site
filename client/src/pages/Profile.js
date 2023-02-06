//import React, { useEffect, useState } from "react";

//import { Container, Button, Form } from "react-bootstrap";

//import Auth from "../utils/auth";

function Greeting(props) {
  /* const date = new Date();
    let currentHour = date.getHours();
    let currentGreeting = '';
    
    if (currentHour >=0 && currentHour < 12) {
      currentGreeting = 'Good Morning';
  
    } else if (currentHour >= 12 && currentHour < 18 ) {
      currentGreeting = 'Good Afternoon';
  
    } else {
      currentGreeting = 'Good Evening';
    }
    return (
    <>
    <h1>{currentGreeting}, {props.firstname}</h1>
    <h4>Your current details are:</h4>
    <p>First Name: {props.firstname}</p>
    <p>Last Name: {props.lastname}</p>
    <p>Username: {props.username}</p>
    <p>Email: {props.email}</p>
    </>
    )*/
}

const Profile = () => {
  /* const [userData, setUserData] = useState({});

    const [formInput, setFormInput] = useState({ username: userData.username, email: userData.email ,firstname: userData.firstname, lastname: userData.lastname});
    
    const [submittingForm, setSubmittingForm] = useState(false);

    const [showEditForm, setShowEditForm] = useState(false);

    // state for messages
    const [infoMessage, setInfoMessage] = useState('');

    useEffect(() => {
      const getUserData = async () => {
        try {
          const token = Auth.loggedIn() ? Auth.getToken() : null;
  
          if (!token) {
            console.log("Need to be logged in to do this")
            window.location.replace("/login");
            return false;
          }
  
          const response = await fetch('/api/users/me', {
              method: 'GET',
              headers: { 'Content-Type': 'application/json',
              authorization: `Bearer ${token}`},
            });
  
          if (!response.ok) {
            setInfoMessage('something went wrong getting user data!')
            throw new Error('something went wrong getting user data!');
            
          }
  
          const user = await response.json();
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
    
          const token = Auth.loggedIn() ? Auth.getToken() : null;
    
          const response = await fetch(`/api/users/${userData.id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json',
            authorization: `Bearer ${token}`},
          });
    
        if (!response.ok) {
          throw new Error('something went wrong with deleting account!');
        }
    
        //Delete user account, destroy access token and redirect to signup page if successful
        setInfoMessage('Account deleted!')
        console.log('user deleted')
        Auth.logout()
        window.location.replace("/signup");

      } catch (err) {
        console.error(err);
      }
    };

    //Update function for form
    const handleSubmit = async (event) => {
      event.preventDefault();
      setSubmittingForm(true);
  
      if (!formInput) {
        return false;
      }
      
      //Send data to update user endpoint
      try {

          const token = Auth.loggedIn() ? Auth.getToken() : null;

          const response = await fetch(`/api/users/${userData.id}`, {
              method: 'PUT',
              body: JSON.stringify({ ...formInput}),
              headers: { 'Content-Type': 'application/json',
              authorization: `Bearer ${token}`},
        });
  
        if (!response.ok) {
          console.log(response);
          throw new Error('something went wrong updating your details!');
        }

        const user = await response.json();
        setInfoMessage('Details updated!')
        window.location.replace("/profile");
        console.log(user);
  
        setFormInput('');
      } catch (err) {
        console.error(err);
      }
    };

    const handleChange = async (event) => {
      const { name, value } = event.target;
      setFormInput({ ...formInput, [name]: value });
    };

    const welcome = <Greeting lastname={userData.lastname} firstname={userData.firstname} username={userData.username} email={userData.email}/>

    return (
    <Container>
        <>
        {Auth && (
            <>
              <h2 style={{"textAlign": "center"}}>Your Profile</h2>
      
              <div>
                {welcome}
              </div>

              {infoMessage && (
                  <div className='text-center'>{infoMessage}</div>
                )}

  
            <div className='text-center'>
              <Button variant="primary"
                    className='col-sm-8 col-md-4 col-lg-2 m-2'
                    onClick={() => setShowEditForm(!showEditForm)}>
                        Edit Details
              </Button>
            </div>
 
              {showEditForm && (
                <>
                <Container className='fluid'>
        <div>
            <h1 className='text-center'>Update Your Details</h1>
            <Form onSubmit={handleSubmit} className='mx-auto'>

                <Form.Group className="mb-3" disabled={submittingForm}>
                    <Form.Label>Update First Name</Form.Label>
                    <Form.Control type="text" name ="firstname" value={formInput.firstname || userData.firstname} placeholder={userData.firstname} onChange={handleChange} minLength={2}/>
                </Form.Group>

                <Form.Group className="mb-3" disabled={submittingForm}>
                    <Form.Label>Update Last Name</Form.Label>
                    <Form.Control type="text"name ="lastname" value={formInput.lastname || userData.lastname} placeholder={userData.lastname} onChange={handleChange} minLength={2}/>
                </Form.Group>
                
                <Form.Group className="mb-3" disabled={submittingForm}>
                    <Form.Label>Update Username</Form.Label>
                    <Form.Control type="text" name ="username" value={formInput.username || userData.username} placeholder={userData.username} onChange={handleChange} minLength={2}/>
                </Form.Group>

                <Form.Group className="mb-3" disabled={submittingForm}>
                    <Form.Label>Update Email address</Form.Label>
                    <Form.Control type="email" name ="email" value={formInput.email || userData.email} placeholder={userData.email} onChange={handleChange} minLength={2}/>
                </Form.Group>

                {infoMessage && (
              <div className='text-center'>{infoMessage}</div>
            )}

                <div className='text-center'>
                    <Button variant="primary" 
                    type="submit" 
                    className='col-sm-8 col-md-4 col-lg-2 m-2'>
                        Update
                    </Button>
                </div>
            </Form>

        </div>
    </Container>
                </>
              )};

            <div className='text-center'>
              <Button variant="danger"
                    className='col-sm-8 col-md-4 col-lg-2 m-2'
                    onClick={deleteAccount}>
                        Delete Account
            </Button>
              </div>
            </>
        )}
        </>
        </Container>
        );*/
};

export default Profile;
