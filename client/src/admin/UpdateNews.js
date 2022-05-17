import React, {useContext} from 'react';
import {useHistory} from 'react-router-dom';

import Input from '../common/FormElements/Input';
import Button from '../common/FormElements/Button';
import ErrorModal from '../common/UIElements/ErrorModal';
import LoadingSpinner from '../common/UIElements/LoadingSpinner';
import {VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH} from '../common/util/validators';
import { useForm } from '../common/hooks/form-hooks';
import { useHttpClient } from '../common/hooks/http-hook';
import {AuthContext} from '../common/context/auth-context';
import ImageUpload from '../common/FormElements/ImageUpload';

import './News.css';

const NewNews = props => {
    const auth = useContext(AuthContext);
    const NewsId = useParams().NewsId;
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedNews, setLoadedNews] = useState();
	const history = useHistory();

    const [formState, inputHandler, setFormData] = useForm(
		{
		title: {
			value: '',
			isValid: false
		},
		description: {
			value: '',
			isValid: false
		},
        date: {
			value: '',
			isValid: false
		},
        image: {
			value: null,
			isValid: false
		}
		},
		false
	);

        
}