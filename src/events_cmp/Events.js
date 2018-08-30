import React from 'react';
import EventListing from "./EventListing";
import axios from "axios/index";
import Event from "./Event";
import EventEdit from "./EventEdit";
import NewEvent from "./NewEvent";

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
            <p>ENSINNÄKIN: Päänäkymä, joka listaa kaikki tapahtumat muttei paljon muuta.</p>
            <p>Toiseksi: Peruskäyttäjän näkymä, jossa näkyy valitun tapahtuman tiedot.</p>
            <p>Kolmanneksi: Järjestäjän näkymä, jossa sama leiska, mutta kaikki muuttujat on jo input-muotoa. Voi muokata
                ja luoda uusia samalla lomakkeella. Eventin voi poistaa VAIN jos kaikki sen sisältö on poistettu.</p>
            <p>-Lisää uusi tapahtuma tai osa</p>
            <p>-Poista: Ei saa poistaa paitsi jos kaikki subeventit ja biisit on tyhjinä! Alert tulee esiin ja kertoo
            mitkä kentät pitää olla tyhjinä että on mahdollista.</p>
            <p>-Päivitä. Jeejee!</p>
            <p>-Kopioi: identtinen konserttiohjelma joka esitetään useammassa eri paikassa. ID ei saa olla mukana kun
            postataan kloonattu! Workia ei kopioida, vaan viite siihen vain päivittyy kloonatussa.</p>
            <p>-Pitäiskö olla haitarinäkymä headeina tapahtumat, alla osat?</p>
            <p>-Mahdollisuus klikata tapahtuman henkilöt/tarvitut roolit näkyviin? Tämä on oma näkymä.</p>
            <table className="boxx">
                <tr><td>Tapahtuma</td><td>Osat</td><td>Säveltäjät</td></tr>
            {this.state.json.map((data, index) => <EventListing key={index} data={data}/>)}
                <NewEvent callBack={this.load}/>
            </table>
            <Event/>
        </div>
    )}

    componentDidMount()
    {
        this.load();
    }

    load = () => {
        this.setState({isLoading: true});
        axios.get('/api/events')
            .then(response => {
                const json = response.data;
                this.setState({json});
            });
    };

}

export default Events;