import React from "react";

import Card from "../common/UIElements/Card";
import './UserItem.css';

const UserItem = props => {
    

    return (
        <React.Fragment>
            <div className="user-item center">
                <Card className="user-item-card">
                    <p className="user-name">{props.name}</p>
                    <p className="user-firstname">{props.firstname}</p>
                    <p className="user-email">{props.email}</p>
                    <p className="user-role">{props.role}</p>
                    <p className="user-classyear">{props.classyear}</p>
                </Card>
            </div>
        </React.Fragment>
    );
};

export default UserItem;