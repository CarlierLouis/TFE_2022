import React, {useContext, useEffect} from 'react';
import { Link, useParams } from "react-router-dom";
import { useHttpClient } from '../common/hooks/http-hook';
import { AuthContext } from '../common/context/auth-context';

const WelcomeUser = props => {
const confirmationCode = useParams().confirmationCode;
const {sendRequest} = useHttpClient();
const auth = useContext(AuthContext);
const usertype = useParams().usertype;

useEffect(() => {

  const verifyEmail = async () => {
    try {
    await sendRequest( 
        process.env.REACT_APP_BACKEND_URL + `/api/${usertype}/login/email-confirmation/` + confirmationCode, 
        'PATCH',
        null,
        {Authorization: 'Bearer ' + auth.token}
    );
    }
    catch (err) {}
  };
  verifyEmail();
},[sendRequest]);

  

  return (
    <div style={{textAlign: 'center'}}>
      <br></br>
      <header>
        <h3>
          <strong>Validation du compte terminée !</strong>
          <p>Vous pouvez à présent vous connectez à votre compte</p>
        </h3>
      </header>
      <Link to={`/`}>
        Continuer
      </Link>
    </div>
  );
};

export default WelcomeUser;