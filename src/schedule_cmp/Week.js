import React, {Component} from 'react';
import Day from "./Day";

var year,month,day;

class Week extends React.Component {

    componentDidMount () {
    }
    render() {
        console.log("Week says: ",this.props);
        // if (this.props.monday) {
        // }
        return (
            <div style={{display:'inline-block'}}>
                <Day user={this.props.user} day={this.props.dates[0]} label="ma"/>
                <Day user={this.props.user} day={this.props.dates[1]} label="ti"/>
                <Day user={this.props.user} day={this.props.dates[2]} label="ke"/>
                <Day user={this.props.user} day={this.props.dates[3]} label="to"/>
                <Day user={this.props.user} day={this.props.dates[4]} label="pe"/>
                <Day user={this.props.user} day={this.props.dates[5]} label="la"/>
                <Day user={this.props.user} day={this.props.dates[6]} label="su"/>
            </div>
        )
    }
}

export default Week;