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

var date;

class Schedule extends React.Component {
    state = {labels: [], monday:''};

    prevWeek = () => {
        // Lisää viikkoa yhdellä. Tarkista meneekö vuosi yli.
        date.setDate(date.getDate() - 7);
        sessionStorage.setItem("monday",date);
        this.setState({});
    };
    nextWeek = () => {
        // Vähennä viikkoa yhdellä. Tarkista meneekö vuosi yli.
        date.setDate(date.getDate() + 7);
        sessionStorage.setItem("monday",date);
        this.setState({});
    };
    handleDateChange = (event) => {
        sessionStorage.setItem("monday",event.target.value);
        console.log(sessionStorage.getItem("monday"));
        this.setState({});
    };

    render() {
        if (sessionStorage.getItem("language")!==null) strings.setLanguage(localStorage.getItem("language"));
        var id = sessionStorage.getItem("id");
        id = 1;
        sessionStorage.removeItem("monday");
       // var date = Date.parse(sessionStorage.getItem("monday"));
       console.log(date);
       var date = '';
        // if (isNaN(date)) {
            console.log("Showing this week!");
            var date = new Date();
            var date = new Date('2019-08-09T00:00:00');
        // }
        var day = date.getDay(), diff = date.getDate() - day + (day == 0 ? -6:1);
        date = new Date(date.setDate(diff));
        console.log(date);

        var dates = [];
        for (var d = 0; d < 7; d++) {
            var yyyy = date.getFullYear();
            var month = date.getMonth();
            var mm = (month.toString().length===1?"0"+month:month);
            var day = date.getDate();
            var dd = (day.toString().length===1?"0"+day:day);
            dates[d] = yyyy+"-"+mm+"-"+dd;
            date.setDate(date.getDate() + 1);
        }

        return (
            <div className="boxx" style={{whiteSpace:'nowrap',maxWidth:'99%'}}>
                <h1>{strings.heading}</h1>
                <div className="alert alert-info">
                    <span className="glyphicon glyphicon-info-sign"></span> {strings.description}
                </div>
                <div style={{display:'block',margin:'0 auto'}} >
                    <input className="btn btn-primary" type="submit"
                            value="Edellinen viikko" onClick={this.prevWeek} />
                    <div style={{width:'60%',display:'inline-block'}}><input type="date" label="Hae pvm" style={{display:'block',margin:'0 auto'}} value={this.state.year} onChange={this.handleDateChange}/></div>
                    <input style={{float:'right'}} className="btn btn-primary" type="submit"
                           value="Seuraava viikko" onClick={this.nextWeek} /></div>
                <div className="boxx">
                <div id="times" style={{display:'inline-block'}}>
                    <div className="header">{strings.time}</div>
                    {this.state.labels.map((data, index) => <TimeLabel key={index} data={data}/>)}
                </div>
                <Week dates={dates} user={id} />
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