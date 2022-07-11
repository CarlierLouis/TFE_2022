import React, {useContext, useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';

import Input from '../../common/FormElements/Input';
import Button from '../../common/FormElements/Button';
import ErrorModal from '../../common/UIElements/ErrorModal';
import LoadingSpinner from '../../common/UIElements/LoadingSpinner';
import {VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH, VALIDATOR_MAXLENGTH} from '../../common/util/validators';
import { useForm } from '../../common/hooks/form-hooks';
import { useHttpClient } from '../../common/hooks/http-hook';
import {AuthContext} from '../../common/context/auth-context';
import Card from '../../common/UIElements/Card';
import MainNavigation from '../../common/navigation/MainNavigation';

const updateEvent = props => {
    const auth = useContext(AuthContext);
    const eventId = useParams().eventId;
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedEvent, setLoadedEvent] = useState();
	const history = useHistory();
	const school = useParams().school;

    return (
        <React.Fragment>
             {school == "grand-hallet" && 
            <MainNavigation schoolLink="grand-hallet"
                            schoolLogo="/svg/Grand-Hallet_blanc.svg" />}

            {school == "moxhe" && 
            <MainNavigation schoolLink="moxhe"
                            schoolLogo="/svg/Moxhe_blanc.svg" />}
                            
        </React.Fragment>
    )
}

export default updateEvent;