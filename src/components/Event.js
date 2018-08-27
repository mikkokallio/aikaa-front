import React, {Component} from 'react';
import Work from './Work';

class Event extends React.Component {

    render() {
        return (
            <tr>
                <td><span className="glyphicon glyphicon-tag"></span> {this.props.data.name}</td>
                <td>
                    {this.props.data.works.map((data, index) => <Work key={index} data={data}/>)}
                </td>
            </tr>
        )
    }
}

export default Event;