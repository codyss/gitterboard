import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import ProfileView from '../../components/Profile/Profile.jsx';


class ProfileContainer extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    if (!this.props.personToShow) {
      return <div></div>;
    }
    return (
      <ProfileView person={this.props.personToShow} />
    );
  }
}


function mapStateToProps(store) {
  return {
    personToShow: store.personToShow,
    gitStats: store.gitStats
  };
}




export default connect(mapStateToProps)(ProfileContainer);
