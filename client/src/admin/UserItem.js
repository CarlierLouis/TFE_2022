import React, { useState, useContext } from "react";
import { AuthContext } from '../common/context/auth-context';
import { useHttpClient } from '../common/hooks/http-hook';
import ErrorModal from "../common/UIElements/ErrorModal";
import Card from "../common/UIElements/Card";
import Modal from "../common/UIElements/Modal";
import Button from "../common/FormElements/Button";
import { useParams } from "react-router-dom";
import './UserItem.css';

const UserItem = props => {
    const auth = useContext(AuthContext);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const {error, sendRequest, clearError} = useHttpClient();
    const usertype = useParams().usertype;

    const showDeleteWarningHandler = () => {
		setShowConfirmModal(true);
	};

	const cancelDeleteHandler = () => {
		setShowConfirmModal(false);
	};

    const confirmDeleteHandler = async () => {
		setShowConfirmModal(false);
		try {
			await sendRequest(
				process.env.REACT_APP_BACKEND_URL + `/api/${usertype}/${props.id}`,
				'DELETE',
				null,
				{Authorization: 'Bearer ' + auth.token}
			);
			props.onDelete(props.id);
		}
		catch(err) {}

    if (!error) {
    refreshPage();
    }
	};

  const refreshPage = ()=>{
    window.location.reload(true);
 }


    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />

            <Modal 
            show={showConfirmModal}
            onCancel={cancelDeleteHandler}
            header="Êtes-vous sûr(e) ?" 
            footerClass="user-item__modal-actions" 
            footer={
                <React.Fragment>
                    <Button inverse onClick={cancelDeleteHandler}>Annuler</Button>
                    <Button danger onClick={confirmDeleteHandler}>Supprimer</Button>
                </React.Fragment>
				  }>
				<p>
				Êtes-vous certain(e) de vouloir supprimer cet utilisateur ?
				Cette action entraînera la suppression irréversible de celui-ci !
				</p>
			</Modal>

            <div className="user-item center">
                <Card className="user-item-card">
                    <img className="user-modify" src="/svg/modify-red.svg"/>
                    <p className="user-name">{props.name}</p>
                    <p className="user-firstname">{props.firstname}</p>
                    <p className="user-email">{props.email}</p>
                    <img onClick={showDeleteWarningHandler} className="user-delete" src="/svg/delete-red.svg"/>
                    <p className="user-role">{props.role}</p>
                    <p className="user-classyear">{props.classyear}</p>
                </Card>
            </div>
        </React.Fragment>
    );
};

export default UserItem;