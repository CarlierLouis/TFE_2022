import React, { useState } from 'react';
import { useParams, useHistory } from "react-router-dom";
import { useHttpClient } from '../../common/hooks/http-hook';
import Button from '../FormElements/Button';
import ErrorModal from '../UIElements/ErrorModal';

import './NewPassword.css';

const NewPassword = props => {
    const confirmationCode = useParams().confirmationCode;
    const usertype = useParams().usertype;
    const history = useHistory();
    const {sendRequest, error, clearError} = useHttpClient();
    const [newpassword, setNewpassword] = useState();
    

    const submitNewPasswordHandler = async event => {
        event.preventDefault();
        try {
            await sendRequest( 
                process.env.REACT_APP_BACKEND_URL + `/api/${usertype}/new-password/` + confirmationCode, 
                'PATCH',
                JSON.stringify({
                    password: newpassword,
                }),
                {'Content-Type': 'application/json'}
                );
                
                history.push('/');
                setNewpassword("");
            }
        catch (err) {
            setNewpassword("");
        }
    };


    const handleChange = event => {
        setNewpassword(event.target.value);
    };
    

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError}/> 
            <div className="new-password-div">
                <h2>Veuillez introduire votre nouveau mot de passe:</h2>
                <input type="password" id="newpassword" 
                onChange={handleChange} value={newpassword}/>
                <br></br><br></br>
                <Button onClick={submitNewPasswordHandler} disabled={!newpassword || newpassword.length < 8}>Valider</Button>
            </div>
        </React.Fragment>
    );
};

export default NewPassword;