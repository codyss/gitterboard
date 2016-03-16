import React, { PropTypes, Component } from 'react';
import GraphViewToggle from '../Leaderboard/GraphView';
import { Link } from 'react-router';


function Header(props, context) {
  return (
    <div className="header">
      <div className="header-content">
        <div className="row">
          {/*<div className="col-md-2">*/}
            {/*<GraphViewToggle />*/}
          {/*</div>*/}
          <div className="col-md-12">
            <h1 className="site-title">
              <Link to="/">1601 Gitterboard</Link>
            </h1>
          </div>
        </div>
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
