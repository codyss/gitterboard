import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';



class Leaderboard extends Component {
  constructor(props, context) {
    super(props, context)
  }


  render() {
    const gitItems = this.props.gitStats.map((item, key) => {
     return (
       <li key={key}>{item.gitName}</li>);
     });
    return (
      <div className="listView">
        <h2> 1601 Contributed {this.props.totalWeekCommits} Commits and {this.props.totalWeekPulls} Pull Requests Over the Last Week</h2>
        <ul>{gitItems}</ul>
      </div>
    )
  }
}


 // loadDataFromAPI() {
  //   return Axios.get('https://kimonocrawlsapi123.firebaseio.com/kimono/api/6fxd7h0e/latest.json')
  // }

  // componentDidMount() {
  //   this.loadDataFromAPI()
  //     .then(data => {
  //       console.log(data.data)
  //     })
  // }



Leaderboard.propTypes = {
  gitStats: PropTypes.array
}



export default connect()(Leaderboard);


