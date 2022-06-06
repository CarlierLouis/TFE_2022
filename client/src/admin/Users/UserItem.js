import React, { useState, useContext } from "react";
import { AuthContext } from '../../common/context/auth-context';
import { useHttpClient } from '../../common/hooks/http-hook';
import ErrorModal from "../../common/UIElements/ErrorModal";
import Card from "../../common/UIElements/Card";
import Modal from "../../common/UIElements/Modal";
import Button from "../../common/FormElements/Button";
import { useParams } from "react-router-dom";
import './UserItem.css';

const UserItem = props => {
    const auth = useContext(AuthContext);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const {error, sendRequest, clearError} = useHttpClient();
    const usertype = useParams().usertype;
    const [showMore, setShowMore] = useState(false);
    const [displayLogoHover, setDisplayLogoHover] = useState({display: 'none'});

    const showDeleteWarningHandler = () => {
		setShowConfirmModal(true);
	};

	const cancelDeleteHandler = () => {
		setShowConfirmModal(false);
	};

    const openMoreHandler = () => {
        setShowMore(true);
      };
    
    const closeMoreHandler = () => {
      setShowMore(false);
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


    var role_background = {}
    if (props.role == 'Admin') {
        role_background = {
            backgroundColor: '#F5B7B1'
        }
    }


    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />

            {usertype == "students" && 
            <Modal
            show={showMore}
            onCancel={closeMoreHandler}
            footer={<Button onClick={closeMoreHandler}>Fermer</Button>}>
            
            <a href={`/${props.school}/admin/update-user/${usertype}/${props.id}`}>
                <img className="user-modify" src="/svg/modify-red.svg" />
            </a>
            
            <div className="full-info-user">
                <div className="full-info-user-elem">
                    <p className="full-info-user-elem-title">Nom: &nbsp;</p>
                    <p>{props.name}</p>
                </div>
                <div className="full-info-user-elem">
                    <p className="full-info-user-elem-title">Prénom: &nbsp;</p>
                    <p>{props.firstname}</p>
                </div>
                <div className="full-info-user-elem">
                    <p className="full-info-user-elem-title">Email: &nbsp;</p>
                    <p>{props.email}</p>
                </div>
                <div className="full-info-user-elem">
                    <p className="full-info-user-elem-title">Classe: &nbsp;</p>
                    <p>{props.classyear}</p>
                </div>
                <div className="full-info-user-elem">
                    <p className="full-info-user-elem-title">Adresse: &nbsp;</p>
                    <p>{props.address}</p>
                </div>
                <div className="full-info-user-elem">
                    <p className="full-info-user-elem-title">Gsm: &nbsp;</p>
                    <p>{props.phonenumber}</p>
                </div>
                <div className="full-info-user-elem">
                    <p className="full-info-user-elem-title">Date de naissance: &nbsp;</p>
                    {props.birdthdate != null &&
                    <p>{props.birdthdate.toString().substring(0, 10)}</p>}
                </div>

                <img onClick={showDeleteWarningHandler} className="user-delete" src="/svg/delete-red.svg"/>
            </div>

            
            </Modal>}

            {usertype == "teachers" && 
            <Modal
            show={showMore}
            onCancel={closeMoreHandler}
            footer={<Button onClick={closeMoreHandler}>Fermer</Button>}>
             <a href={`/${props.school}/admin/update-user/${usertype}/${props.id}`}>
                <img className="user-modify" src="/svg/modify-red.svg" />
            </a>
            
            <div className="full-info-user">
                <div className="full-info-user-elem">
                    <p className="full-info-user-elem-title">Nom: &nbsp;</p>
                    <p>{props.name}</p>
                </div>
                <div className="full-info-user-elem">
                    <p className="full-info-user-elem-title">Prénom: &nbsp;</p>
                    <p>{props.firstname}</p>
                </div>
                <div className="full-info-user-elem">
                    <p className="full-info-user-elem-title">Email: &nbsp;</p>
                    <p>{props.email}</p>
                </div>
                <div className="full-info-user-elem">
                    <p className="full-info-user-elem-title">Role: &nbsp;</p>
                    <p>{props.role}</p>
                </div>

                <img onClick={showDeleteWarningHandler} className="user-delete" src="/svg/delete-red.svg"/>
            </div>
            
            </Modal>}

            {usertype == "trusted-teachers" && 
            <Modal
            show={showMore}
            onCancel={closeMoreHandler}
            footer={<Button onClick={closeMoreHandler}>Fermer</Button>}>
             <a href={`/${props.school}/admin/update-user/${usertype}/${props.id}`}>
                <img className="user-modify" src="/svg/modify-red.svg" />
            </a>
            
            <div className="full-info-user">
                <div className="full-info-user-elem">
                    <p className="full-info-user-elem-title">Nom: &nbsp;</p>
                    <p>{props.name}</p>
                </div>
                <div className="full-info-user-elem">
                    <p className="full-info-user-elem-title">Prénom: &nbsp;</p>
                    <p>{props.firstname}</p>
                </div>
                <div className="full-info-user-elem">
                    <p className="full-info-user-elem-title">Email: &nbsp;</p>
                    <p>{props.email}</p>
                </div>

                <img onClick={showDeleteWarningHandler} className="user-delete" src="/svg/delete-red.svg"/>
            </div>

            </Modal>}

            {usertype == "trusted-students" && 
            <Modal
            show={showMore}
            onCancel={closeMoreHandler}
            footer={<Button onClick={closeMoreHandler}>Fermer</Button>}>
             <a href={`/${props.school}/admin/update-user/${usertype}/${props.id}`}>
                <img className="user-modify" src="/svg/modify-red.svg" />
            </a>
            
            <div className="full-info-user">
                <div className="full-info-user-elem">
                    <p className="full-info-user-elem-title">Nom: &nbsp;</p>
                    <p>{props.name}</p>
                </div>
                <div className="full-info-user-elem">
                    <p className="full-info-user-elem-title">Prénom: &nbsp;</p>
                    <p>{props.firstname}</p>
                </div>
                <div className="full-info-user-elem">
                    <p className="full-info-user-elem-title">Email: &nbsp;</p>
                    <p>{props.email}</p>
                </div>
                <div className="full-info-user-elem">
                    <p className="full-info-user-elem-title">Classe: &nbsp;</p>
                    <p>{props.classyear}</p>
                </div>

                <img onClick={showDeleteWarningHandler} className="user-delete" src="/svg/delete-red.svg"/>
            </div>

            </Modal>}

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

            <div className="user-item center" 
                onMouseEnter={e => {
                    setDisplayLogoHover({display: 'block', marginLeft: '10px', opacity: '0.9'});
                }}
                onMouseLeave={e => {
                    setDisplayLogoHover({display: 'none', transition: '1s',
                    opacity: '0'})
                }}>
                <Card style={role_background} className="user-item-card">
                    
                    <img onClick={showDeleteWarningHandler} className="user-delete" src="/svg/delete-red.svg"
                    style={displayLogoHover}/>

                    <a href={`/${props.school}/admin/update-user/${usertype}/${props.id}`}
                    style={displayLogoHover}>
                        <img className="user-modify" src="/svg/modify-red.svg" />
                    </a>

                    <p className="user-name">{props.name}</p>
                    <p className="user-firstname">{props.firstname}</p>
                    <p className="user-email">{props.email}</p>
                    <p className="user-role">{props.role}</p>
                    <p className="user-classyear">{props.classyear}</p>
                    <button style={role_background} className='seemore' 
                    onClick={openMoreHandler}>&nbsp; voir tout</button>
                </Card>
            </div>
        </React.Fragment>
    );
};

export default UserItem;