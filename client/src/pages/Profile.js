import React from "react";
import { Navigate, useParams } from "react-router-dom";

import DreamForm from "../components/DreamForm";
import DreamList from "../components/DreamList";
import FriendList from "../components/FriendList";

import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../utils/queries";

import { ADD_FRIEND } from "../utils/mutations";

import Auth from "../utils/auth";
import sleepZs from "../assets/img/11.png";

const Profile = (props) => {
  const { username: userParam } = useParams();

  const [addFriend] = useMutation(ADD_FRIEND);
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });
  const user = data?.me || data?.user || {};

  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/profile:username" />;
  }
  if (loading) {
    return (
      <div className="cards">
        <div className="card card-1">Loading...</div>
      </div>
    );
  }
  if (!user?.username) {
    return (
      <div className="card card-5 w-100">
        <h4>
          You need to be logged in to see this. Use the navigation links above
          to sign up or log in!
        </h4>
      </div>
    );
  }

  const handleClick = async () => {
    try {
      await addFriend({
        variables: { id: user._id },
      });
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div>
      <div className="text-center w-100 mx-auto profile-card card card-1 mb-0">
        <h2 className="text-white text-shadow text-center display-inline-block">
          <img src={sleepZs} width="200px" alt="sleeping zs" />
          <br />
          <br />
          Viewing {userParam ? `${user.username}'s` : "your"} profile
          <br />
        </h2>
        {userParam && (
          <button className="btn ml-auto" onClick={handleClick}>
            Add Friend
          </button>
        )}
      </div>
      <br />
      <div className="flex-row justify-space-between mb-3">
        <div className="col-12 mb-0">
          <DreamList
            dreams={user.dreams}
            title={`${user.username}'s dreams...`}
          />
        </div>
      </div>
      <div className="col-12 col-lg-3 mb-3">
        <FriendList
          username={user.username}
          friendCount={user.friendCount}
          friends={user.friends}
        />
      </div>

      <div className="mb-3">{!userParam && <DreamForm />}</div>
    </div>
  );
};

export default Profile;
