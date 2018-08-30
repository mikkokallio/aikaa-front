import React, {Component} from 'react';
import Day from "./Day";

class Week extends React.Component {

    render() {
        return (
            <div style={{display:'inline-block'}}>
                <Day user={this.props.user} day="2019-07-05" label="ma"/>
                <Day user={this.props.user} day="2019-07-06" label="ti"/>
                <Day user={this.props.user} day="2019-07-07" label="ke"/>
                <Day user={this.props.user} day="2019-07-08" label="to"/>
                <Day user={this.props.user} day="2019-07-09" label="pe"/>
                <Day user={this.props.user} day="2019-07-10" label="la"/>
                <Day user={this.props.user} day="2019-07-11" label="su"/>
            </div>
        )
    }
}

export default Week;