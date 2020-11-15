import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import Navbar from '../components/Navbar';
import Post from '../components/Post';

const Home = () => {

  const [userData, setUserData] = useState(localStorage.getItem('extUserData'));
  const [checkState, setCheckState] = useState(localStorage.getItem('ifUserDone'));

  useEffect(() => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "https://davidnode-api.herokuapp.com/user"
    }).then((res) => {
      console.log(res.data.user);
      setUserData(res.data.user);
    });
  }, []);

  const logOut = () => {
    localStorage.removeItem('ifUserDone');
    setCheckState(false);
  }

  return (
    <>

      {
        checkState ?
        ''
        : <Redirect to="/login" />
      }
      <Navbar logoutUser={logOut} userImg={userData.profile_picture} />

      <div className="container home_container">
        <div className="row d-flex justify-content-center">
          <Post sendUserData={userData} />
        </div>
      </div>
    </>
  )
}

export default Home;
