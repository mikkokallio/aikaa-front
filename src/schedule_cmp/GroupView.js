import React from 'react';
import Ensemble from "./Ensemble";
import TimeLabels from "./TimeLabels";
import axios from "axios/index";

var date;

class Schedule extends React.Component {
    state = {placeid: '', subeventid: '', users: [], theDay: ''};

    prevDay = () => {
        date.setDate(date.getDate() - 1);
        sessionStorage.setItem("theDay", date);
        this.setState({});
    };
    nextDay = () => {
        date.setDate(date.getDate() + 1);
        sessionStorage.setItem("theDay", date);
        this.setState({});
    };
    handleDateChange = (event) => {
        sessionStorage.setItem("theDay", event.target.value);
        console.log(sessionStorage.getItem("theDay"));
        this.setState({});
    };

    render() {
        if (sessionStorage.getItem("theDay") === null) {
            console.log("Showing today!");
            date = new Date();
        } else {
            date = new Date(sessionStorage.getItem("theDay").replace("/", "-"));
        }
        console.log(this.state);

        var shortDate = '';
        var yyyy = date.getFullYear();
        var month = date.getMonth() + 1;
        var mm = (month.toString().length === 1 ? "0" + month : month);
        var day = date.getDate();
        var dd = (day.toString().length === 1 ? "0" + day : day);
        date = yyyy + "-" + mm + "-" + dd;
        shortDate = day + "." + month+"."+yyyy;

        return (
            <div className="boxx" style={{whiteSpace: 'nowrap', maxWidth: '99%'}}>
                <h1>Ryhmän aikataulutus</h1>
                <div className="alert alert-info">
                    <span className="glyphicon glyphicon-info-sign"></span> Tässä näkymässä näet mihin aikaan kukin
                    tapahtumaan osaan
                    roolitettu henkilö ja paikka ovat varattuina.
                </div>
                <div style={{display: 'block', margin: '0 auto'}}>
                    <input className="btn btn-primary" type="submit"
                           value="Edellinen päivä" onClick={this.prevDay}/>
                    <div style={{width: '60%', display: 'inline-block'}}><input type="date" label="Hae pvm" style={{
                        display: 'block',
                        margin: '0 auto'
                    }} value={this.state.year} onChange={this.handleDateChange}/></div>
                    <input style={{float: 'right'}} className="btn btn-primary" type="submit"
                           value="Seuraava päivä" onClick={this.nextDay}/></div>
                <div className="boxx">
                    <p style={{textAlign:'center'}}>{shortDate}</p>
                    <TimeLabels/>
                    <Ensemble date={date} placeid={this.state.placeid} users={this.state.users}/>
                </div>
            </div>
        )
    }
    componentDidMount() {
        this.load();
    }

    load = () => {
        this.setState({isLoading: true});
        this.setState({placeid: (this.props.location.search.split("&")[0]).split("=")[1]});
        var path = (this.props.location.search.split("&")[1]).split("=")[1];
        console.log("Path: "+path);

        axios.get('/api/bookings/subevents/'+path)
            .then(response => {
                const json = response.data;
                this.setState({json});
                console.log(json);
                var users = [];
                for (var i = 0; i < json.length; i++) {
                    if (!users.includes(json[i].userid)) users.push(json[i].userid);
                }
                this.setState({users:users});
            });
    }
}

export default Schedule;