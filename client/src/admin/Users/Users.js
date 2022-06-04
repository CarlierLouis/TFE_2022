import React, { useEffect, useState, useContext } from 'react';

import { AuthContext } from '../../common/context/auth-context';
import  { useHttpClient } from '../../common/hooks/http-hook';
import { useParams } from "react-router-dom";
import UsersList from './UsersList';
import LoadingSpinner from '../../common/UIElements/LoadingSpinner';
import './Users.css';


const Users = props => {
    const auth = useContext(AuthContext);
    const [loadedUsers, setLoadedUsers] = useState();
    const {isLoading, sendRequest} = useHttpClient();
    const usertype = useParams().usertype;

    if (usertype == "teachers") {
        var teachersButton = {backgroundColor: "#628699", border: "#628699"}
    }
    if (usertype == "students") {
        var studentsButton = {backgroundColor: "#628699", border: "#628699"}
    }
    if (usertype == "trusted-teachers") {
        var trustedteachersButton = {backgroundColor: "#628699", border: "#628699"}
    }
    if (usertype == "trusted-students") {
        var trustedstudentsButton = {backgroundColor: "#628699", border: "#628699"}
    }

    useEffect(() => {
        const fetchusers = async () => {
            if (usertype != undefined) {
            try {
                const responseData =  await sendRequest(
                    process.env.REACT_APP_BACKEND_URL + `/api/${usertype}/${props.school}`, 'GET', null,
                    {Authorization: 'Bearer ' + auth.token}
                );
                
                setLoadedUsers(responseData.users);
                
            }
            catch (err) {}
        }
        };
        fetchusers();
    }, [sendRequest])


    return (
        <React.Fragment>
            {(usertype == "trusted-students" || usertype == "trusted-teachers") &&
            <a href={`/${props.school}/admin/add-user/` + usertype}>
                <img className='red-plus-add-user' src='/svg/red-plus.svg'></img>
            </a>}
            
            {usertype == "trusted-students" &&
            <a href={`/${props.school}/admin/add-user/` + usertype}>
                <img className='excel-logo' src='/svg/excel.svg'></img>
            </a>}

            <div className="select-user">
                <a style={studentsButton} href={"/" + props.school + "/admin/utilisateurs/students"}>
                Comptes Élèves</a>
                <a style={teachersButton} href={"/" + props.school + "/admin/utilisateurs/teachers"}>
                Comptes Profs</a>
                <a style={trustedteachersButton} href={"/" + props.school + "/admin/utilisateurs/trusted-teachers"}>
                White List Profs</a>
                <a style={trustedstudentsButton} href={"/" + props.school + "/admin/utilisateurs/trusted-students"}>
                White List Élèves</a>
            </div>

            <br></br>

            {isLoading && 
            <div className='center'>
                <LoadingSpinner />
            </div>}
            {!isLoading && loadedUsers &&
            <UsersList items={loadedUsers.reverse()} school={props.school} />}
        </React.Fragment>
    );
}

export default Users;