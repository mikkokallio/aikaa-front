import React from 'react';
import TimeLabel from "../schedule_cmp/TimeLabel";
import Week from "../schedule_cmp/Week";
import Day from "../schedule_cmp/Day";
import WorkCast from "./WorkCast";
import LocalizedStrings from 'react-localization';
import axios from "axios/index";

const strings = new LocalizedStrings({
    fi:{
        heading:"Varaus",
        description:"Tässä näkymässä voit...",
        time:"Aika"
    },
    sv: {
        heading:"Bokning",
        description:"I den här vyn ...",
        time:"Tid"
    }
});

class Booking extends React.Component {
    state = {labels: [], event:[]};

    render() {
        console.log(this.state.subevent);
        if (localStorage.getItem("language")!==null) strings.setLanguage(localStorage.getItem("language"));
        return (
            <div className="boxx" style={{whiteSpace:'nowrap',maxWidth:'99%'}}>
                <h1>{strings.heading}</h1>
                <div className="alert alert-info">
                    <span className="glyphicon glyphicon-info-sign"></span> {strings.description}
                </div>
                    <table className="boxx table-striped">
                        <thead>
                        <tr><th colSpan={2}><span className="glyphicon glyphicon-flag"></span><span> </span>Roolitukset: {this.state.event.name}</th></tr>
                        </thead>
                        <tbody>
                        {this.state.event.works&&this.state.event.works.map((data, index) => <WorkCast key={index} data={data}/>)}
                        <tr>
                            <td><input className="btn btn-primary" type="submit" onClick={this.handleUpdateClick}
                                       value="Talleta"/>
                            </td>
                            <td><input className="btn btn-warning" type="submit" onClick={this.handleRevertClick} value="Peru"/></td></tr>
                        </tbody>
                    </table>

                    <div id="times" style={{display:'inline-block'}}>
                        <div className="header">{strings.time}</div>
                        {this.state.labels.map((data, index) => <TimeLabel key={index} data={data}/>)}
                    </div>
                    {/*<Week user="6" />*/}
                    <div style={{display:'inline-block'}}>
                        <Day user={this.props.user} day="2019-07-05" label="ma"/>
                        <Day user="3" day="2019-07-05" label="Tiina"/>
                        <Day user="4" day="2019-07-05" label="Maija"/>
                        <Day user="5" day="2019-07-05" label="Hannu"/>
                        <Day user="6" day="2019-07-05" label="Tytti"/>
                        <Day user="7" day="2019-07-05" label="Jorma"/>
                    </div>

            </div>
        )
    }

    componentDidMount() {
        this.load();
        this.createTimeLabels();
    }

    load = () => {
        this.setState({isLoading: true});
        axios.get('/api/events/1')
            .then(response => {
                const event = response.data;
                this.setState({event});
            });
    };

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

export default Booking;