import React, { useEffect, useState, useContext } from 'react';

import { AuthContext } from '../common/context/auth-context';
import  { useHttpClient } from '../common/hooks/http-hook';
import Button from '../common/FormElements/Button';

import './Users.css';

const Users = props => {
    const auth = useContext(AuthContext);
    const {sendRequest} = useHttpClient();
  
    


    return (
        <React.Fragment>
            <div className="select-user">
                <Button>White List Profs</Button>
                <Button>White List Élèves</Button>
                <Button>Comptes Élèves</Button>
                <Button>Comptes Profs</Button>
            </div>
            <p></p>
        </React.Fragment>
    );
}

export default Users;