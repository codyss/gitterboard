import React, { PropTypes } from 'react';

function ProfileView(props) {
  let personToRender = props.person
  return (

    <h2>{personToRender.gitName}</h2>


  )
}


// PostListItem.propTypes = {
//   post: PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     title: PropTypes.string.isRequired,
//     content: PropTypes.string.isRequired,
//     slug: PropTypes.string.isRequired,
//     cuid: PropTypes.string.isRequired,
//   }).isRequired,

//   onClick: PropTypes.func.isRequired,
//   onDelete: PropTypes.func.isRequired,
// };

export default ProfileView;
