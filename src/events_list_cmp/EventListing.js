import React, {Component} from 'react';

class EventListing extends React.Component {
    state = {redirect: false};

    openEvent = (evt) => {
        console.log("Hiphei!");
        const url = '/events/' + this.props.data.id;
        this.props.history.push(url);
    };

    render() {
        const { history } = this.props;

        return (
            <tr onClick={this.openEvent}>
                <td><span className="glyphicon glyphicon-flag"></span> {this.props.data.name}</td>
                <td>{this.props.data.subEvents.length}</td>
            </tr>
        );
    }
}

export default EventListing;