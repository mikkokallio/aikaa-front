import React, {Component} from 'react';
import './Schedule.css';


class TimeLabel extends React.Component {

    render() {
        return (
            <div className="timeTable timeLabel">
                {this.props.data}
            </div>
        )
    }
}

export default TimeLabel;