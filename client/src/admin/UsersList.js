import React from "react";

import Card from '../common/UIElements/Card';
import UserItem from "./UserItem";
import './UsersList.css';

const UsersList = props => {
    if (props.items.length === 0) {
      return (
        <div className="center">
        <Card>
          <h2>Aucun utilisateur trouvé</h2>
        </Card>
      </div>
      );
    }

    return (
    <ul className="users-list">
      {props.items.map(users => (
        <UserItem
        key={users.id}
        id={users.id}
        name={users.name}
        firstname={users.firstname}
        email={users.email}
        role={users.role}
        classyear={users.classyear}
        />
      ))}
    </ul>
    );
}

export default UsersList;