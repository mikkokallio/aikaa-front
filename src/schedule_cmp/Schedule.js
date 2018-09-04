import React from 'react';
import Week from "./Week";
import TimeLabels from "./TimeLabels";
import LocalizedStrings from 'react-localization';

const strings = new LocalizedStrings({
    fi: {
        heading: "Aikataulu",
        description: "Tässä näkymässä voit tarkastella mitä\n" +
        "                    tapahtumia ja aktiviteetteja sinulle\n" +
        "                    on tarjottu ja mitä olet hyväksynyt aikatauluusi.",
    },
    sv: {
        heading: "Tidtabell",
        description: "I den här vyn kan du se vilka evenemang som du har bokat osv.",
    }
});

var date;

class Schedule extends React.Component {
    state = {labels: [], monday: ''};

    prevWeek = () => {
        date.setDate(date.getDate() - 8);
        sessionStorage.setItem("monday", date);
        this.setState({});
    };
    nextWeek = () => {
        date.setDate(date.getDate() + 6);
        sessionStorage.setItem("monday", date);
        this.setState({});
    };
    handleDateChange = (event) => {
        sessionStorage.setItem("monday", event.target.value);
        console.log(sessionStorage.getItem("monday"));
        this.setState({});
    };

    render() {
        if (sessionStorage.getItem("language") !== null) strings.setLanguage(localStorage.getItem("language"));
        var id = sessionStorage.getItem("id");
        id = 1;
        if (sessionStorage.getItem("monday") === null) {
            console.log("Showing this week!");
            date = new Date();
        } else {
            date = new Date(sessionStorage.getItem("monday").replace("/", "-"));
        }
        var day = date.getDay(), diff = date.getDate() - day + (day == 0 ? -6 : 1);
        date = new Date(date.setDate(diff));
        console.log(date);

        var dates = [];
        var shortDates = [];
        for (var d = 0; d < 7; d++) {
            var yyyy = date.getFullYear();
            var month = date.getMonth() + 1;
            var mm = (month.toString().length === 1 ? "0" + month : month);
            var day = date.getDate();
            var dd = (day.toString().length === 1 ? "0" + day : day);
            dates[d] = yyyy + "-" + mm + "-" + dd;
            shortDates[d] = day + "." + month;
            date.setDate(date.getDate() + 1);
        }

        return (
            <div className="boxx" style={{whiteSpace: 'nowrap', maxWidth: '99%'}}>
                <h1>{strings.heading}</h1>
                <div className="alert alert-info">
                    <span className="glyphicon glyphicon-info-sign"></span> {strings.description}
                </div>
                <div style={{display: 'block', margin: '0 auto'}}>
                    <input className="btn btn-primary" type="submit"
                           value="Edellinen viikko" onClick={this.prevWeek}/>
                    <div style={{width: '60%', display: 'inline-block'}}><input type="date" label="Hae pvm" style={{
                        display: 'block',
                        margin: '0 auto'
                    }} value={this.state.year} onChange={this.handleDateChange}/></div>
                    <input style={{float: 'right'}} className="btn btn-primary" type="submit"
                           value="Seuraava viikko" onClick={this.nextWeek}/></div>
                <div className="boxx">
                    <TimeLabels/>
                    <Week dates={dates} shortDates={shortDates} user={id}/>
                </div>
            </div>
        )
    }
}

export default Schedule;