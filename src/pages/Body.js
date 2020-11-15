import React from 'react';
import { Route, Link } from 'react-router-dom';

import Home from './Home';

const Body = (props) => {

  // useEffect(() => {
  //   alert(props.homeLink);
  // }, []);

  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-md-6">
          <Link to="/home/explore"> Explore Posts</Link>
          <Route path="/home/explore">
            <p>Who Goes Dere</p>
          </Route>
        </div>
      </div>
    </div>
  )
}

export default Body;
