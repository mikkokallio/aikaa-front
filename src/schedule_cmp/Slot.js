import React, {Component} from 'react';
import './Schedule.css';


class Slot extends React.Component {

    render() {
        return (
            <div style={{textAlign:'center',fontWeight:'bold'}} className={"timeTable timeSlot "+this.props.data.box + " " +(this.props.data.eventid===999999999&&"absence")} id={this.props.data.id}>
                {this.props.data.text}
            </div>
        )
    }
}

export default Slot;