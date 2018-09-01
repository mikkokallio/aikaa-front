import React from 'react';
import Work from './Work';
import NewWork from "./NewWork";

class WorksList extends React.Component {

    render () {
        return(
            <table className="boxx table-striped">
                <thead>
                <tr><th>Teos</th><th>Säveltäjä</th><th>Kesto</th><th>Muusikot</th><th>Instrumentaatio</th><th/></tr>
                </thead>
                <tbody>{this.props.data&&this.props.data.map((data, index) => <Work {...this.props} key={index} data={data}/>)}
                {/*Alla oleva varmaankin vaaditaan jollekin tasolle jos haluaa mennä juuri tiettyyn workkiin!*/}
                {/*{this.state.json.map((data, index) => <Work {...this.props} id={this.state.json.id} key={index} data={data}/>)}*/}

                <NewWork {...this.props} callBack={this.props.callBack} eventid={this.props.eventid}/>
                {/*Tähän tulee nappi jolla voi lisätä biisejä subeihin. Näkyy vain tietyssä kontekstissa.*/}
                {/*<AddWork/>*/}
                </tbody>
            </table>
        )
    }
}


export default WorksList;