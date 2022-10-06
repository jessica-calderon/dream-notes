import React from "react";
import { Link } from "react-router-dom";
import pillow from "../../assets/img/1.png";
import nightMoon from "../../assets/img/8.png";
import brand from "../../assets/img/brand.png";
// import Pagination from "../Pagination"

const DreamList = ({ dreams, title }) => {
  if (!dreams.length) {
    return (
      <div className="card card-5 w-100 mx-auto display-inline-block text-center text-white text-shadow text-med p-4">
        <h3>No Dreams Found 😢</h3>
        <img
          src={brand}
          alt="brand logo"
          width="75px"
          className="mx-auto display-inline-block"
        />
        <br />
        ⬇️ <em>Start dreaming today...</em> ⬇️
      </div>
    );
  }

  return (
    <div className="container col-md-3 w-100 ">
      <div className="w-100 ml-3 card card-3 mx-auto pt-3">
        <h3 className="text-large text-beige text-shadow">
          <img
            src={nightMoon}
            alt="Moon, clouds, and stars"
            className="mr-2 mobile-img"
            height="60px;"
          />
          {title}
        </h3>
      </div>
      <div className="row cards border-radius card-3 w-100 mx-auto justify-space-between mt-3">
        {dreams &&
          dreams.map((dream) => (
            <div key={dream._id} className="card flex card-1 pb-5">
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
              <div className="pt-0 card__text">
                <h2 className="card__text__link">
                  <Link to={`/dream/${dream._id}`}>
                    <h2 className="">
                      <img
                        src={pillow}
                        alt="Sleeping pillow"
                        width="40px"
                        className="mr-2"
                      />
                      {dream.dreamText}
                    </h2>
                    <p className="mb-0 card__text card__footer__link">
                      Comments: {dream.commentCount} || Click to{" "}
                      {dream.commentCount
                        ? "see more dreams"
                        : "start dreaming"}{" "}
                      now!
                    </p>
                  </Link>
                </h2>
              </div>
            </div>
          ))}
        <br />
        <div className="container-page">{/* <Pagination /> */}</div>
      </div>
    </div>
  );
};

export default DreamList;
