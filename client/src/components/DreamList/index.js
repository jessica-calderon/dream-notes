import React from 'react';

const DreamList = ({ dreams, title }) => {
    if (!dreams.length) {
        return <h3>No Dreams Found</h3>;
    }

    return (
        <div>
          <h3>{title}</h3>
          {dreams &&
            dreams.map(dream => (
              <div key={dream._id} className="">
                <p className="">
                  {dream.username}
                  dream on {dream.createdAt}
                </p>
                <div className="">
                  <p>{dream.dreamText}</p>
                  <p className="">
                    Comments: {dream.commentCount} || Click to{' '}
                    {dream.commentCount ? 'see' : 'start'} commenting on dreams!
                  </p>
                </div>
              </div>
            ))}
        </div>
      );
    };
    
    export default DreamList;
