import React, {Component} from 'react';
import Day from "./Day";

class Week extends React.Component {

    render() {
        console.log("Week says: ",this.props);
        return (
            <div style={{display:'inline-block'}}>
                <Day {...this.props} user={this.props.user} day={this.props.dates[0]} label={"ma "+this.props.shortDates[0]}/>
                <Day {...this.props} user={this.props.user} day={this.props.dates[1]} label={"ti "+this.props.shortDates[1]}/>
                <Day {...this.props} user={this.props.user} day={this.props.dates[2]} label={"ke "+this.props.shortDates[2]}/>
                <Day {...this.props} user={this.props.user} day={this.props.dates[3]} label={"to "+this.props.shortDates[3]}/>
                <Day {...this.props} user={this.props.user} day={this.props.dates[4]} label={"pe "+this.props.shortDates[4]}/>
                <Day {...this.props} user={this.props.user} day={this.props.dates[5]} label={"la "+this.props.shortDates[5]}/>
                <Day {...this.props} user={this.props.user} day={this.props.dates[6]} label={"su "+this.props.shortDates[6]}/>
            </div>
        )
    }
}

export default Week;