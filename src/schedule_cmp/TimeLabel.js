import React, {Component} from 'react';
import './Slot.css';


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