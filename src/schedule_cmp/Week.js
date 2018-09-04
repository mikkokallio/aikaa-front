import React, {Component} from 'react';
import Day from "./Day";

var year,month,day;

class Week extends React.Component {

    componentDidMount () {
    }
    render() {
        console.log("Week says: ",this.props);
        // if (this.props.monday) {
        var date = this.props.monday;
        var dates = [];
        for (var d = 0; d < 7; d++) {
            // DO YOUR THING!
            var yyyy = date.getFullYear();
            var month = date.getMonth();
            var mm = (month.toString().length===1?"0"+month:month);
            var day = date.getDate();
            var dd = (day.toString().length===1?"0"+day:day);
            dates[d] = yyyy+"-"+mm+"-"+dd;
            console.log("Now is: ",dates[d]);
            date.setDate(date.getDate() + 1);
        }
        // }
        return (
            <div style={{display:'inline-block'}}>
                <Day user={this.props.user} day={dates[0]} label="ma"/>
                <Day user={this.props.user} day={dates[1]} label="ti"/>
                <Day user={this.props.user} day={dates[2]} label="ke"/>
                <Day user={this.props.user} day={dates[3]} label="to"/>
                <Day user={this.props.user} day={dates[4]} label="pe"/>
                <Day user={this.props.user} day={dates[5]} label="la"/>
                <Day user={this.props.user} day={dates[6]} label="su"/>
            </div>
        )
    }
}

export default Week;