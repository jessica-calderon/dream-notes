import React from "react";
import { Link } from "react-router-dom";

const DreamList = ({ dreams, title }) => {
  if (!dreams.length) {
    return <h3>No Dreams Found</h3>;
  }

  return (
    <div className="container">
      <div className="w-100 mt-3 ml-3">
            <h3 className="text-large">{title}</h3></div>
      <div className="row min-80-vw cards mt-3">
      {dreams &&
        dreams.map((dream) => (
          <div key={dream._id} className="card flex card-1">
            <h2 className="card__footer">
              <Link
                to={`/profile/${dream.username}`}
                style={{ fontWeight: 700 }}
                className="text-light card__link mt-2"
              >
                {dream.username}
              </Link>{" "}
              dreamed on {dream.createdAt}
            </h2>
            <div className="card__text">
            <h2 className="card__text__link">
              <Link to={`/dream/${dream._id}`}>
                <h2 className="">{dream.dreamText}</h2>
                <p className="mb-0 card__footer__link">
                  Comments: {dream.commentCount} || Click to{" "}
                  {dream.commentCount ? "see" : "start"} dreams now!
                </p>
              </Link>
              </h2>
            </div>
          </div>
        ))}
    </div>
    </div>
  );
};

export default DreamList;
