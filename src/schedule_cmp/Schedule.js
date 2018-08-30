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
    state = {labels: []};

    render() {
        return (
            <div className="boxx">
                <h1>{strings.heading}</h1>
                <div className="alert alert-info">
                    <span className="glyphicon glyphicon-info-sign"></span> {strings.description}
                </div>
                <p>JS-kalenteri, joka värikoodaa päivät sen mukaan mitä agendalla on.</p>
                <p><input type="date" placeholder="Valitse päivä"></input></p>
                <div id="times" style={{display:'inline-block'}}>
                    <div className="header">{strings.time}</div>
                    {this.state.labels.map((data, index) => <TimeLabel key={index} data={data}/>)}
                </div>
                <Week user="6" />
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