import React, {useState} from 'react';
import axios from 'axios';

const EditPost = (props) => {

  const [profileImgUrl, setProfileImgUrl] = useState([]);
  const [profileImgObj, setProfileImgObj] = useState([]);
  const [userName, setUserName] = useState(props.userId.username);
  const [fullName, setFullName] = useState(props.userId.fullname);
  const [userBio, setUserBio] = useState(props.userId.bio);
  const [showRow, setShowRow] = useState(false);
  const [saved, setSaved] = useState(false);

  const updateProfile = (e) => {
    e.preventDefault();

    var form_data = new FormData();
    form_data.append("files", profileImgObj);
    form_data.append("user_name", userName);
    form_data.append("full_name", fullName);
    form_data.append("bio", userBio);
    form_data.append("user_id", props.userId._id);
    console.log(form_data);

    axios({
      method:"POST",
      data: form_data,
      dataType: 'json',
      contentType: false,
      processData: false,
      withCredentials: true,
      url: "https://davidnode-api.herokuapp.com/updateProfile",
    }).then((res) => {
      props.refresh_div();
      props.change_modal();
      setSaved(true);
    });

  }

  const listenToImage = (event) => {
    setShowRow(true);
    setProfileImgObj(event.target.files[0]);
    const blobFile = URL.createObjectURL(event.target.files[0]);
    setProfileImgUrl(blobFile);
  }

  return (
    <>
      <div className="modal_general fixed-top">
  			<div className="main_modal fixed-top">
  	      <div className="custom_modal_header">
  	        <button type="button" className="close close_post_modal">
  	        </button>
  	      </div>
          <div className="custom_modal_body">
            {
              saved ?
              <h1>Account updated successfully</h1>
              : ''
            }
            <legend>Edit Your Profile</legend>
  	        <form method="POST" onSubmit={updateProfile}>
              <div className="form-group">
                <input
                  className="form-control edit_profile_input"
                  placeholder="Full Name"
                  onChange={e => setFullName(e.target.value)}
                  value={fullName}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control edit_profile_input"
                  placeholder="Username"
                  onChange={e => setUserName(e.target.value)}
                  value={userName}
                />
              </div>
              <div className="form-group">
                <textarea
                  className="form-control edit_profile_input"
                  placeholder="Bio"
                  onChange={e => setUserBio(e.target.value)}
                  value={userBio}
                />
              </div>
              <div className="form-group">
                <input type="file" onChange={listenToImage} />
              </div>
              {
                showRow ?
                <div className="row prev_profile_div" style={{marginTop: '-45px', marginLeft: '0px'}}>
                  {
                    profileImgUrl ?
                    <div className="col-md-4 prev_image_div_col">
                      <img src={profileImgUrl} alt="ph_to" className="img-fluid prev_image_home" />
                    </div>
                    : ''
                  }
                </div> : ''
              }
              <button type="submit" className="float-right updateBtn">Update</button>
            </form>
  	      </div>
  			</div>
  			<div className="post_black_frame fixed-top" onClick={props.changeModal}></div>
  		</div>
    </>
  )

}

export default EditPost;
