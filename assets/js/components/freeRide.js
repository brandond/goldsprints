import React from 'react';
import { connect } from 'react-redux';

import { updatePosition, updateTime, resetRace, playerFinished } from '../actions';
import {PLAYER_A, PLAYER_B, COLOR_A, COLOR_B} from '../actions/types';
import RaceCanvas from './canvas';
import RaceHeader from './header';
import PlayerStats from './playerStats';
import { WSHandler, parseWsData } from './../wshandler';


class FreeRide extends React.Component {

  componentDidMount() {
    this.wsHandler = new WSHandler((data) => {this.onWebsocketMessage(data)});
  }

  onWebsocketMessage(data) {
    const raceData = parseWsData(data);
    const raceTime = raceData.time;

    // update time
    this.props.dispatchUpdateTime(raceTime);

    // reset finishes on time clear
    if (raceTime == 0) {
      this.props.dispatchResetRace();
    }

    // check if any player has finished the race
    this.checkPlayerFinished(PLAYER_A, raceData.a.distance, raceTime);
    this.checkPlayerFinished(PLAYER_B, raceData.b.distance, raceTime);

    // update players' positions
    this.props.dispatchUpdatePosition(PLAYER_A, raceData.a.distance, raceData.a.speed);
    this.props.dispatchUpdatePosition(PLAYER_B, raceData.b.distance, raceData.b.speed);
  }

  checkPlayerFinished(player, position, raceTime) {
    const { finishedA, finishedB, distance } = this.props;
    if ((player == PLAYER_A && finishedA > 0) || (player == PLAYER_B && finishedB > 0)) {
      return;
    }

    if (position >= distance) {
      console.log(`Player ${player} ended in ${raceTime} ms`);
      this.props.dispatchPlayerFinished(player, raceTime);
    }
  }

  render() {
    return (
      <div className="">
        <div className="row">
          <RaceHeader
            showRaceTime={false}
            playerOne={this.props.playerOne}
            playerTwo={this.props.playerTwo} />
          <RaceCanvas
            positionA={this.props.positionA}
            positionB={this.props.positionB}
            distance={this.props.distance} />
        </div>
        <div className="row">
          <div className="col-xs-12">
            <PlayerStats
              className="pull-left"
              player={this.props.playerOne}
              position={this.props.positionA}
              speed={this.props.speedA}
              raceTime={this.props.finishedA}
              color={COLOR_A} />
            <PlayerStats
              className="pull-right"
              player={this.props.playerTwo}
              position={this.props.positionB}
              speed={this.props.speedB}
              raceTime={this.props.finishedB}
              color={COLOR_B} />
          </div>
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return state
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatchUpdatePosition: (player, position, speed) => {
      dispatch(updatePosition(player, position, speed))
    },
    dispatchUpdateTime: (time) => {
      dispatch(updateTime(time));
    },
    dispatchPlayerFinished: (player, raceTime) => {
      dispatch(playerFinished(player, raceTime))
    },
    dispatchResetRace: () => {
      dispatch(resetRace())
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FreeRide);
