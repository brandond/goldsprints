import React from 'react';
import moment from 'moment';

const { Component, PropTypes } = React;

export default class Winner extends Component {
    render() {
        const { winner: { name, color, time } } = this.props;
        const style = color ? {color: color} : {};
        return (
            <div className="winner">
                {name ? (
                    <div>
                        <p>Winner</p>
                        <h1 style={style}>{name}</h1>
                        <h2>{moment.utc(time).format('mm:ss.SS')}</h2>
                    </div>
                ) :  (
                    <div>
                        <h1>Draw</h1>
                        <h2>{moment.utc(time).format('mm:ss.SS')}</h2>
                    </div>
                )}
            </div>
        );
    }
}
