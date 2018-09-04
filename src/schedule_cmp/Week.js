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
                <Day user={this.props.user} day={this.props.dates[0]} shortDate={this.props.shortDates[0]} label="ma"/>
                <Day user={this.props.user} day={this.props.dates[1]} shortDate={this.props.shortDates[1]} label="ti"/>
                <Day user={this.props.user} day={this.props.dates[2]} shortDate={this.props.shortDates[2]} label="ke"/>
                <Day user={this.props.user} day={this.props.dates[3]} shortDate={this.props.shortDates[3]} label="to"/>
                <Day user={this.props.user} day={this.props.dates[4]} shortDate={this.props.shortDates[4]} label="pe"/>
                <Day user={this.props.user} day={this.props.dates[5]} shortDate={this.props.shortDates[5]} label="la"/>
                <Day user={this.props.user} day={this.props.dates[6]} shortDate={this.props.shortDates[6]} label="su"/>
            </div>
        )
    }
}

export default Week;