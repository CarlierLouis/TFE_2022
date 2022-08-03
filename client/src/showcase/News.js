import React, { useEffect, useState, useContext } from 'react';

import ErrorModal from '../common/UIElements/ErrorModal';
import LoadingSpinner from '../common/UIElements/LoadingSpinner';
import NewsList from './NewsList';
import  { useHttpClient } from '../common/hooks/http-hook';
import { AuthContext } from '../common/context/auth-context';
import { useParams } from 'react-router-dom';
import MainNavigation from '../common/navigation/MainNavigation';

import './News.css';
import '../admin/News/News.css';

const News = props => {
    const auth = useContext(AuthContext);
    const [loadedNews, setLoadedNews] = useState();
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const school = useParams().school;

    useEffect(() => {
        const fetchnews = async () => {
            try {
            //const responseData = await sendRequest(`http://localhost:5000/api/news/${props.school}`);
            const responseData = await sendRequest(
                process.env.REACT_APP_BACKEND_URL + `/api/news/${school}`, 'GET', null,
            {Authorization: 'Bearer ' + auth.token});
            setLoadedNews(responseData.news);
            //console.log(auth.userId);
            //console.log(auth.token);

            //
            /*responseData.news.forEach(element => {
                if (element.title == "aaaaa") {
                  console.log("ok");
                }
            });*/
            }
            catch(err) {}
        };
        fetchnews();
      }, [sendRequest]);



    return (
        <React.Fragment>
            {school == "grand-hallet" && 
                <MainNavigation schoolLink="grand-hallet"
                                schoolLogo="/svg/Grand-Hallet_blanc.svg" />}

            {school == "moxhe" && 
            <MainNavigation schoolLink="moxhe"
                            schoolLogo="/svg/Moxhe_blanc.svg" />}
            
            <ErrorModal error={error} onClear={clearError} />

            {auth.isLoggedIn && auth.role == "Admin" && window.location.pathname !=`/${school}` &&
            <a href={`/${school}/actualites/admin/ajouter-actualite`}>
                <img className='red-plus-add-news' src='/svg/red-plus.svg'></img>
            </a>}

            {isLoading && 
            <div className='center'>
                <LoadingSpinner />
            </div>}
            {!isLoading && loadedNews && 
            <NewsList items={loadedNews.slice(0,parseInt(props.numberofnews))} school={school} 
            />}
        </React.Fragment>
    );
}

export default News;