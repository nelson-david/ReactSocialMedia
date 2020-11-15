import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

const Login = () => {

  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loggedDone, setLoggedDone] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoggedDone(localStorage.getItem('ifUserDone'));
  }, [])

  const login = () => {
    axios({
      method:"POST",
      data: {
        username: loginUsername,
        password: loginPassword
      },
      withCredentials: true,
      url: "https://davidnode-api.herokuapp.com/login",
    }).then((res) => {
      if (res.data.message){
        setError(true);
      }else{
        if (error){
          setError(false);
        }
        localStorage.setItem('ifUserDone', true);
        localStorage.setItem('extUserData', res.data.user_data);
        setLoggedDone(true);
      }
    });
  }

  const removeError = () => {
    setError(false)
  }

  return (
    <>
      {
        loggedDone ?
        <Redirect to="/home" />
        : ''
      }
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-6">
            <div className="card login_card">
              <div className="card-body">
                {
                  error ?
                  <div className="alert alert-dismissible fade show" style={{backgroundColor: 'maroon', color: 'aliceblue'}}>
                    <strong>Invalid</strong> Username or Password
                    <button type="button" className="close" onClick={removeError}>
                      <span>&times;</span>
                    </button>
                  </div>
                  : ''
                }
                <legend className="login_legend">Login</legend>
                <form>
                  <div className="form-group">
                    <input type="" className="form-control login_input" placeholder="Enter Username" onChange={e => setLoginUsername(e.target.value) } required />
                  </div>
                  <div className="form-group">
                    <input type="" className="form-control login_input" placeholder="Enter Password " onChange={e => setLoginPassword(e.target.value) } required />
                  </div>
                  <button className="btn-block login_btn" type="button" onClick={login}>Sign In</button>
                </form>
                <p className="link_to">Don't have an account? <Link to="/register">Create One </Link> </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login;
