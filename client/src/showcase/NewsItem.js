import React from 'react';
import { Link } from 'react-router-dom';

import Card from '../common/UIElements/Card';

import './NewsItem.css';

const NewsItem = props => {
  return (
    <li className="news-item">
      <Card className="news-item__content">
          <div className="news-item__info">
          <img className='news-item__image' src={`http://localhost:5000/${props.image}`} />
            <h2>{props.title}</h2>
            <h3>{props.description}</h3>
          </div>
      </Card>
    </li>
  );
};

export default NewsItem;