import React, { useState } from 'react';
import Modal from '../common/UIElements/Modal';
import Button from '../common/FormElements/Button';

import Card from '../common/UIElements/Card';

import './NewsItem.css';

const NewsItem = props => {
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
            <img className='news-item__image' src={`http://localhost:5000/${props.image}`} />
              <h2 className="news-date">{props.date}</h2>
              <h2>{props.title}</h2>
              <h3>{descriptionText}
                <button className='seemore' style={seemore} onClick={openMoreHandler}>&nbsp; voir plus</button>
              </h3>
            </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default NewsItem;