import React from 'react';
import Work from './Work';
import NewWork from "./NewWork";


const WorksList = (props) => {
    return(
    <table className="boxx table-striped">
        <thead>
        <tr><th>Teos</th><th>Säveltäjä</th><th>Kesto</th><th>Muusikot</th><th>Instrumentaatio</th></tr>
        </thead>
        <tbody>{props.data&&props.data.map((data, index) => <Work key={index} data={data}/>)}
        <NewWork callBack={this.load}/>
        </tbody>
    </table>
    )
};

export default WorksList;