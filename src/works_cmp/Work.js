import React, {Component} from 'react';

class Work extends React.Component {

    handleCreateClick () {

    }

    render() {
        console.log(this.props);
        return (
            <tr>
                <td><span className="glyphicon glyphicon-music"></span> {this.props.data.work}</td>
                <td>{this.props.data.composer}</td>
                <td>{this.props.data.durationInMinutes}</td>
                <td>{this.props.data.musicians}</td>
                <td>{this.props.data.instrumentation}</td>
                <td><div className="circle" onClick={this.handleCreateClick.bind(this)}><span className="glyphicon glyphicon-edit"></span></div></td>
            </tr>
        )
    }
}

export default Work;