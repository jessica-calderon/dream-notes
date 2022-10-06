import React from "react";
import { Link } from "react-router-dom";
import friendsPic from "../../assets/img/12.png";

const FriendList = ({ friendCount, username, friends }) => {
  if (!friends || !friends.length) {
    return (
      <div className="card w-100 display-inline-block text-center card-4 mx-auto p-4">
        <p className="text-dark text-glow-white text-med my-auto ">
          Hey <b>{username}</b>, make some friends!{" "}
        </p>
        <img
          src={friendsPic}
          alt="friends hugging"
          className="p-1 display-inline-block"
          width="50px"
        />
      </div>
    );
  }

  return (
    <div>
      <h5>
        {username}'s {friendCount} {friendCount === 1 ? "friend" : "friends"}
      </h5>
      {friends.map((friend) => (
        <button className="btn w-100 display-block mb-2" key={friend._id}>
          <Link to={`/profile/${friend.username}`}>{friend.username}</Link>
        </button>
      ))}
    </div>
  );
};

export default FriendList;
