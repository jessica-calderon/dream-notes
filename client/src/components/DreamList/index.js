import React from "react";
import { Link } from "react-router-dom";

const DreamList = ({ dreams, title }) => {
  if (!dreams.length) {
    return <h3>No Dreams Found</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {dreams &&
        dreams.map((dream) => (
          <div key={dream._id} className="">
            <p className="">
              <Link
                to={`/profile/${dream.username}`}
                style={{ fontWeight: 700 }}
                className="text-light"
              >
                {dream.username}
              </Link>{" "}
              thought on {dream.createdAt}
            </p>
            <div className="">
              <Link to={`/thought/${thought._id}`}>
                <p>{thought.thoughtText}</p>
                <p className="mb-0">
                  Reactions: {thought.reactionCount} || Click to{" "}
                  {thought.reactionCount ? "see" : "start"} the discussion!
                </p>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default DreamList;
