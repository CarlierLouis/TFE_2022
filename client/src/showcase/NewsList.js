import React from 'react';

import NewsItem from './NewsItem';
import Card from '../common/UIElements/Card';
import Button from '../common/FormElements/Button';
import './NewsList.css';

const NewsList = props => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>Aucune Actualité trouvée</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="news-list">
      {props.items.map(news => (
        <NewsItem
        key={news.id}
        id={news.id}
        title={news.title}
        date={news.date}
        description={news.description}
        image={news.image}
        school={props.school}
        />
      ))}
    </ul>
  );
};

export default NewsList;