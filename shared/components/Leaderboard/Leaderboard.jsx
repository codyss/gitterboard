import React, { PropTypes } from 'react';


function LeaderboardItem(props) {
  return (
    <div className="leaderBoardItem">
      <li>{props.person.gitName}, Commits: {props.person.lastWeekCommits}</li>
    </div>
  )
}

LeaderboardItem.propTypes = {
  person: PropTypes.shape({
    gitName: PropTypes.string.isRequired,
    lastWeekCommits: PropTypes.string.isRequired
  })
};

export default LeaderboardItem;

