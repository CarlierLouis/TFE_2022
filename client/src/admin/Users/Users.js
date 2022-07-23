import React, { useEffect, useState, useContext } from 'react';

import { AuthContext } from '../../common/context/auth-context';
import  { useHttpClient } from '../../common/hooks/http-hook';
import { useParams } from "react-router-dom";
import UsersList from './UsersList';
import LoadingSpinner from '../../common/UIElements/LoadingSpinner';
import SearchBar from '../../common/UIElements/SearchBar';
import UsersTable from './UsersTable';
import './Users.css';
import MainNavigation from '../../common/navigation/MainNavigation';


const Users = props => {
    const auth = useContext(AuthContext);
    const [loadedUsers, setLoadedUsers] = useState();
    const [loadedUsersSearch, setLoadedUsersSearch] = useState(loadedUsers);
    const {isLoading, sendRequest} = useHttpClient();
    const usertype = useParams().usertype;
    const [selected, setSelected] = useState();
    const [table, setTable] = useState(false);
    const school = useParams().school;

    if (usertype == "profs") {
        var teachersButton = {backgroundColor: "#628699", border: "#628699"}
        var usertyperequest = "teachers";
    }
    if (usertype == "eleves") {
        var studentsButton = {backgroundColor: "#628699", border: "#628699"}
        var usertyperequest = "students";
    }
    if (usertype == "white-list-profs") {
        var trustedteachersButton = {backgroundColor: "#628699", border: "#628699"}
        var usertyperequest = "trusted-teachers";
    }
    if (usertype == "white-list-eleves") {
        var trustedstudentsButton = {backgroundColor: "#628699", border: "#628699"}
        var usertyperequest = "trusted-students";
    }


    useEffect(() => {
        const fetchusers = async () => {
            if (usertype != undefined) {
            try {
                const responseData =  await sendRequest(
                    process.env.REACT_APP_BACKEND_URL + `/api/${usertyperequest}/${school}`, 'GET', null,
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

            {school == "grand-hallet" && 
                <MainNavigation schoolLink="grand-hallet"
                                schoolLogo="/svg/Grand-Hallet_blanc.svg" />}

            {school == "moxhe" && 
            <MainNavigation schoolLink="moxhe"
                            schoolLogo="/svg/Moxhe_blanc.svg" />}
                    
            {usertype != null && usertype != "" && table == false &&
            <a onClick={onClickTable}>
                <img className='table-logo' src='/svg/table.svg'></img>
            </a>}

            {usertype != null && usertype != "" && table == true &&
            <a onClick={onClickList}>
                <img className='list-logo' src='/svg/list.svg'></img>
            </a>}

            {(usertype == "white-list-eleves" || usertype == "white-list-profs") &&
            <a href={`/${school}/admin/utilisateurs/ajouter-utilisateur/` + usertype}>
                <img className='red-plus-add-user' src='/svg/red-plus.svg'></img>
            </a>}
            
            {usertype == "white-list-eleves" &&
            <a href={`/${school}/admin/utilisateurs/ajouter-excel/white-list-eleves`}>
                <img className='excel-logo' src='/svg/excel.svg'></img>
            </a>}

            <div className="select-user">
                <a style={studentsButton} href={"/" + school + "/admin/utilisateurs/eleves"}>
                Comptes Élèves</a>
                <a style={teachersButton} href={"/" + school + "/admin/utilisateurs/profs"}>
                Comptes Profs</a>
                <a style={trustedteachersButton} href={"/" + school + "/admin/utilisateurs/white-list-profs"}>
                White List Profs</a>
                <a style={trustedstudentsButton} href={"/" + school + "/admin/utilisateurs/white-list-eleves"}>
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
                    {(usertype == "eleves" || usertype == "white-list-eleves") &&
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

            {!isLoading && loadedUsersSearch == null && loadedUsers && table == false && usertype != null &&
            <UsersList items={loadedUsers} school={school}/>}


            {!isLoading && loadedUsersSearch && table == false && usertype != null &&
            <UsersList items={loadedUsersSearch} school={school}/>}



            {!isLoading && loadedUsersSearch == null && loadedUsers && table == true && usertype != null &&
            <UsersTable items={loadedUsers} school={school}/>}

            {!isLoading && loadedUsersSearch && table == true && usertype != null &&
            <UsersTable items={loadedUsersSearch} school={school}/>} 


            
        </React.Fragment>
    );
}

export default Users;