import React, { useEffect, useState, useContext } from 'react';

import ErrorModal from '../common/UIElements/ErrorModal';
import LoadingSpinner from '../common/UIElements/LoadingSpinner';
import NewsList from './NewsList';
import  { useHttpClient } from '../common/hooks/http-hook';
import { AuthContext } from '../common/context/auth-context';
import Modal from '../common/UIElements/Modal';
import Button from '../common/FormElements/Button';

import './News.css';

const News = props => {
    const auth = useContext(AuthContext);
    const [loadedNews, setLoadedNews] = useState();
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    
    const [showQuestion, setShowQuestion] = useState(false);

    const openQuestionHandler = () => {
		setShowQuestion(true);
	};

	const closeQuestionHandler = () => {
		setShowQuestion(false);
	};

    useEffect(() => {
        const fetchnews = async () => {
            try {
            //const responseData = await sendRequest(`http://localhost:5000/api/news/${props.school}`);
            const responseData = await sendRequest(`http://localhost:5000/api/news/${props.school}`, 'GET', null,
            {Authorization: 'Bearer ' + auth.token});
            setLoadedNews(responseData.news);
            console.log(auth.userId);
            console.log(auth.token);
        }
            catch(err) {}
        };
        fetchnews();
      }, [sendRequest]);


    return (
        <React.Fragment>
            <img className='question-actu' src='/svg/question.gif'onClick={openQuestionHandler} ></img>

            <Modal className='question-modal'
				show={showQuestion}
				onCancel={closeQuestionHandler}
				footer={<Button onClick={closeQuestionHandler}>Fermer</Button>}>
                    Vous retrouverez sur cette page toutes les informations concernants l'actualité de l'école
                    ainsi que les différents événements relatifs à celle-ci.

            </Modal>

            <ErrorModal error={error} onClear={clearError} />
            {isLoading && 
            <div className='center'>
                <LoadingSpinner />
            </div>}
            {!isLoading && loadedNews && <NewsList items={loadedNews} />}
        </React.Fragment>
    );
}

export default News;