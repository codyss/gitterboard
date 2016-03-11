import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Profile from '../../components/Profile/Profile.jsx'


class ProfileContainer extends Component {
  constructor(props, context) {
    super(props, context);
  }




  render() {
    if (!this.props.personToShow) {
      return <div></div>;
    }
    return (
      <div>
      <h2>test</h2>
      {

        this.props.gitStats.filter((item, key) => {
            if (item.gitName === this.props.person)
              return <Profile person={item} key={key} />
        })
      }
      </div>
    )
  }
}


function mapStateToProps(store) {
  return {
    personToShow: store.personToShow
  };
}




export default connect(mapStateToProps)(ProfileContainer);
