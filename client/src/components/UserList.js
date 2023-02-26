import React from "react";
import { Row } from "react-bootstrap";

function UserList({ users }) {
  return (
    <div>
      <h2>Users</h2>
      <Row>
        {users.userData?.length > 0 ? (
          users.userData.map((user) => (
            <Row key={user._id} sm={6} md={4} lg={3}>
              <div>{user.name}</div>
              <div>{user.email}</div>
            </Row>
          ))
        ) : (
          <div>no users</div>
        )}
      </Row>
    </div>
  );
}

export default UserList;
