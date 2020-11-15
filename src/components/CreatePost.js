import React, { useState } from 'react';
import axios from 'axios';
import * as IonIcons from 'react-icons/io';
import * as MdIcon from 'react-icons/md';
import * as FaIcon from 'react-icons/fa';

const CreatePost = (props) => {

  const [postText, setPostText] = useState("");
  const [newImageUrl, setnewImageUrl] = useState([]);
  const [imageSelected, setImageSelected] = useState(false);
  const [newFileObj, setNewFileObj] = useState([]);

  const fileObj = [];
  const fileArray = [];

  const postData = () => {
    console.log(newFileObj);
    console.log(postText);

    var form_data = new FormData();
    var totalfiles = newFileObj.length;

    for (var index = 0; index < totalfiles; index++) {
      form_data.append("files", newFileObj[index]);
    }

    form_data.append("textData", postText);
    form_data.append("userId", props.userData._id);

    axios({
      method:"POST",
      data: form_data,
      dataType: 'json',
      contentType: false,
      processData: false,
      withCredentials: true,
      url: "https://davidnode-api.herokuapp.com/addPost",
    }).then((res) => {
      props.newPostData();
      setImageSelected(false);
      setPostText("");
      setnewImageUrl([]);
    });
  }

  const onImageSelect = (event) => {
    setImageSelected(true);
    fileObj.push(event.target.files);
    setNewFileObj(event.target.files);


    for (let i = 0; i < fileObj[0].length; i++) {
      fileArray.push(URL.createObjectURL(fileObj[0][i]));
    }
    setnewImageUrl(fileArray);
  }

  return (
    <>
      <div className="card create_post_card">
        <div className="card-body">
          <div className="row">
            <div className="col-md-1">
              <img src={`https://davidnode-api.herokuapp.com/static/img/${props.userData.profile_picture}`} className="rounded-circle z-depth-0"
              alt="avatar" height="35" />
            </div>
            <div className="col-md-11">
              <textarea
                className='form-control post_textArea'
                placeholder={`${props.userData.fullname}, Any New Update?`}
                rows="2"
                value={postText}
                onChange={e => setPostText(e.target.value)}
              />
            </div>
          </div>

          <div className="row">
          </div>

          <div className="row d-flex justify-content-center" style={{marginLeft: "60px", marginTop:"10px"}}>
            <div className="col-md-4 label_button_col">
              <input
                type="file"
                hidden={true}
                multiple={true}
                id="image_input"
                onChange={onImageSelect}
                accept="image/*"
              />
              <label htmlFor="image_input" className="label_button">
                <IonIcons.IoMdImages />
              </label>
            </div>
            <div className="col-md-4 label_button_col">
              <input
                type="file"
                hidden={true}
                multiple={true}
                id="video_input"
              />
              <label htmlFor="video_input" className="label_button">
                <IonIcons.IoMdVideocam />
              </label>
            </div>
            <div className="col-md-4 label_button_col">
              <button className="label_button">
                <MdIcon.MdCollectionsBookmark />
              </button>
            </div>
          </div>

          {
            imageSelected ?
            <div className="row d-flex justify-content-center prev_image_div_row" style={{marginBottom: "15px"}}>
              <div className="prev_image_div d-flex">
                {newImageUrl ? newImageUrl.map((value, index) => {
                  return(
                    <div className="col-md-4 prev_image_div_col" key={index}>
                      <img src={value} alt="ph_to" className="img-fluid prev_image_home" />
                    </div>
                  )
                }) : ''}
              </div>
            </div> : ''
          }

          <button
            type='button'
            onClick={postData}
            className="float-right post_btn"
          >
            <FaIcon.FaRegPaperPlane className="post_icon" />
          </button>

        </div>
      </div>
    </>
  )
}

export default CreatePost;
