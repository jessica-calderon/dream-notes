import React from "react";
import { Navigate, useParams } from "react-router-dom";

import DreamForm from "../components/DreamForm";
import DreamList from "../components/DreamList";
import FriendList from "../components/FriendList";

import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../utils/queries";

import { ADD_FRIEND } from "../utils/mutations";

import Auth from "../utils/auth";

const Profile = (props) => {
  const { username: userParam } = useParams();

  const [addFriend] = useMutation(ADD_FRIEND);
  const [loading, data] = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });
  const user = data?.me || data?.user || {};

  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/profile:username" />;
  }
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
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
      <div className="">
        <h2 className="">
          Viewing {userParam ? `${user.username}'s` : "your"} profile
        </h2>
        {userParam && (
          <button className="" onClick={handleClick}>
            Add Friend
          </button>
        )}
      </div>
      <div className="">
        <div className="">
          <DreamList
            dreams={user.dreams}
            title={`${user.username}'s dreams...`}
          />
        </div>

        <div className="">
          <FriendList
            username={user.username}
            friendCount={user.friendCount}
            friends={user.friends}
          />
        </div>
      </div>
      <div className="">{!userParam && <DreamForm />}</div>
    </div>
  );
};

export default Profile;
