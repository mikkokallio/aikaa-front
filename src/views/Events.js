import React from 'react';
import Event from "../components/Event";
import axios from "axios/index";

class Events extends React.Component {
    state = {json:[]};
    render () {
        console.log(this.state.json);

    return (
        <div className="boxx">
            <h1>Tapahtumat / Evenemang</h1>
            <div className="alert alert-info">
                <span className="glyphicon glyphicon-info-sign"></span> Tässä näkymässä voit tarkastella ja hallita tapahtumia ja niihin liittyviä
                aktiviteetteja (/tapahtumien osat).
            </div>
            <p>Tapahtumat (events) ja tapahtumien osat (sub-events)</p>
            <p>Ketkä tarvii tämän? super-admin välillä, admin joo, käyttäjä ei?</p>
            <p>-Listaa kaikki tapahtumat tai filtteröidyt tapahtumat</p>
            <p>-Listaa kaikki tapahtumien osat tai vain yllä valitun tapahtuman osat</p>
            <p>-Lisää uusi tapahtuma tai osa</p>
            <p>-Poista</p>
            <p>-Päivitä</p>
            <p>-Kopioi</p>
            <p>-Pitäiskö olla haitarinäkymä headeina tapahtumat, alla osat?</p>
            <p>-Mahdollisuus klikata tapahtuman henkilöt/tarvitut roolit näkyviin? Tämä on oma näkymä.</p>
            <table>
                <tbody>
                    {this.state.json.map((data, index) => <Event key={index} data={data}/>)}
                </tbody>
            </table>
        </div>
    )

    }
    componentDidMount()
    {
        this.setState({isLoading: true});
        axios.get('/api/events')
            .then(response => {
                const json = response.data;
                this.setState({json});
            });
    }

}

export default Events;