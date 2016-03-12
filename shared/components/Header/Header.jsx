import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';


function Header(props, context) {
  return (
    <div className="header">
      <div className="header-content">
        <h1 className="site-title">
          <Link to="/">1601 GitHub Leaderboard</Link>
        </h1>
      </div>
    </div>
  );
}

Header.contextTypes = {
  router: React.PropTypes.object,
};

export default Header;


// {
//   context.router.isActive('/', true)
//     ? <a className="add-post-button" href="#" onClick={props.onClick}>Add Post</a>
//     : null
//   }
