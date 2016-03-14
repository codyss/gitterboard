import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import {BarChart} from 'react-easy-chart';
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
    let gitData = this.props.gitStats.slice().sort((a,b) => {
      return parseInt(b[this.props.sort].replace(/[^\d]+/, ""))-parseInt(a[this.props.sort].replace(/[^\d]+/, ""));
    })
    .map(person => {
      return {
        x: person.fullName.split(' ').length > 1 ? person.fullName.split(' ')[0] + ' ' + person.fullName.split(' ')[1][0] + '.' : person.gitName,
        y: parseInt(person[this.props.sort]),
        gitName: person.gitName
      };
    });
    return (
       <div className="mainChart">
          <BarChart height={400} width={parseInt(this.props.width) || 800} barWidth={5} colorBars data={gitData} axes clickHandler={this.handleClick} />
       </div>
     );
  }
}


function mapStateToProps(store) {
  return {
    gitStats: store.gitStats,
    weeklyTotals: store.weeklyTotals,
    personToShow: store.personToShow,
    ranks: store.ranks
  };
}

export default connect(mapStateToProps)(Graph);
