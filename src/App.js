import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'mdbreact/dist/css/mdb.css';
// import axios from 'axios';
//
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Profile from './pages/Profile';
import UserProfile from './pages/UserProfile';

function App() {
  // const [loginState, setLoginState] = useState(false);
  //
  // useEffect(() => {
  //   setLoginState(localStorage.getItem('ifUserDone'));
  // }, []);

  return (
    <>
      <Router>
        <Link to="/login">Login Now</Link>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route
            path='/user/:username'
            render={(props) => (
              <UserProfile {...props} user_name={props.location.state.username} />
            )}
          />
        </Switch>
      </Router>
    </>
  );
}

export default App;
