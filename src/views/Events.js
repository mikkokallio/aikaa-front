import React from 'react';
import Carousel from "../components/Carousel";
import axios from "axios/index";

class Events extends React.Component {
    state = {json:[{"id":1,"name":"Konsertti1","subEvents":[{"id":1,"name":"saliharjoitus","type":"harjoitus","begin":"2019-07-06T15:00:00","end":"2019-07-06T18:00:00","place":null,"event":null,"castAndCrew":null,"work":null},{"id":2,"name":"konsertti 1","type":"konsertti","begin":"2019-07-06T19:00:00","end":"2019-07-06T21:00:00","place":null,"event":null,"castAndCrew":null,"work":null},{"id":3,"name":"harjoitus","type":"harjoitus","begin":"2019-07-05T11:00:00","end":"2019-07-05T15:00:00","place":null,"event":null,"castAndCrew":null,"work":null}],"works":[{"id":1,"work":"Jousikvartetto","composer":"Schumann","musicians":4,"durationInMinutes":32,"instrumentation":"2vl, 1vla, 1vcl"},{"id":2,"work":"Gretchen am Spinnrade","composer":"Schubert","musicians":2,"durationInMinutes":5,"instrumentation":"1s, 1pf"},{"id":3,"work":"Tilausteos","composer":"Nuori säveltäjä","musicians":6,"durationInMinutes":35,"instrumentation":"1s, 2vl, 1vla, 1vcl, 1pf"}]},{"id":2,"name":"Konsertti2","subEvents":[],"works":[]},{"id":3,"name":"NotAvailable","subEvents":[{"id":4,"name":"poissa","type":"poissaolo","begin":"2019-07-06T00:00:00","end":"2019-07-06T15:00:00","place":null,"event":null,"castAndCrew":null,"work":null}],"works":[]}]};
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
            {/*<p>"id":1,"name":"Konsertti1","subEvents":[{"id":1,"name":"saliharjoitus","type":"harjoitus","begin":"2019-07-06T15:00:00","end":"2019-07-06T18:00:00","place":null,"event":null,"castAndCrew":null,"work":null},*/}
                {/*{"id":2,"name":"konsertti 1","type":"konsertti","begin":"2019-07-06T19:00:00","end":"2019-07-06T21:00:00","place":null,"event":null,"castAndCrew":null,"work":null},*/}
                {/*{"id":3,"name":"harjoitus","type":"harjoitus","begin":"2019-07-05T11:00:00","end":"2019-07-05T15:00:00","place":null,"event":null,"castAndCrew":null,"work":null}],*/}
                {/*"works":[{"id":1,"work":"Jousikvartetto","composer":"Schumann","musicians":4,"durationInMinutes":32,"instrumentation":"2vl, 1vla, 1vcl"},*/}
                {/*{"id":2,"work":"Gretchen am Spinnrade","composer":"Schubert","musicians":2,"durationInMinutes":5,"instrumentation":"1s, 1pf"},*/}
                {/*{"id":3,"work":"Tilausteos","composer":"Nuori säveltäjä","musicians":6,"durationInMinutes":35,"instrumentation":"1s, 2vl, 1vla, 1vcl, 1pf"}]},*/}
                {/*{"id":2,"name":"Konsertti2","subEvents":[],"works":[]},*/}
                {/*{"id":3,"name":"NotAvailable","subEvents":[{"id":4,"name":"poissa","type":"poissaolo","begin":"2019-07-06T00:00:00","end":"2019-07-06T15:00:00","place":null,"event":null,"castAndCrew":null,"work":null}],"works":[]}]};</p>*/}
            <p>-Pitäiskö olla haitarinäkymä headeina tapahtumat, alla osat?</p>
            <p>-Mahdollisuus klikata tapahtuman henkilöt/tarvitut roolit näkyviin? Tämä on oma näkymä.</p>
            <h4>Kaarlepyyn Laulujuhlat</h4>
            <table>
                <tr>
                    <td>Nimi</td>
                    <td>Päivä</td>
                    <td>Aika</td>
                    <td>Paikka</td>
                    <td>Osoite</td>
                </tr>
                <tr>
                    <td>Treeni</td>
                    <td>25.8.2018</td>
                    <td>12:00-15:00</td>
                    <td>Treenipaikka X</td>
                    <td>Treenikatu 5</td>
                </tr>
            </table>
        </div>
    )

    }
    componentDidMount()
    {
        this.setState({isLoading: true});
        axios.get('/afos')
            .then(response => {
                const json = response.data;
                this.setState({json});
            });
    }

}

export default Events;