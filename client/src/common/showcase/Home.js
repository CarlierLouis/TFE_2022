import React from 'react';
import './Home.css';

const Home  = props => {
    return(
    <div className='home-div' style={{padding: "2%"}}>
        <img src={props.schoolPhoto1}></img>
        <img src={props.schoolPhoto2}></img>
        <img src={props.schoolPhoto1}></img>
        <img src={props.schoolPhoto2}></img>
    </div>
    )
}

export default Home;