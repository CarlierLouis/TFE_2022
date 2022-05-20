import React, { useState, useContext } from 'react';
import Modal from '../common/UIElements/Modal';
import Button from '../common/FormElements/Button';

import Card from '../common/UIElements/Card';
import { AuthContext } from '../common/context/auth-context';

import './NewsItem.css';

const NewsItem = props => {
  const auth = useContext(AuthContext);
  const [showMore, setShowMore] = useState(false);

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


  return (
    <React.Fragment>
      <Modal className='question-modal'
          show={showMore}
          onCancel={closeMoreHandler}
          footer={<Button onClick={closeMoreHandler}>Fermer</Button>}>
                      {props.description}
        </Modal>

      <li className="news-item">
        <Card className="news-item__content">
            <div className="news-item__info">
            <img className='news-item__image' src={process.env.REACT_APP_BACKEND_URL + `/${props.image}`} />
              <h2 className="news-date">{props.date}</h2>
              <h2 className='news-title'>{props.title}</h2>
              <h3>{descriptionText}
                <button className='seemore' style={seemore} onClick={openMoreHandler}>&nbsp; voir plus</button>
              </h3>
              {auth.isLoggedIn && auth.role == "Admin" &&
              <hr></hr>
              }
              {auth.isLoggedIn && auth.role == "Admin" &&
              <a href={`/${props.school}/admin/update-news/${props.id}`} className='update-news-link'>Mettre à jour</a>
              }
              {auth.isLoggedIn && auth.role == "Admin" &&
              <a className='delete-news-link'>Supprimer</a>
              }
            </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default NewsItem;