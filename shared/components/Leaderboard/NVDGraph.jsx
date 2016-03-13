import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import NVD3Chart from 'react-nvd3';
import * as Actions from '../../redux/actions/actions';


class Graph extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.dispatch(Actions.showPerson(e));
  }

  render() {
    let newArr = this.props.gitStats.slice();
    let gitDataSorted = newArr.sort((a,b) => {
      return parseInt(b[this.props.sort].replace(/[^\d]+/, ""))-parseInt(a[this.props.sort].replace(/[^\d]+/, ""));
    });
    let gitData = gitDataSorted.map(person => {
      return {
        label: person.fullName.split(' ').length > 1 ? person.fullName.split(' ')[0] + ' ' + person.fullName.split(' ')[1][0] + '.' : person.gitName,
        value: parseInt(person[this.props.sort]),
        gitName: person.gitName
      };
    });
    let gitDatum = {
      key: "Total Commits",
      values: gitData
    };
    return (
       <div className="mainChart">
          <NVD3Chart id="barChart" type="discreteBarChart" datum={gitDatum} x="label" y="value"/>,
       </div>
     );
  }
}


function mapStateToProps(store) {
  return {
    gitStats: store.gitStats,
    weeklyTotals: store.weeklyTotals,
    personToShow: store.personToShow
  };
}



//need to send the personToShow to reducer

// Graph.propTypes = {
// };

export default connect(mapStateToProps)(NVDGraph);
