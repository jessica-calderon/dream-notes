import React from "react";
import { useParams } from "react-router-dom";

import CommentList from "../components/CommentList";

import { useQuery } from "@apollo/client";
import { QUERY_DREAM } from "../utils/queries";
import CommentForm from "../components/CommentForm";
const SingleDream = (props) => {
  const { id: dreamId } = useParams();

  const { loading, data } = useQuery(QUERY_DREAM, {
    variables: { id: dreamId },
  });

  const dream = data?.dream || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
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
