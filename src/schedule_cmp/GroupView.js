import React from 'react';
import TimeLabel from "./TimeLabel";
import Week from "./Week";
import Ensemble from "./Ensemble";
import TimeLabels from "./TimeLabels";

var date;

class Schedule extends React.Component {
    state = {labels: [], theDay: ''};

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
        console.log(date);

        var shortDate = '';
        var yyyy = date.getFullYear();
        var month = date.getMonth() + 1;
        var mm = (month.toString().length === 1 ? "0" + month : month);
        var day = date.getDate();
        var dd = (day.toString().length === 1 ? "0" + day : day);
        date = yyyy + "-" + mm + "-" + dd;
        shortDate = day + "." + month+"."+yyyy;
        var users = [3,4,5,6];
        var placeid = 2;

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
                    <h4 style={{textAlign:'center'}}>{shortDate}</h4>
                    <TimeLabels/>
                    <Ensemble date={date} placeid={placeid} users={users}/>
                </div>
            </div>
        )
    }
}

export default Schedule;