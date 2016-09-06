import React, { PropTypes } from 'react';

const Home = ({ loading }) => {
  return (
      <div>
          <h1>React-redux starterskit</h1>
          <p>Your app is currently{loading ? '' : ' not'} busy with an ajax request</p>
      </div>
    );
};

Home.propTypes = {
  loading: PropTypes.bool
};

export default Home;
