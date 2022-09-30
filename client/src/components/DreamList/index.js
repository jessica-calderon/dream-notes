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
              dreamed on {dream.createdAt}
            </p>
            <div className="">
              <Link to={`/dream/${dream._id}`}>
                <p>{dream.dreamText}</p>
                <p className="mb-0">
                  Comments: {dream.commentCount} || Click to{" "}
                  {dream.commentCount ? "see" : "start"} dreams now!
                </p>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default DreamList;
