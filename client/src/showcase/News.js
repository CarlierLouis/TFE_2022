import React, { useEffect, useState } from 'react';

import ErrorModal from '../common/UIElements/ErrorModal';
import LoadingSpinner from '../common/UIElements/LoadingSpinner';
import NewsList from './NewsList';

const News = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [loadedNews, setLoadedNews] = useState();

    useEffect(() => {
        const sendRequest = async () => {
            setIsLoading(true);
            try {
            const response = await fetch(`http://localhost:5000/api/news/${props.school}`);

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message);
            }

            setLoadedNews(responseData.news);
            }
            catch (err) {
                setIsLoading(false);
                setError(err.message);
            }
            setIsLoading(false);
        };
        sendRequest();
    }, []);

    const errorHandler = () => {
        setError(null);
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={errorHandler} />
            {isLoading && 
            <div className='center'>
                <LoadingSpinner />
            </div>}
            {!isLoading && loadedNews && <NewsList items={loadedNews} />}
        </React.Fragment>
    );
}

export default News;