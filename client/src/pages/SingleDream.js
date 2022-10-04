import React from "react";
import { useParams } from "react-router-dom";

import CommentList from "../components/CommentList";
import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_DREAM } from "../utils/queries";
import CommentForm from "../components/CommentForm";
import moonStars from "../assets/img/9.png";
const SingleDream = (props) => {
  const { id: dreamId } = useParams();

  const { loading, data } = useQuery(QUERY_DREAM, {
    variables: { id: dreamId },
  });

  const dream = data?.dream || {};

  if (loading) {
    return (
      <div className="cards">
        <div className="card card-1">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="card card-4 w-100 p-3 m-3">
        <p className="card__text">
          <img
            src={moonStars}
            alt="sleeping pillow"
            width="40px"
            className="ml-2 pr-2"
          />
          <span style={{ fontWeight: 700 }} className="text-light mb-1">
            {dream.username}
          </span>{" "}
          Dream on {dream.createdAt}
        </p>
        <div className="card-body">
          <p>{dream.dreamText}</p>
        </div>
      </div>

      {dream.commentCount > 0 && <CommentList comments={dream.comments} />}

      {Auth.loggedIn() && <CommentForm dreamId={dream._id} />}
    </div>
  );
};

export default SingleDream;
