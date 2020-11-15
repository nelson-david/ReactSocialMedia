import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import Navbar from '../components/Navbar';
import Carousel from '../components/Carousel';
import PostFooter from '../components/PostFooter';
import EditPost from '../components/EditPost';


const Profile = () => {

  const [userProfileData, setUserProfileData] = useState({});
  const [userPostData, setUserPostData] = useState([]);
  const [modalState, setModalState] = useState(false);

  const changeModal = () =>{
    setModalState(!modalState);
  }

  useEffect(() => {

    axios({
      method: "GET",
      withCredentials: true,
      url: "https://davidnode-api.herokuapp.com/user"
    }).then((res) => {
      console.log(res.data.user);
      setUserProfileData(res.data.user);

      axios({
        method: "POST",
        withCredentials: true,
        data: {
          id: `${res.data.user._id}`
        },
        url: "https://davidnode-api.herokuapp.com/usersPost"
      }).then((res) => {
        console.log(res.data.userPost);
        setUserPostData(res.data.userPost);
      });
    });

  }, []);

  const refresh_div = () => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "https://davidnode-api.herokuapp.com/user"
    }).then((res) => {
      setUserProfileData(res.data.user);
    });
  }

  return (
    <>
      <Navbar userImg={userProfileData.profile_picture} />
      <div className="container home_container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-7">
            <div className="card profile_card">
              <div
                className="profile_card_cover_photo"
                style={{backgroundImage: 'url("https://davidnode-api.herokuapp.com/static/img/operadesktop_wallpaper_1.webp")'}}
              >
              </div>
              <div className="card-body">
                <img
                  src={`https://davidnode-api.herokuapp.com/static/img/${userProfileData.profile_picture}`}
                  alt="profile"
                  className="user_profile_img"
                />
                <button
                  className="edit_profile_button"
                  onClick={changeModal}
                >
                  Edit Profile
                </button>
                <div className="profile_user_data">
                  <p className="profile_username">{userProfileData.fullname} @ {userProfileData.username} </p>

                  <div className="followers_data d-flex justify-content-center">
                    <p className="text-left">Posts: 107</p>
                    <p className="text-center"><Link to="/david_nelson/followers">Followers: 50</Link></p>
                    <p className="text-right"><Link to="/david_nelson/following">Following: 23</Link></p>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <br />

            { userPostData ?
              userPostData.map((value, index) => {
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
                            <span>{userProfileData.fullname}</span>
                            <span className="post_author_at">@</span>
                            <Link to={`/user/${userProfileData.username}`}>{userProfileData.username}</Link>
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
              }) : `${<h1>You Dont Have Any Post Yet</h1>}`
            }

          </div>

        </div>
      </div>
      {
        modalState ?
        <EditPost userId={userProfileData} change_modal={changeModal} refresh_div={refresh_div} />
        : ''
      }
    </>
  )
}

export default Profile;
