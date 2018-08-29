import React from 'react';
import axios from "axios/index";
import Slot from "../components/Slot";

class Schedule extends React.Component {
    state = {json: [], slots: [{id:'',text:''}]};

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
                <p>Myös viikkonäkymä, jossa on vartin slotit aktiviteeteille.</p>
                <input type="date" placeholder="Valitse päivä"></input>
                <div id="day">
                    {this.state.slots.map((data, index) => <Slot key={index} data={data}/>)}
                </div>
            </div>
        )

    }

    // Converts hh:mm:ss to an integer in a 96-slot calendar of 15-minute slots
    convertToSlots(time) {
        let slot = time.substring(0,2)*4;
        let minutes = time.substring(3,5);
        switch(minutes){
            case "00": break;
            case "15": {
                slot+=1;
                break;
            }
            case "30": {
                slot+=2;
                break;
            }
            case "45": {
                slot+=3;
                break;
            }
        }
        return slot;
    }

    componentDidMount() {
        this.setState({isLoading: true});
        axios.get('/api/bookings')
            .then(response => {
                const json = response.data;
                this.setState({json});
                console.log(json);

                let slots = [];
                for (var i = 0; i < json.length; i++) {
                    let start = this.convertToSlots(json[i].begin.substring(11));
                    let end = this.convertToSlots(json[i].end.substring(11));
                    for (var x = start; x < end; x++) {
                        //slots[x] = json[i].id;
                        var entry = {id:json[i].id,text:json[i].type};
                        slots[x]= entry;
                    }
                }
                //slots.push();
                console.log(slots);
                this.setState({slots});
            });
    }
}

export default Schedule;