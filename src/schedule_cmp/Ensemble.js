import React, {Component} from 'react';
import Day from "./Day";

class Ensemble extends React.Component {

    render() {
        return (
            <div style={{display:'inline-block'}}>
                // Day - paikka
                <Day user={this.props.place} day={this.props.day} label="paikan nimi"/>
                // Day - x määrä usereita
                {this.props.users.map((data, index) =>
                    <Day {...this.props} key={index} data={data} user={this.props.user} day={this.props.day} label={this.props.name}/>)}
            </div>
        )
    }
}

export default Ensemble;