import React from 'react';
import TimeLabel from "./TimeLabel";
import Week from "./Week";
import LocalizedStrings from 'react-localization';

const strings = new LocalizedStrings({
    fi:{
        heading:"Aikataulu",
        description:"Tässä näkymässä voit tarkastella mitä\n" +
        "                    tapahtumia ja aktiviteetteja sinulle\n" +
        "                    on tarjottu ja mitä olet hyväksynyt aikatauluusi.",
        time:"Aika"
    },
    sv: {
        heading:"Tidtabell",
        description:"I den här vyn kan du se vilka evenemang som du har bokat osv.",
        time:"Tid"
    }
});

class Schedule extends React.Component {
    state = {labels: [], monday:''};

    prevWeek = () => {
        // Lisää viikkoa yhdellä. Tarkista meneekö vuosi yli.
    };
    nextWeek = () => {
        // Vähennä viikkoa yhdellä. Tarkista meneekö vuosi yli.
    };
    handleMonthChange = (event) => {
        this.setState({ month: event.target.value });
    };
    handleEmailChange = (event) => {
        this.setState({ year: event.target.value });
    };


    render() {
        if (sessionStorage.getItem("language")!==null) strings.setLanguage(localStorage.getItem("language"));
        var id = sessionStorage.getItem("id");
        id = 6;
        var date = new Date();
        var day = date.getDay(), diff = date.getDate() - day + (day == 0 ? -6:1);
        date = new Date(date.setDate(diff));

        // console.log("Day of month: ",dt.getDate());
        // console.log("Day of week: ",dt.getDay());
        // console.log("Month: ",dt.getMonth());
        console.log(date);
        // var diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
            // return new Date(date.setDate(diff));

        return (
            <div className="boxx" style={{whiteSpace:'nowrap',maxWidth:'99%'}}>
                <h1>{strings.heading}</h1>
                <div className="alert alert-info">
                    <span className="glyphicon glyphicon-info-sign"></span> {strings.description}
                </div>
                <div style={{display:'block',margin:'0 auto'}} >
                    <input className="btn btn-primary" type="submit"
                            value="Edellinen viikko" onClick={this.prevWeek} /> Viikko <
                    input style={{width:'20px'}} type="text" value={this.state.month} onChange={this.handleMonthChange}></input>
                    Vuosi <input style={{width:'40px'}} value={this.state.year} onChange={this.handleEmailChange}/><span> </span>
                     <input className="btn btn-primary" type="submit"
                           value="Seuraava viikko" onClick={this.nextWeek} /></div>
                <div className="boxx">
                <div id="times" style={{display:'inline-block'}}>
                    <div className="header">{strings.time}</div>
                    {this.state.labels.map((data, index) => <TimeLabel key={index} data={data}/>)}
                </div>
                <Week monday={date} user={id} />
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.createTimeLabels();
    }

    // Create time labels for the calendar
    createTimeLabels() {
        var hours = 0; var minutes = 0;
        var labels = [];
        for (var i = 0; i < 96; i++) {
            var hourStr = (hours<10) ? '0'+hours : hours;
            var minStr = (minutes<15) ? '0'+minutes : minutes;

            labels[i]=hourStr+":"+minStr;
            if (minutes === 15 || minutes === 45) labels[i]="";
            minutes+=15;
            if (minutes===60) {
                minutes=0;
                hours++;
            }
        }
        // Showing only slots after 7 am and before 11 pm
        labels.splice(0,28);
        labels.splice(64,4);
        this.setState({labels});
    }
}

export default Schedule;