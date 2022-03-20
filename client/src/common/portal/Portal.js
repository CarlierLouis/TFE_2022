import React from 'react';
import { Link } from 'react-router-dom';

const Portal  = () => {
    return <div style={{textAlign: 'center', marginTop: 300}} >
    <Link to="/grand-hallet" style={{border: 'solid', fontSize: 30}}>Grand-Hallet</Link><br></br><br></br>
    <Link to="/moxhe" style={{border: 'solid', fontSize: 30,}}>Moxhe</Link>
  </div>
}

export default Portal;