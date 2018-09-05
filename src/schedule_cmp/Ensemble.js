import React, {Component} from 'react';
import Day from "./Day";

class Ensemble extends React.Component {

    render() {
        return (
            <div style={{display:'inline-block'}}>
                <Day {...this.props} user={this.props.placeid} day={this.props.date} label="place"/>
                {this.props.users.map((data, index) =>
                    <Day {...this.props} key={index} data={data} user={data} day={this.props.date} label=""/>)}
            </div>
        )
    }
}

export default Ensemble;