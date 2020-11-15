import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import CreatePost from './CreatePost';
import Carousel from './Carousel';
import PostFooter from './PostFooter';

const Post = (props) => {

  const [postData, setPostData] = useState([]);

  useEffect(() => {

    axios({
      method: "GET",
      withCredentials: true,
      url: "https://davidnode-api.herokuapp.com/postData"
    }).then((res) => {
      console.log(res);
      setPostData(res.data.post);
    });

  }, []);

  const refreshPost = () => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "https://davidnode-api.herokuapp.com/postData"
    }).then((res) => {
      setPostData(res.data.post);
    });
  }

  return (
    <div className="col-md-7">
      <CreatePost userData={props.sendUserData} newPostData={refreshPost} />
      <br />
      {postData.map((value, index) => {
        return(
          <div className="card single_post_card" key={index}>
            <div className="card-header single_post_card_header">
              <div className="row author_info_row">
                <div className="col-md-1">
                  <img src="https://mdbootstrap.com/img/Photos/Avatars/avatar-5.jpg" className="rounded-circle z-depth-0"
                  alt="avatar" height="35" />
                </div>
                <div className="col-md-8">
                  <p className="post_author_name">
                    <span>{value.publisher_id.fullname}</span>
                    <span className="post_author_at">@</span>
                    <Link to={{
                      pathname: `/user/${value.publisher_id.username}`,
                      state: {
                        username: value.publisher_id.username
                      }
                    }}>{value.publisher_id.username}</Link>
                  </p>
                </div>
              </div>
            </div>
            <div className="card-body single_post_card_body">
              <p className="post_text">{value.body}</p>
            </div>
            <Carousel imageData={value.img} />
            <PostFooter postId={value._id} />
          </div>
        )
      })}
    </div>
  )
}

export default Post;
