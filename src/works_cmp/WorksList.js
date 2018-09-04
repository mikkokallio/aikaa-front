import React from 'react';
import Work from './Work';
import NewWork from "./NewWork";
import AddWork from "./AddWork";

class WorksList extends React.Component {

    render () {
        return(
            <table className="boxx table-striped">
                <thead>
                <tr><th>Teos</th><th>Säveltäjä</th><th>Kesto</th><th>Muusikot</th><th>Instrumentaatio</th><th/></tr>
                </thead>
                <tbody>{this.props.data&&this.props.data.map((data, index) => <Work {...this.props} key={index} data={data}/>)}
                <AddWork {...this.props} callBack={this.props.callBack} eventid={this.props.eventid}/>
                <NewWork {...this.props} callBack={this.props.callBack} eventid={this.props.eventid}/>
                </tbody>
            </table>
        )
    }
}

export default WorksList;