import React, {Component} from 'react';
import Slot from "./Slot";
import axios from "axios/index";

class Day extends React.Component {
    state = {json: [], slots: [{id:'',text:'',box:''}]};

    render() {
        return (
            <div id="day" style={{display:'inline-block'}}>
                <div className="header">{this.props.label}</div>
                {this.state.slots.map((data, index) => <Slot key={index} data={data}/>)}
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
        axios.get('/api/bookings/day/user/'+this.props.user+'?day='+this.props.day)
            .then(response => {
                const json = response.data;
                this.setState({json});
                console.log(json);

                // Fill the day's slot array with emptiness...
                var entry = {id:0,text:''};
                let slots = Array.from(Array(96), () => entry);

                for (var i = 0; i < json.length; i++) {
                    let start = this.convertToSlots(json[i].begin.substring(11));
                    let ending = this.convertToSlots(json[i].ending.substring(11));
                    for (var x = start; x < ending; x++) {
                        var boxClass='middle';
                        var text = '';
                        if (x===start) {
                            boxClass='first';
                            text = json[i].type;
                        }
                        if (x===ending-1) boxClass+=' last';
                        console.log(start+","+ending+","+x+","+boxClass);

                        slots[x] = {id:json[i].id,text:text,box:boxClass};
                    }
                }
                console.log(slots);
                // Showing only slots after 7 am and before 11 pm
                slots.splice(0, 28);
                slots.splice(63,5);
                this.setState({slots});
            });
    }
}

export default Day;