import React, { useEffect, useState, useContext } from 'react';

import { AuthContext } from '../common/context/auth-context';
import  { useHttpClient } from '../common/hooks/http-hook';
import Button from '../common/FormElements/Button';
import UsersList from './UsersList';
import LoadingSpinner from '../common/UIElements/LoadingSpinner';
import './Users.css';


const Users = props => {
    const auth = useContext(AuthContext);
    const [loadedUsers, setLoadedUsers] = useState();
    const {isLoading, sendRequest} = useHttpClient();
  
    useEffect(() => {
        const fetchusers = async () => {
            try {
                const responseData =  await sendRequest(
                    process.env.REACT_APP_BACKEND_URL + `/api/teachers/${props.school}`, 'GET', null,
                    {Authorization: 'Bearer ' + auth.token}
                );
                setLoadedUsers(responseData.teachers);
            }
            catch (err) {}
        };
        fetchusers();
    }, [sendRequest])


    return (
        <React.Fragment>
            <div className="select-user">
                <Button>White List Profs</Button>
                <Button>White List Élèves</Button>
                <Button>Comptes Élèves</Button>
                <Button>Comptes Profs</Button>
            </div>
            <br></br>
            {isLoading && 
            <div className='center'>
                <LoadingSpinner />
            </div>}
            {!isLoading && loadedUsers &&
            <UsersList items={loadedUsers} />}
        </React.Fragment>
    );
}

export default Users;