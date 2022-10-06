import React from "react";
import DreamList from "../components/DreamList";
import DreamForm from "../components/DreamForm";
import FriendList from "../components/FriendList";
import cloudBubble from "../assets/img/cloudBubble.png";
//import Pagination from '../components/Pagination2';

import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_DREAMS, QUERY_ME_BASIC } from "../utils/queries";

const Home = () => {
  const { loading, data } = useQuery(QUERY_DREAMS);
  const { data: userData } = useQuery(QUERY_ME_BASIC);
  const dreams = data?.dreams || [];

  const loggedIn = Auth.loggedIn();

  return (
    <main>
      <div className="main p-5 min-80-vw">
        <div className="text-large card w-100 display-inline-block card-3 p-3 mb-0 border-radius text-shadow text-beige ml-1">
          Dream Notes{" "}
          <img src={cloudBubble} alt="cloud thinking bubble" width="75rem;" />
        </div>
        {loggedIn && (
          <div className="DreamForm">
            <DreamForm />
          </div>
        )}
        <div className={`col-12 mb-3 ${loggedIn && "col-lg-8"}`}>
          {loading ? (
            <div className="cards">
              <div className="card card-1">Loading...</div>
            </div>
          ) : (
            <DreamList dreams={dreams} title="Some Dreams..." />
          )}
          <div className="container"></div>
        </div>
        {loggedIn && userData ? (
          <div className="col-12 col-lg-3 mb-3">
            <FriendList
              username={userData.me.username}
              friendCount={userData.me.friendCount}
              friends={userData.me.friends}
            />
          </div>
        ) : null}
      </div>

      {/* <Pagination
       
      /> */}
    </main>
  );
};

export default Home;
