import React, { useState, useContext } from 'react';
import Modal from '../common/UIElements/Modal';
import Button from '../common/FormElements/Button';
import Card from '../common/UIElements/Card';
import { AuthContext } from '../common/context/auth-context';
import { useHttpClient } from '../common/hooks/http-hook';
import ErrorModal from '../common/UIElements/ErrorModal';

import './NewsItem.css';

const NewsItem = props => {
  const auth = useContext(AuthContext);
  const [showMore, setShowMore] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const {isLoading, error, sendRequest, clearError} = useHttpClient();

  const openMoreHandler = () => {
    setShowMore(true);
  };

const closeMoreHandler = () => {
  setShowMore(false);
  };


  if ((props.description).length > 80) {
    var descriptionText = props.description.substring(0, 80) + "...";
  }
  else {
    var descriptionText = props.description;

    var seemore = {
      display: "none"
    };
  }


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
				process.env.REACT_APP_BACKEND_URL + `/api/news/${props.id}`,
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
      <Modal className='question-modal'
          show={showMore}
          onCancel={closeMoreHandler}
          footer={<Button onClick={closeMoreHandler}>Fermer</Button>}>
          <div className='modal-description-div'>
            <p className="modal-description">{props.description}</p>
          </div>
        </Modal>

        <Modal 
          show={showConfirmModal}
          onCancel={cancelDeleteHandler}
          header="Êtes-vous sûr(e) ?" 
          footerClass="news-item__modal-actions" 
          footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>Annuler</Button>
            <Button danger onClick={confirmDeleteHandler}>Supprimer</Button>
          </React.Fragment>
				  }>
				<p>
				Êtes-vous certain(e) de vouloir supprimer cette actualité ?
				Cette action entraînera la suppression irréversible de celle-ci !
				</p>
			</Modal>

      <li className="news-item">
        <Card className="news-item__content">
            <div className="news-item__info">
              <div className='news-item-box__image'>
                <img className='news-item__image' src={process.env.REACT_APP_BACKEND_URL + `/${props.image}`} />
              </div>
              <h2 className="news-date">{props.date}</h2>
              <h2 className='news-title'>{props.title}</h2>
              <h3>{descriptionText}
                <button className='seemore' style={seemore} onClick={openMoreHandler}>&nbsp;voir tout</button>
              </h3>
              {auth.isLoggedIn && auth.role == "Admin" && window.location.pathname !=`/${props.school}` &&
              <hr></hr>
              }
              {auth.isLoggedIn && auth.role == "Admin" && window.location.pathname !=`/${props.school}` &&
              <a href={`/${props.school}/actualites/admin/maj-actualite/${props.id}`} className='update-news-link'>Mettre à jour</a>
              }
              {auth.isLoggedIn && auth.role == "Admin" && window.location.pathname !=`/${props.school}` &&
              <button onClick={showDeleteWarningHandler} className='delete-news-link'>Supprimer</button>
              }
            </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default NewsItem;