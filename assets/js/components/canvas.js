import React from 'react';
import PropTypes from 'prop-types';

import { COLOR_A, COLOR_B } from '../actions/types';


class RaceCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  drawFace(context) {
    context.beginPath();

    context.arc(0, 0, this.radius, 0, 2 * Math.PI);
    context.lineWidth = 10;
    context.fillStyle = '#262626';
    context.fill();

    context.beginPath();
    context.arc(0, 0, this.radius * 0.1, 0, 2 * Math.PI);
    context.fillStyle = '#f2f2f2';
    context.fill();
  }

  drawNumbers(ctx, distance) {
    let diff = distance / 4;
    let indexes = [1, 2, 3, 4];
    let txtValues = indexes.map((i) => { return (i * diff).toString() });

    let ang;
    let num;
    ctx.font = this.radius * 0.15 + "px arial";
    ctx.textBaseline="middle";
    ctx.textAlign="center";

    for (let i of indexes) {
      ang = i * Math.PI / 2;
      ctx.rotate(ang);
      ctx.translate(0, -this.radius * 0.9);
      ctx.rotate(-ang);
      ctx.fillText(txtValues[i - 1], 0, 0);
      ctx.rotate(ang);
      ctx.translate(0, this.radius * 0.9);
      ctx.rotate(-ang);
    }
}

  drawHand(context, position, color) {
    // translate linear position to circular
    position = (position * 2 * Math.PI / this.props.distance);
    var length = this.radius * 0.75;
    var width = this.radius * 0.06;
    context.beginPath();
    context.lineWidth = width;
    context.lineCap = "round";
    context.moveTo(0, 0);
    context.rotate(position);
    context.lineTo(0, -length);
    context.strokeStyle = color;
    context.stroke();
    context.rotate(-position);
  }

  drawPlayerPosition() {
    this.drawFace(this.ctx);
    this.drawNumbers(this.ctx, this.props.distance);
    this.drawHand(this.ctx, this.props.positionA, COLOR_A);
    this.drawHand(this.ctx, this.props.positionB, COLOR_B);
  }

  componentDidMount() {
    this.ctx = this.canvasRef.current.getContext('2d');
    this.radius = this.canvasRef.current.height / 2;
    this.ctx.translate(this.radius, this.radius);
    this.radius *= 0.9;
    this.drawPlayerPosition();
  }

  componentDidUpdate() {
    this.drawPlayerPosition();
  }

  render() {
    return <canvas id="gameCanvas" width="640" height="640" ref={this.canvasRef} />;
  }
}

RaceCanvas.propTypes = {
  positionA: PropTypes.number.isRequired,
  positionB: PropTypes.number.isRequired,
  distance: PropTypes.number.isRequired
};

export default RaceCanvas;
