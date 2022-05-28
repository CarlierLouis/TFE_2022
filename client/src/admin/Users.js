import React, { useEffect, useState, useContext } from 'react';

import { AuthContext } from '../common/context/auth-context';
import  { useHttpClient } from '../common/hooks/http-hook';
import { useParams } from "react-router-dom";
import Button from '../common/FormElements/Button';
import UsersList from './UsersList';
import LoadingSpinner from '../common/UIElements/LoadingSpinner';
import './Users.css';


const Users = props => {
    const auth = useContext(AuthContext);
    const [loadedUsers, setLoadedUsers] = useState();
    const {isLoading, sendRequest} = useHttpClient();
    const usertype = useParams().usertype;
    
    useEffect(() => {
        const fetchusers = async () => {
            if (usertype != undefined) {
            try {
                const responseData =  await sendRequest(
                    process.env.REACT_APP_BACKEND_URL + `/api/${usertype}/${props.school}`, 'GET', null,
                    {Authorization: 'Bearer ' + auth.token}
                );
                if (usertype == "teachers") {
                setLoadedUsers(responseData.teachers);
                }

                if (usertype == "students") {
                    setLoadedUsers(responseData.students);
                }
                
                if (usertype == "trusted-teachers") {
                    setLoadedUsers(responseData.trustedteachers);
                }
                  
                if (usertype == "trusted-students") {
                    setLoadedUsers(responseData.trustedstudents);
                }
                
            }
            catch (err) {}
        }
        };
        fetchusers();
    }, [sendRequest])

    return (
        <React.Fragment>
            <div className="select-user">
                <Button href={"/" + props.school + "/admin/utilisateurs/trusted-teachers"}>White List Profs</Button>
                <Button href={"/" + props.school + "/admin/utilisateurs/trusted-students"}>White List Élèves</Button>
                <Button href={"/" + props.school + "/admin/utilisateurs/students"}>Comptes Élèves</Button>
                <Button href={"/" + props.school + "/admin/utilisateurs/teachers"}>Comptes Profs</Button>
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