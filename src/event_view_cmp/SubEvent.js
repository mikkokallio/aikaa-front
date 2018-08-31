import React, {Component} from 'react';

class SubEvent extends React.Component {

    render() {
        return (
            <tr>
                <td><span className="glyphicon glyphicon-flag"></span> {this.props.data.name}</td>
                <td>{this.props.data.type}</td>
                <td>{this.props.data.begin}</td>
                <td>{this.props.data.ending}</td>
                <td>{this.props.data.place.name}</td>
            </tr>
        );
    }
}

export default SubEvent;