import React, {Component} from 'react';
import Work from './Work';

class CalendarEntry extends React.Component {

    render() {
        return (
            <tr>
                <td><span className="glyphicon glyphicon-tag"></span> {this.props.data.type}</td>
                <td>{this.props.data.begin}</td>
                <td>{this.props.data.end}</td>
                <td>{this.props.data.userid}</td>
                <td>{this.props.data.username}</td>
                <td>{this.props.data.rolename}</td>
                <td>{this.props.data.workname}</td>
                <td>{this.props.data.placename}</td>
            </tr>
        )
    }
}

export default CalendarEntry;