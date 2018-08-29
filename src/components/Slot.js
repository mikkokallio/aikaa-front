import React, {Component} from 'react';
import './Slot.css';


class Slot extends React.Component {

    render() {
        return (
            <div className={"timeTable timeSlot "+this.props.data.box} id={this.props.data.id}>
                {this.props.data.text}
            </div>
        )
    }
}

export default Slot;