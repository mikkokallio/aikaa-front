import React, {Component} from 'react';
import Work from './Work';
import { Redirect } from 'react-router-dom';

class EventListing extends React.Component {
    state = {redirect: false};

    countSubEvents () {
        console.log(this.props.data.subEvents.length);
    }
    setRedirect = (e) => {
        e.preventDefault();
        this.setState({
            redirect: true
        })
    };
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect id={this.props.data.id} to='/event' />
        }
    };

    render() {

        return (
            <tr onClick={() => { openEvent(this.props.data.id)}}>
                <td><span className="glyphicon glyphicon-flag" onClick={this.setRedirect}></span> {this.props.data.name}</td>
                <td>{this.props.data.subEvents.length}</td>
                {/*{this.props.data.works.map((data, index) => <Work key={index} data={data}/>)}*/}
            </tr>
        );

        function openEvent (id) {
            console.log("Hiphei!"+id);
            const url = '/maasivu/' + this.props.data.id;
            this.props.history.push(url);


        }

    }

}

export default EventListing;