import React, { PropTypes } from 'react';

function ProfileView(props) {
  let person = props.person;
  return (
    <div className="profileView">
      <div className="profilePicHolder">
        <img id="profilePic" src={person.picture.src} />
      </div>
      <div id="profileText">
        <h3 id="nameinProfile">{person.fullName ? person.fullName : person.gitName}</h3>
        <h4 id="gitNameInProfile"><a href={'https://github.com/'+person.gitName}>@{person.gitName}</a></h4>
      </div>
      <div id="weekYearSplit"></div>
      <div className="profileRow row">
        <div className="col-md-4">
          <h4>WEEK</h4>
        </div>
        <div className="col-md-8">
          <h5>{person.lastWeekCommits} <text>Commits</text></h5>
          <h5>{person.lastWeekPulls} <text>Pull Requests</text></h5>
          <h5>{person.currentStreak.split(' ')[0]} <text>Streak</text></h5>
        </div>
      </div>
      <div id="weekYearSplit"></div>
      <div className="profileRow row">
        <div className="col-md-4">
          <h4>YEAR</h4>
        </div>
        <div className="col-md-8">
          <h5>{person.totalCommits.split(' ')[0]} <text>Commits</text></h5>
          <h5>{person.longestStreak.split(' ')[0]} <text>Streak</text></h5>
        </div>
      </div>
      <div id="weekYearSplit"></div>
      <div className="profileRow row">
        <div className="col-md-4">
          <h4>BADGES</h4>
        </div>
        <div className="col-md-8">
          <img src="/img/CommitFirst.png"></img>
        </div>
      </div>
    </div>
  );
}

// currentStreak:"10 days"
// fullName:"Patrick"
// gitName:"rekad"
// lastWeekCommits:"69"
// lastWeekPulls:"13"
// longestStreak:"10 days"
// totalCommits:"194 total"

export default ProfileView;
