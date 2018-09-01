import React, {Component} from 'react';

class Work extends React.Component {

    openWork = (evt) => {
        console.log("Hiphei!");
        const url = '/events/' + this.props.data.id;
        this.props.history.push(url);
    };

    render() {
        const { history } = this.props;
        console.log(this.props);
        return (
            <tr>
                <td><span className="glyphicon glyphicon-music"></span> {this.props.data.work}</td>
                <td>{this.props.data.composer}</td>
                <td>{this.props.data.durationInMinutes}</td>
                <td>{this.props.data.musicians}</td>
                <td>{this.props.data.instrumentation}</td>
                <td><div className="circle" onClick={this.openWork}><span className="glyphicon glyphicon-edit"></span></div></td>
            </tr>
        )
    }
}

export default Work;