import React, {useContext} from 'react';

import { AuthContext } from '../common/context/auth-context';
import  { useHttpClient } from '../common/hooks/http-hook';
import Button from '../common/FormElements/Button';

import './Users.css';

const Users = props => {
    const auth = useContext(AuthContext);

    return (
        <React.Fragment>
            <div style={{textAlign: 'center'}}>
                <Button>White List Profs</Button>
                <Button>White List Élèves</Button>
                <Button>Comptes Élèves</Button>
                <Button>Comptes Profs</Button>
            </div>
        </React.Fragment>
    );
}

export default Users;