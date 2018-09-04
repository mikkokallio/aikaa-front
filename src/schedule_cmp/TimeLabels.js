import React from 'react';
import TimeLabel from "./TimeLabel";
import LocalizedStrings from 'react-localization';

const strings = new LocalizedStrings({
    fi:{
        time:"Aika"
    },
    sv: {
        time:"Tid"
    }
});

class TimeLabels extends React.Component {
    state = {labels: []};

    render() {
        if (sessionStorage.getItem("language")!==null) strings.setLanguage(localStorage.getItem("language"));

        return (
                    <div id="times" style={{display:'inline-block'}}>
                        <div className="header">{strings.time}</div>
                        {this.state.labels.map((data, index) => <TimeLabel key={index} data={data}/>)}
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

export default TimeLabels;