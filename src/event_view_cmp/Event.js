import React, {Component} from 'react';
import Work from '../works_cmp/Work';
import SubEvent from './SubEvent';
import axios from "axios/index";
import NewSubEvent from "./NewSubEvent";
import WorksList from "../works_cmp/WorksList";

class Event extends React.Component {
    state = { json: {subEvents:[],works:[]} };

    componentDidMount()
    {
        this.load();
    }

    load = () => {
        this.setState({isLoading: true});
        axios.get('/api'+this.props.location.pathname)
            .then(response => {
                const json = response.data;
                this.setState({json});
            });
    };

    render() {
        return (
            <div className="boxx">
                <h1>{this.state.json.name} (id:{this.state.json.id})</h1>
                <p>Toiseksi: Peruskäyttäjän näkymä, jossa näkyy valitun tapahtuman tiedot.</p>
                <p>JÄRJESTÄJÄN LEISKA</p>
                <p>Sama leiska, mutta kaikki muuttujat on jo input-muotoa. Voi muokata
                    ja luoda uusia samalla lomakkeella. Eventin voi poistaa VAIN jos kaikki sen sisältö on poistettu.</p>
                <p>-Poista: Ei saa poistaa paitsi jos kaikki subeventit ja biisit on tyhjinä! Alert tulee esiin ja kertoo
                    mitkä kentät pitää olla tyhjinä että on mahdollista.</p>
                <p>-Päivitä. Jeejee!</p>
                <p>-Kopioi: identtinen konserttiohjelma joka esitetään useammassa eri paikassa. ID ei saa olla mukana kun
                    postataan kloonattu! Workia ei kopioida, vaan viite siihen vain päivittyy kloonatussa.</p>
                <p>-Mahdollisuus klikata tapahtuman henkilöt/tarvitut roolit näkyviin? Tämä on oma näkymä.</p>
                <table className="boxx table-striped">
                    <thead>
                    <tr><th>Tapahtuma</th><th>Tyyppi</th><th>Alkaa</th><th>Päättyy</th><th>Sijainti</th><th/></tr>
                    </thead>
                    <tbody>
                    {this.state.json.subEvents.map((data, index) => <SubEvent key={index} data={data}/>)}
                    <NewSubEvent event={this.state.json.id} callBack={this.load}/>
                    </tbody>
                </table>
                <WorksList data={this.state.json.works} eventid={this.state.json.id}/>
            </div>
        )
    }
}

export default Event;