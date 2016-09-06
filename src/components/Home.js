import React from 'react';

const Home = ({loading}) => {
    return (
      <div>
          <h1>React-redux starterskit</h1>
          <p>Your app is currently{loading ? '' : ' not'} loading</p>
      </div>
    );
}

export default Home;