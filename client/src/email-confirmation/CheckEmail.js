import React from 'react';
import { Link } from 'react-router-dom';

const CheckEmail = props => {
  return (
    <div style={{textAlign: 'center'}}>
      <header>
        <h3>
          <strong>Vérifiez vos emails</strong>
          <p>Vérifiez vos emails pour finaliser votre inscription</p>
        </h3>
      </header>
      <Link to={`/${props.school}`}>
        Retour
      </Link>
    </div>
  );
};

export default CheckEmail;