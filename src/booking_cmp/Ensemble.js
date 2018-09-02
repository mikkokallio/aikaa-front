import React, {Component} from 'react';
import Day from "./Day";

class Week extends React.Component {

    render() {
        return (
            <div style={{display:'inline-block'}}>
                <Day user={this.props.user} day="2019-07-05" label="ma"/>
                <Day user={this.props.user} day="2019-07-05" label="ti"/>
                <Day user={this.props.user} day="2019-07-05" label="ke"/>
                <Day user={this.props.user} day="2019-07-05" label="to"/>
                <Day user={this.props.user} day="2019-07-05" label="pe"/>
                <Day user={this.props.user} day="2019-07-05" label="la"/>
                <Day user={this.props.user} day="2019-07-05" label="su"/>
            </div>
        )
    }
}

export default Week;