import React from 'react';
import DreamList from '../components/DreamList';
import DreamForm from '../components/DreamForm';
import FriendList from '../components/FriendList';


import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_DREAMS, QUERY_ME_BASIC } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_DREAMS);
  const { data: userData } = useQuery(QUERY_ME_BASIC);
  const dreams = data?.dreams || [];

  const loggedIn = Auth.loggedIn();

  return (
    <main>
      <div className="main min-80-vw">
        {loggedIn && (
          <div className="DreamForm">
            <DreamForm />
          </div>
        )}
        <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <DreamList
              dreams={dreams}
              title="Some Dreams..."
            />
          )}
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
    </main>
  );
};

export default Home;
