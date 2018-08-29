import React, {Component} from 'react';
import Day from "../components/Day";

class Week extends React.Component {

    render() {
        return (
            <div style={{display:'inline-block'}}>
                <Day user="1" day="2019-07-05" label="maanantai"/>
                <Day user="1" day="2019-07-06" label="tiistai"/>
                <Day user="1" day="2019-07-07" label="keskiviikko"/>
                <Day user="1" day="2019-07-08" label="torstai"/>
                <Day user="1" day="2019-07-09" label="perjantai"/>
                <Day user="1" day="2019-07-10" label="lauantai"/>
                <Day user="1" day="2019-07-11" label="sunnuntai"/>
            </div>
        )
    }
}

export default Week;