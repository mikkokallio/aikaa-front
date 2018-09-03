import React, {Component} from 'react';

class EventListing extends React.Component {
    state = {redirect: false};

    openEvent = (evt) => {
        const url = '/events/' + this.props.data.id;
        this.props.history.push(url);
    };

    render() {
        const { history } = this.props;

        return (
            <tr>
                <td><span className="glyphicon glyphicon-flag"></span> {this.props.data.name}</td>
                <td>{this.props.data.subEvents.length}</td>
                <td><div className="circle" onClick={this.openEvent}><span className="glyphicon glyphicon-edit"></span></div></td>
            </tr>
        );
    }
}

export default EventListing;