import React from "react";

import Card from '../../common/UIElements/Card';
import { useParams } from "react-router-dom";
import './UsersTable.css';

const UsersList = props => {
    const usertype = useParams().usertype

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

        <div className="table-wrapper">
        <table className="fl-table">
            <thead>
            <tr>
                <th>Email</th>
                <th>Nom</th>
                <th>Prénom</th>
                {usertype == "teachers" &&
                <th>Role</th>}
                {(usertype == "students" || usertype == "trusted-students") &&
                <th>Classe</th>}
                {usertype == "students" &&
                <th>Adresse</th>}
                {usertype == "students" &&
                <th>Gsm</th>}
                {usertype == "students" &&
                <th>Date de naissance</th>}
            </tr>
            </thead>
            <tbody>
            {props.items.map(users => (
            <tr>
                <td>{users.email}</td>
                <td>{users.name}</td>
                <td>{users.firstname}</td>
                {usertype == "teachers" &&
                <td>{users.role}</td>}
                {(usertype == "students" || usertype == "trusted-students") &&
                <td>{users.classyear}</td>}
                {usertype == "students" &&
                <td>{users.address}</td>}
                {usertype == "students" &&
                <td>{users.phonenumber}</td>}
                {usertype == "students" && users.birdthdate != null &&
                <td>{users.birdthdate.toString().substring(0, 10)}</td>}
            </tr>
            ))}
            </tbody>
        </table>
    </div>
    );
}

export default UsersList;