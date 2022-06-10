import React, {useContext} from 'react';

import {AuthContext} from '../../../common/context/auth-context';
import { useHttpClient } from '../../../common/hooks/http-hook';
import XLSXUpload from '../../../common/FormElements/XLSXUpload';
import Button from '../../../common/FormElements/Button';
import ErrorModal from '../../../common/UIElements/ErrorModal';
import LoadingSpinner from '../../../common/UIElements/LoadingSpinner';

import './AddExcel.css';

const AddExcel = props => {
    const auth = useContext(AuthContext);
	const {isLoading, error, sendRequest, clearError} = useHttpClient();


    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
			<br></br>
            <form className="excel-form">
                <h4 className='form-excel-title'>Ajouter des élèves de confiances via un fichier excel (.xlsx)</h4>
                {isLoading && <LoadingSpinner asOverlay />}
                <XLSXUpload />
            </form>
            <br></br>
            <div className="back-button">
                    <Button href={'/' + props.school + '/admin/utilisateurs/trusted-students'}>
                        Retour
                    </Button>
                    <br></br><br></br>
                </div>
        </React.Fragment>
    );
};

export default AddExcel;