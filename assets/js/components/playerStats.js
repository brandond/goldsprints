import React  from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';


class PlayerStats extends React.Component {
  render() {
    let style = { color: this.props.color }
    let raceTime = this.props.raceTime;
    let speedKmh = this.props.speed.toFixed(1);
    return (
      <div className={"race-stats " + this.props.className}>
        <p className="player-name" style={style}>{this.props.player}</p>
        <p>{speedKmh} km/h</p>
        <p>{moment.utc(raceTime).format('mm:ss.SSS')}</p>
      </div>
    )
  }
}

PlayerStats.propTypes = {
  color: PropTypes.string,
  raceTime: PropTypes.number,
  position: PropTypes.number,
  speed: PropTypes.number,
  player: PropTypes.string.isRequired,
};

export default PlayerStats;
