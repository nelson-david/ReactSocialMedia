import React from 'react';
import { Link } from 'react-router-dom';
import * as BsIcon from 'react-icons/bs';
import * as GoIcon from 'react-icons/go';
import * as AiIcon from 'react-icons/ai';

const PostFooter = (props) => {

  const likePost = () => {
    alert(props.postId);
  }

  return (
    <div className="card-footer single_post_card_footer">
      <div className="row d-flex justify-content-center single_post_card_footer_row">
        <div className="col-md-4">
          <p className="footer_icon" onClick={likePost}><BsIcon.BsHeart /></p>
        </div>
        <div className="col-md-4">
          <p className="footer_icon">
            <Link to={{
              pathname: `/comment/${props.postId}`,
              state: {
                postId: `${props.postId}`
              }
            }}
            >
              <GoIcon.GoCommentDiscussion />
            </Link>
          </p>
        </div>
        <div className="col-md-4">
          <p className="footer_icon"><AiIcon.AiOutlineUnorderedList /></p>
        </div>
      </div>
    </div>
  )
}

export default PostFooter;
