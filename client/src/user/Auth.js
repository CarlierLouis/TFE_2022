import React, { useState     } from 'react';
import Card from '../common/UIElements/Card';
import Button from '../common/FormElements/Button';
import Input from '../common/FormElements/Input';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../common/util/validators';
import { useForm } from '../common/hooks/form-hooks';

import './Auth.css';

const Auth = props => {
    const [isLoginMode, setIsLoginMode] = useState(true);
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

     const authSubmitHandler = event => {
         event.preventDefault();
         console.log(formState.inputs);
     }

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


return (
<div>
<h4 className='auth-title'>{props.connexiontitle_1}<br></br>{props.connexiontitle_2}</h4>
    <Card className="auth-card">
        <h2>Connexion</h2>
        <form className='auth-card' onSubmit={authSubmitHandler}>

        <Input 
        element="input" 
        id="email" 
        type="email" 
        label="E-Mail"
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
        label="Password"
        validators= {[VALIDATOR_MINLENGTH(5)]}
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
</div>
    );
};

export default Auth;
