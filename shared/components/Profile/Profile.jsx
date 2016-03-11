import React, { PropTypes } from 'react';

function ProfileView(props) {
  let person = props.person
  return (
    <div className="profileView">
      <h2>{person.fullName}</h2>
      <h3>{person.gitName}</h3>
      <h4>Last Week Commits: {person.lastWeekCommits}</h4>
      <h4>Last Week Pull Requests: {person.lastWeekPulls}</h4>
      <h4>Total Commits: {person.totalCommits}</h4>
      <img id="profilePic" src={person.picture.src} />
    </div>
  )
}

// currentStreak:"10 days"
// fullName:"Patrick"
// gitName:"rekad"
// lastWeekCommits:"69"
// lastWeekPulls:"13"
// longestStreak:"10 days"
// totalCommits:"194 total"

export default ProfileView;
