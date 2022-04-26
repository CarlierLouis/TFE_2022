import React, { useState, useContext } from 'react';
import Card from '../common/UIElements/Card';
import Button from '../common/FormElements/Button';
import Input from '../common/FormElements/Input';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../common/util/validators';
import { useForm } from '../common/hooks/form-hooks';
import { AuthContext } from '../common/context/auth-context';
import ErrorModal from '../common/UIElements/ErrorModal';
import LoadingSpinner from '../common/UIElements/LoadingSpinner';

import './Auth.css';

const Auth = props => {
    const auth = useContext(AuthContext);
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const [formState, inputHandler, setFormData] = useForm ({ 
        email: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        }
     }, false);


     const switchModeHandler = () => {
        if (!isLoginMode) {
            setFormData({
                ...formState.inputs,
                name: undefined,
                firstname: undefined 
            }, formState.inputs.email.isValid && formState.inputs.password.isValid);
        }
        else {
            setFormData({
                ...formState.inputs,
                name: {
                    value: '',
                    isValid: false
                },
                firstname: {
                    value: '',
                    isValid: false
                }
            }, false);
        }
       setIsLoginMode(prevMode => !prevMode)
    };



     const authSubmitHandler = async event => {
        event.preventDefault();
         
        if (isLoginMode) {

        }
        else {
        try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:5000/api/${props.usertype}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: formState.inputs.email.value,
                name: formState.inputs.name.value,
                firstname: formState.inputs.firstname.value,
                password : formState.inputs.password.value,
                school: props.schoolname
            })
        });

        const responseData = await response.json();
        if (!response.ok) {
            throw new Error(responseData.message);
        }
        console.log(responseData);
        setIsLoading(false);
        auth.login();
        } 
        catch(err) {
            setIsLoading(false);
            setError(err.message || 'Quelque chose ne s\'est pas passé comme prévu, veuillez réessayer');
            }
        } 
     };

     const errorHandler = () => {
        setError(null);
    };


return (
<React.Fragment>
<ErrorModal error={error} onClear={errorHandler}/>
<h4 className='auth-title'>{props.connexiontitle_1}<br></br>{props.connexiontitle_2}</h4>
    <Card className="auth-card">
        {isLoading && <LoadingSpinner asOverlay/>}
        <h2>Connexion requise</h2>
        <hr />
        <form className='auth-card' onSubmit={authSubmitHandler}>

        <Input 
        element="input" 
        id="email" 
        type="email" 
        label="E-mail"
        validators= {[VALIDATOR_EMAIL()]}
        errorText="Veillez entrer un email valide."
        onInput={inputHandler}
         />

        {!isLoginMode && (
        <Input 
        element="input" 
        id="name" 
        type="text" 
        label="Nom" 
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Veillez entrer un nom"
        onInput={inputHandler}
        />
        )}

        {!isLoginMode && (
        <Input 
        element="input"
        id="firstname" 
        type="text" 
        label="Prénom" 
        validators={[VALIDATOR_REQUIRE()]} 
        errorText="Veillez entrer un prénom"
        onInput={inputHandler}
        />
        )}

        <Input 
        element="input" 
        id="password" 
        type="password" 
        label="Mot de passe"
        validators= {[VALIDATOR_MINLENGTH(8)]}
        errorText="Veillez entrer un mot de passe valide."
        onInput={inputHandler} 
        />

        <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? 'Se connnecter': 'Créer un compte'}
        </Button>
        
        </form>

        <Button inverse onClick={switchModeHandler}>
            {isLoginMode ? 'Créer un compte': 'Se connecter'}  

        </Button>
    </Card>

</React.Fragment>
    );
};

export default Auth;
