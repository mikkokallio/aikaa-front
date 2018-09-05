import React, {Component} from 'react';
import './Schedule.css';


class Slot extends React.Component {

    openSub = () => {
        const url = '/subevents/'+this.props.data.id;
        this.props.history.push(url);
    };

    render() {
        return (
            <div style={{textAlign:'center',fontWeight:'bold'}}
                 className={"timeTable timeSlot "+this.props.data.box} id={this.props.data.id} onClick={this.openSub}>
                {this.props.data.text}
            </div>
        )
    }
}

export default Slot;