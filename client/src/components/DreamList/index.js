import React from "react";
import { Link } from "react-router-dom";
import pillow from "../../assets/img/1.png";
import nightMoon from "../../assets/img/8.png"

const DreamList = ({ dreams, title }) => {
  if (!dreams.length) {
    return <h3>No Dreams Found 😢</h3>;
  }

  return (
    <div className="container">
      <div className="w-100 mt-3 ml-3">
            <h3 className="text-large text-beige">
              <img src={nightMoon} alt="Moon, clouds, and stars" height="75px;" className="mr-2 pt-2" />{title}</h3></div>
      <div className="row min-80-vw cards mt-3">
      {dreams &&
        dreams.map((dream) => (
          <div key={dream._id} className="card flex card-1">
            <h2 className="card__footer">
              <Link
                to={`/profile/${dream.username}`}
                style={{ fontWeight: 700 }}
                className="text-dark card__link mt-3"
              >
                {dream.username}
              </Link>{" "}
              dreamed on {dream.createdAt}
            </h2>
            <div className="card__text">
            <h2 className="card__text__link">
              <Link to={`/dream/${dream._id}`}>
              <h2 className="">
                <img src={pillow} alt="Sleeping pillow" width="40px" className="mr-2"/> 
                {dream.dreamText}
                </h2>
                <p className="mb-0 text-med card__footer__link">
                  Comments: {dream.commentCount} || Click to{" "}
                  {dream.commentCount ? "see more dreams" : "start dreaming"} now!
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
