import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

const Register = () => {

  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerFullname, setRegisterFullname] = useState("");
  const [existError, setExistError] = useState(false);
  const [registered, setRegistered] = useState(false);

  const register = () => {
    axios({
      method:"POST",
      data: {
        fullname: registerFullname,
        username: registerUsername,
        password: registerPassword
      },
      withCredentials: true,
      url: "https://davidnode-api.herokuapp.com/register",
    }).then((res) => {
      if (res.data.message === "exists"){
        setRegisterUsername("");
        setRegisterPassword("");
        setRegisterFullname("");
        setExistError(true);
      }
      if (res.data.message === "saved"){
        setRegistered(true);
      }
    });
  }

  return (
    <div className="container">
      {
        registered ?
        <Redirect to="/login" /> : ''
      }
      <div className="row d-flex justify-content-center">
        <div className="col-md-6">
          <div className="card login_card">
            <div className="card-header" style={{marginBottom: "-10px"}}>
              {
                existError ?
                <div>
                  <div className="alert" id="alert_warning" style={{background: "maroon", borderRadius: "4px", marginBottom: "-10px"}}><button type="button" aria-hidden="true" className="close" data-dismiss="alert" aria-label="Close"><i className="tim-icons icon-simple-remove"></i></button><span style={{color: "aliceblue"}}>A User Already Exist With That Username <Link to="login">Login Instead</Link></span></div>
                </div>: ''
              }
            </div>
            <div className="card-body">
              <legend className="login_legend">Sign Up</legend>
              <form>
                <div className="form-group">
                  <input type="" className="form-control login_input" placeholder="Enter Fullname" onChange={e => setRegisterFullname(e.target.value) } value={registerFullname} />
                </div>
                <div className="form-group">
                  <input type="" className="form-control login_input" placeholder="Enter Username" onChange={e => setRegisterUsername(e.target.value) } value={registerUsername} />
                </div>
                <div className="form-group">
                  <input type="" className="form-control login_input" placeholder="Enter Password " onChange={e => setRegisterPassword(e.target.value) } value={registerPassword} />
                </div>
                <button className="btn-block login_btn" type="button" onClick={register}>Sign Up</button>
              </form>
              <p className="link_to">Already have an account? <Link to="/login"> Login in</Link> </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register;
