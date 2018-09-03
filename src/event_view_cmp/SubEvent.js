import React, {Component} from 'react';

class SubEvent extends React.Component {

    openSubEvent = (evt) => {
        const url = '/subevents/' + this.props.data.id;
        this.props.history.push(url);
    };

    render() {
        const { history } = this.props;
        return (
            <tr>
                <td><span className="glyphicon glyphicon-flag"></span> {this.props.data.name}</td>
                <td>{this.props.data.type}</td>
                <td>{this.props.data.begin}</td>
                <td>{this.props.data.ending}</td>
                <td>{this.props.data.place.name}</td>
                <td><div className="circle" onClick={this.openSubEvent}><span className="glyphicon glyphicon-edit"></span></div></td>
            </tr>
        );
    }
}

export default SubEvent;