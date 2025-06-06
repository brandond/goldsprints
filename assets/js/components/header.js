import React  from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { COLOR_A, COLOR_B } from '../actions/types';


class RaceHeader extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.raceTime !== this.props.raceTime;
  }

  render() {
    const { playerOne, playerTwo, showRaceTime } = this.props;
    const styleA = { color: COLOR_A }
    const styleB = { color: COLOR_B }
    let raceTime = this.props.raceTime;
    return (
      <div className="race__header">
        <h1 className="title">
          <span className="race__header__player" style={styleA}>{playerOne}</span>
          <span> vs. </span>
          <span className="race__header__player" style={styleB}>{playerTwo}</span>
        </h1>
        {showRaceTime && (<h2 className="title with-shadow time">{moment.utc(raceTime).format('mm:ss.SS')}</h2>)}
      </div>
    )
  }
}

RaceHeader.propTypes = {
  raceTime: PropTypes.number,
  playerOne: PropTypes.string.isRequired,
  playerTwo: PropTypes.string.isRequired
};

export default RaceHeader;
