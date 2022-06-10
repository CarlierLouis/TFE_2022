import React, { useEffect, useState, useContext } from 'react';

import { AuthContext } from '../../common/context/auth-context';
import  { useHttpClient } from '../../common/hooks/http-hook';
import { useParams } from "react-router-dom";
import UsersList from './UsersList';
import LoadingSpinner from '../../common/UIElements/LoadingSpinner';
import SearchBar from '../../common/UIElements/SearchBar';
import UsersTable from './UsersTable';
import './Users.css';
import { render } from '@testing-library/react';


const Users = props => {
    const auth = useContext(AuthContext);
    const [loadedUsers, setLoadedUsers] = useState();
    const [loadedUsersSearch, setLoadedUsersSearch] = useState(loadedUsers);
    const {isLoading, sendRequest} = useHttpClient();
    const usertype = useParams().usertype;
    const [selected, setSelected] = useState();
    const [table, setTable] = useState(false);

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


    const onChangedSelect = () => {
        setSelected(document.getElementById('option-select').value);
    }

    const onClickTable = () => {
        setTable(true)
    }

    const onClickList = () => {
        setTable(false)
    }

    return (
        <React.Fragment>
            
            {usertype != null && usertype != "" && table == false &&
            <a onClick={onClickTable}>
                <img className='table-logo' src='/svg/table.svg'></img>
            </a>}

            {usertype != null && usertype != "" && table == true &&
            <a onClick={onClickList}>
                <img className='list-logo' src='/svg/list.svg'></img>
            </a>}

            {(usertype == "trusted-students" || usertype == "trusted-teachers") &&
            <a href={`/${props.school}/admin/add-user/` + usertype}>
                <img className='red-plus-add-user' src='/svg/red-plus.svg'></img>
            </a>}
            
            {usertype == "trusted-students" &&
            <a href={`/${props.school}/admin/add-excel/trusted-students`}>
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

            {usertype != null && 
            <div className='search-bar-div'>
                <select name="option" id="option-select" onChange={onChangedSelect}>
                    <option value="">--Option de recherche--</option>
                    <option value="email">Email</option>
                    <option value="name">Nom</option>
                    <option value="firstname">Prénom</option>
                    {(usertype == "students" || usertype == "trusted-students") &&
                    <option value="classyear">Classe</option>}
                 </select>

                {(selected == ""  || selected == null) && 
                <SearchBar className='search-bar search-bar-default' filterField={(item) => item.email}
                 list={loadedUsers} setList={setLoadedUsersSearch} placeholder="Sélectionner une option de recherche..." disabled />}

                {selected == "email" && 
                <SearchBar className='search-bar' filterField={(item) => item.email}
                 list={loadedUsers} setList={setLoadedUsersSearch} placeholder="Rechercher..." />}

                {selected == "name" && 
                <SearchBar className='search-bar' filterField={(item) => item.name}
                 list={loadedUsers} setList={setLoadedUsersSearch} placeholder="Rechercher..." />}

                {selected == "firstname" && 
                <SearchBar className='search-bar' filterField={(item) => item.firstname}
                 list={loadedUsers} setList={setLoadedUsersSearch} placeholder="Rechercher..." />}

                {selected == "classyear" && 
                <SearchBar className='search-bar' filterField={(item) => item.classyear}
                 list={loadedUsers} setList={setLoadedUsersSearch} placeholder="Rechercher..." />}

            </div>}

            <br></br>

            {isLoading && 
            <div className='center'>
                <LoadingSpinner />
            </div>}

            {!isLoading && loadedUsersSearch == null && loadedUsers && table == false &&
            <UsersList items={loadedUsers} school={props.school}/>}


            {!isLoading && loadedUsersSearch && table == false &&
            <UsersList items={loadedUsersSearch} school={props.school}/>}



            {!isLoading && loadedUsersSearch == null && loadedUsers && table == true &&
            <UsersTable items={loadedUsers}/>}

            {!isLoading && loadedUsersSearch && table == true &&
            <UsersTable items={loadedUsersSearch}/>}  

        </React.Fragment>
    );
}

export default Users;