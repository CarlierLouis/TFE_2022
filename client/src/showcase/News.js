import React, { useEffect, useState, useContext } from 'react';

import ErrorModal from '../common/UIElements/ErrorModal';
import LoadingSpinner from '../common/UIElements/LoadingSpinner';
import NewsList from './NewsList';
import  { useHttpClient } from '../common/hooks/http-hook';
import { AuthContext } from '../common/context/auth-context';

const News = props => {
    const auth = useContext(AuthContext);
    const [loadedNews, setLoadedNews] = useState();
    const {isLoading, error, sendRequest, clearError} = useHttpClient();

    useEffect(() => {
        const fetchnews = async () => {
            try {
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