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
                {usertype == "profs" &&
                <th>Role</th>}
                {(usertype == "eleves" || usertype == "white-list-eleves") &&
                <th>Classe</th>}
                {usertype == "eleves" &&
                <th>Adresse</th>}
                {usertype == "eleves" &&
                <th>Gsm</th>}
                {usertype == "eleves" &&
                <th>Date de naissance</th>}
            </tr>
            </thead>
            <tbody>
            {props.items.map(users => (
            <tr>
                <td>{users.email}</td>
                <td>{users.name}</td>
                <td>{users.firstname}</td>
                {usertype == "profs" &&
                <td>{users.role}</td>}
                {(usertype == "eleves" || usertype == "white-list-eleves") &&
                <td>{users.classyear}</td>}
                {usertype == "eleves" &&
                <td>{users.address}</td>}
                {usertype == "eleves" &&
                <td>{users.phonenumber}</td>}
                {usertype == "eleves" && users.birdthdate != null &&
                <td>{users.birdthdate.toString().substring(0, 10)}</td>}
            </tr>
            ))}
            </tbody>
        </table>
    </div>
    );
}

export default UsersList;