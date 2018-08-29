import React, {Component} from 'react';
import './Slot.css';


class Slot extends React.Component {

    render() {
        return (
            <div class="timeSlot">
                <span className="glyphicon glyphicon-tag"></span> {this.props.data.id} {this.props.data.text}
            </div>
        )
    }
}

export default Slot;