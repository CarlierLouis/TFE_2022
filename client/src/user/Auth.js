import React, { useState, useContext } from 'react';

import { useHistory, useParams } from 'react-router-dom';
import Card from '../common/UIElements/Card';
import Button from '../common/FormElements/Button';
import Input from '../common/FormElements/Input';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../common/util/validators';
import { useForm } from '../common/hooks/form-hooks';
import { AuthContext } from '../common/context/auth-context';
import ErrorModal from '../common/UIElements/ErrorModal';
import LoadingSpinner from '../common/UIElements/LoadingSpinner';
import { useHttpClient } from '../common/hooks/http-hook';
import Modal from '../common/UIElements/Modal';
import MainNavigation from '../common/navigation/MainNavigation';

import Error404Page from '../common/UIElements/Error404Page';

import './Auth.css';


const Auth = props => {
    const auth = useContext(AuthContext);
    const [isLoginMode, setIsLoginMode] = useState(true);
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const history = useHistory();
    const usertype = useParams().usertype;
    const school = useParams().school;
    const [emailfornewpassword, setEmailfornewpassword] = useState();

    const [showQuestion, setShowQuestion] = useState(false);
    const [showLostedPasswordModal, setShowLostedPasswordModal] = useState(false);

    const openQuestionHandler = () => {
		setShowQuestion(true);
	};

	const closeQuestionHandler = () => {
		setShowQuestion(false);
	};

    const openLostedPasswordHandler = () => {
		setShowLostedPasswordModal(true);
	};

	const closeLostedPasswordHandler = () => {
		setShowLostedPasswordModal(false);
        setEmailfornewpassword("");
	};



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

    
    var usertyperequest;
    if (usertype == "prof") {
        var usertyperequest = "teachers";
    }

    if (usertype == "parent-eleve") {
        var usertyperequest = "students";
    }


     const authSubmitHandler = async event => {
        event.preventDefault();
         
        if (isLoginMode) {
            try {
                const responseData = await sendRequest(
                    process.env.REACT_APP_BACKEND_URL + `/api/${usertyperequest}/login`, 
                    'POST',
                    JSON.stringify({
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value,
                        school: school
                    }),
                    {'Content-Type': 'application/json'},
                );

                
                const responseData2 = await sendRequest( 
                    process.env.REACT_APP_BACKEND_URL + `/api/${usertyperequest}/${school}`,
                    'GET', null,
                    {Authorization: 'Bearer ' + auth.token});


            if (usertyperequest == "teachers") {
                responseData2.users.forEach(element => {
                if (element.id == responseData.userId) {
                    if (element.role == "Default") {
                        auth.login(responseData.userId , responseData.token, "Default", school); 
                    }
                    else if (element.role == "Admin") {
                        auth.login(responseData.userId , responseData.token, "Admin", school); 
                    }
                }
                });
            }
            else {
                auth.login(responseData.userId , responseData.token, "Student", school); 
            }   
        }

        catch(err) {

        }
        }
        else {
            try {
                const responseData = await sendRequest(
                    process.env.REACT_APP_BACKEND_URL + `/api/${usertyperequest}/signup`,
                    'POST',
                    JSON.stringify({
                        email: formState.inputs.email.value,
                        name: formState.inputs.name.value,
                        firstname: formState.inputs.firstname.value,
                        password : formState.inputs.password.value,
                        school: school,
                    }),
                    {'Content-Type': 'application/json'},
                );

                history.push('/' + school + '/info-email');
                
            }
            catch(err) {}

        }
    };



    const switchModeHandler = () => {
        if (!isLoginMode) {
            setFormData({
                ...formState.inputs,
                name: undefined,
                firstname: undefined
            }, 
            formState.inputs.email.isValid && formState.inputs.password.isValid);
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



    const newPasswordMailSubmitHandler = async event => {
		event.preventDefault();
		try {
			await sendRequest(
				process.env.REACT_APP_BACKEND_URL + `/api/${usertyperequest}/email-password`,
				'PATCH',
				JSON.stringify({
					email: emailfornewpassword,
				}),
				{
				'Content-Type': 'application/json',
                }
			);
            history.push('/' + school + '/connexion/' + usertype);
            setShowLostedPasswordModal(false);
            setEmailfornewpassword("");
		}
		catch(err) {
            setShowLostedPasswordModal(false);
            setEmailfornewpassword("");
        }
	};


    const handleChange = event => {
        setEmailfornewpassword(event.target.value);
    };



return (
<React.Fragment>
        {(school == "grand-hallet" || school == "moxhe") && 
        (usertype ==  "prof" || usertype == "parent-eleve") &&
        <div>


    {school == "grand-hallet" && 
    <MainNavigation schoolLink="grand-hallet"
                    schoolLogo="/svg/Grand-Hallet_blanc.svg" />}

    {school == "moxhe" && 
    <MainNavigation schoolLink="moxhe"
                    schoolLogo="/svg/Moxhe_blanc.svg" />}


    <Modal className='question-modal-auth'
        show={showQuestion}
        onCancel={closeQuestionHandler}
        footer={<Button onClick={closeQuestionHandler}>Fermer</Button>}>
            {usertype == "prof" && 
            <a>Vous devez vous connecter ou créer un compte afin d'accéder aux fonctionnalités dédiées 
                aux enseignants.
            </a>}

            {usertype == "parent-eleve" && 
            <a>Vous devez vous connecter ou créer un compte afin d'accéder aux fonctionnalités dédiées 
                aux élèves ainsi qu'à leurs parents.
            </a>}


            <br></br><br></br>
            <a style={{fontStyle: 'italic', fontSize: '18px'}}>
                * La création de compte est dédiée au élèves inscrits ainsi qu'aux membres du personnel enseignant.
            </a>
    </Modal>


    
    <Modal className='question-modal-auth'
        show={showLostedPasswordModal}
        onCancel={closeLostedPasswordHandler}
        footer={
            <React.Fragment>
            <div style={{textAlign: 'center'}}>
                <p>Vous ne vous souvenez plus de votre mot de passe ? 
                <br></br>Entrez votre adresse email dans le champ suivant pour recevoir un email 
                afin de modifier votre mot de passe.</p>
                
                <input type="text" id="emailfornewpassword" 
                onChange={handleChange} value={emailfornewpassword}/>
                <br></br><br></br>
                <Button onClick={newPasswordMailSubmitHandler}>Valider</Button>
            </div>
            <br></br>
            <Button onClick={closeLostedPasswordHandler}>Fermer</Button>
        </React.Fragment>
        }>
        
    </Modal>



    <ErrorModal error={error} onClear={clearError}/>    
    <br></br><br></br><br></br>
    <Card className="auth-card">
        {isLoading && <LoadingSpinner asOverlay/>}
        <img className='question-auth' src='/svg/info.svg' onClick={openQuestionHandler} ></img>
        <h2 className='auth-title'>{isLoginMode ? 'Se connecter': 'S\'inscrire'}</h2>
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

        {!isLoginMode && 
        <Input 
        element="input" 
        id="name" 
        type="text" 
        label="Nom" 
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Veillez entrer un nom."
        onInput={inputHandler}
        />
        }

        {!isLoginMode && 
        <Input 
        element="input"
        id="firstname" 
        type="text" 
        label="Prénom" 
        validators={[VALIDATOR_REQUIRE()]} 
        errorText="Veillez entrer un prénom."
        onInput={inputHandler}
        />
        }

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

        <br></br><br></br>

        {isLoginMode &&
        <button onClick={openLostedPasswordHandler} className='losted-password'>Mot de passe oublié ?</button>}
    </Card>
    
    
    
    </div>}

    {(school != "grand-hallet" && school != "moxhe") &&
    <Error404Page />}

    {(usertype !=  "prof" && usertype != "parent-eleve") &&
    <Error404Page/>}

</React.Fragment>
    );
};

export default Auth;
