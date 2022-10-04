import React from "react";
import { Link } from "react-router-dom";

const CommentList = ({ comments }) => {
  return (
    <div className="  w-100 p-3 m-3">
      <div className="heading card__text">
        <span style={{ fontWeight: 900 }} className="text-dark bold m-3">
          Comments
        </span>
      </div>
      <div className="card bg-beige mx-auto mt-auto">
        {comments &&
          comments.map((comment) => (
            <p className="cards " key={comment._id}>
              {comment.commentBody} {""}
              <Link
                to={`/profile/${comment.username}`}
                style={{ fontWeight: 300 }}
              >
                {comment.username} on{comment.createdAt}
              </Link>
            </p>
          ))}
      </div>
    </div>
  );
};

export default CommentList;
