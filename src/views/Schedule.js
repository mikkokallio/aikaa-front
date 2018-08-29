import React from 'react';
import axios from "axios/index";
import TimeLabel from "../components/TimeLabel";
import Week from "../components/Week";
import Day from "../components/Day";

class Schedule extends React.Component {
    state = {labels: []};

    render() {
        //console.log(this.state.json);

        return (
            <div className="boxx">
                <h1>Aikataulu / Tidtabell</h1>
                <div className="alert alert-info">
                    <span className="glyphicon glyphicon-info-sign"></span> Tässä näkymässä voit tarkastella mitä
                    tapahtumia ja aktiviteetteja sinulle
                    on tarjottu ja mitä olet hyväksynyt aikatauluusi.
                </div>
                <p>JS-kalenteri, joka värikoodaa päivät sen mukaan mitä agendalla on.</p>
                {/*<input type="date" placeholder="Valitse päivä"></input>*/}
                <div id="times" style={{display:'inline-block'}}>
                    <div className="timeTable timeLabel">Aika</div>
                    {this.state.labels.map((data, index) => <TimeLabel key={index} data={data}/>)}
                </div>
                <Week />
                {/*<Day user="1" day="2019-07-05"/>*/}
                {/*<Day user="2" day="2019-07-05"/>*/}
                {/*<Day user="3" day="2019-07-05"/>*/}
                {/*<Day user="4" day="2019-07-05"/>*/}
                {/*<Day user="5" day="2019-07-05"/>*/}
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
            minutes+=15;
            if (minutes===60) {
                minutes=0;
                hours++;
            }
        }
        this.setState({labels});
    }


}

export default Schedule;