import React from 'react';
import axios from "axios/index";

class Schedule extends React.Component {
    state = {json:[]};
    render () {
        console.log(this.state.json);

        return (
            <div className="boxx">
                <h1>Aikataulu / Tidtabell</h1>
                <div className="alert alert-info">
                    <span className="glyphicon glyphicon-info-sign"></span> Tässä näkymässä voit tarkastella mitä tapahtumia ja aktiviteetteja sinulle
                    on tarjottu ja mitä olet hyväksynyt aikatauluusi.
                </div>
                <p>JS-kalenteri, joka värikoodaa päivät sen mukaan mitä agendalla on.</p>
                <p>Myös viikkonäkymä, jossa on puolen tunnin slotit aktiviteeteille.</p>
            </div>
        )

    }
    componentDidMount()
    {
        this.setState({isLoading: true});
        axios.get('/afos')
            .then(response => {
                const json = response.data;
                this.setState({json});
            });
    }

}

export default Schedule;