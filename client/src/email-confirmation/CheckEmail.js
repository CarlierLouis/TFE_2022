import React from 'react';
import { Link, useParams } from 'react-router-dom';

const CheckEmail = props => {
  const school = useParams().school;

  return (
    <div style={{textAlign: 'center'}}>
      <header>
        <h3>
          <strong>Vérifiez vos emails</strong>
          <p>Vérifiez vos emails pour finaliser votre inscription</p>
        </h3>
      </header>
      <Link to={`/${school}`}>
        Retour
      </Link>
    </div>
  );
};

export default CheckEmail;