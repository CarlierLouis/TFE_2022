import React from 'react';

import Card from './Card';
import Button from '../FormElements/Button';

import './Error404Page.css';
import { useParams, useHistory } from 'react-router-dom';

const Error404Page = props => {
    const school = useParams().school;
    const history = useHistory();

    return (
        <React.Fragment>
            
        <Card className="error-404-Card">
        <h1>404</h1>

        <h2>Page non trouvée</h2>
        <div className="back-button">
                <Button onClick={() => history.goBack()}>
                    Retour
                </Button>
        </div>


        </Card>

        </React.Fragment>
    )
}

export default Error404Page;