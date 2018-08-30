import React, {Component} from 'react';
import Work from './Work';
import { Redirect } from 'react-router-dom';

class SubEvent extends React.Component {

    render() {
        return (
            <tr>
                <td><span className="glyphicon glyphicon-flag"></span> {this.props.data.name}</td>
                <td>{this.props.data.type}</td>
                <td>{this.props.data.begin}</td>
                <td>{this.props.data.end}</td>
                <td>{this.props.data.place.name}</td>
            </tr>
        );
    }
}

export default SubEvent;

//id: 2,
// name: "konsertti 1",
// type: "konsertti",
// begin: "2019-07-06T19:00:00",
// end: "2019-07-06T21:00:00",
// place: {
// id: null,
// name: "Konserttisali",
// address: null
// },
// event: null,
// castAndCrew: null,
// work: null
// },