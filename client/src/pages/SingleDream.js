import React from 'react';

const SingleDream = props => {
  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            Username
          </span>{' '}
          dream on createdAt
        </p>
        <div className="card-body">
          <p>dream Text</p>
        </div>
      </div>
    </div>
  );
};

export default SingleDream;
