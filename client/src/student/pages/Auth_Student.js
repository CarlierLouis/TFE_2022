import React from 'react';
import Card from '../../common/UIElements/Card';
import Button from '../../common/FormElements/Button';
import Input from '../../common/FormElements/Input';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from '../../common/util/validators';
import { useForm } from '../../common/hooks/form-hooks';

import './Auth_Student.css';

const Auth_Student = () => {
    const [formState, inputHandler] = useForm ({ 
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

    return (
        <Card className="student_auth">
            <h2></h2>
            <form className='auth_student' onSubmit={authSubmitHandler}>
                <Input element="input" id="email" type="email" label="E-Mail"
                validators= {[VALIDATOR_EMAIL()]}
                errorText="Veillez entrer un email valide."
                onInput={inputHandler} />

                <Input element="input" id="password" type="password" label="Password"
                validators= {[VALIDATOR_MINLENGTH(5)]}
                errorText="Veillez entrer un mot de passe valide."
                onInput={inputHandler} />
            <Button type="submit" disabled={!formState.isValid}>Se connecter</Button>
            </form>
        </Card>
    );
};

export default Auth_Student;
