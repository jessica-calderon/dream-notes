import React from 'react';
import { Link } from 'react-router-dom';
import darkcloud from "../../assets/img/2.png";

const FriendList = ({ friendCount, username, friends }) => {
  if (!friends || !friends.length) {
    return <div className="container w-100"><div className="card-4 m-4 p-2">  <img src={darkcloud} alt="dark cloud mobile" width="50px" className="mr-2"/> <p className="text-dark p-3">{username}, add a friend to share dreams</p></div></div>;
  }

  return (
    <div>
      <h5>
        {username}'s {friendCount} {friendCount === 1 ? 'friend' : 'friends'}
      </h5>
      {friends.map(friend => (
        <button className="btn w-100 display-block mb-2" key={friend._id}>
          <Link to={`/profile/${friend.username}`}>{friend.username}</Link>
        </button>
      ))}
    </div>
  );
};

export default FriendList;
