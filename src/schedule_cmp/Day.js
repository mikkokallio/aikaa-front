import React, {Component} from 'react';
import Slot from "./Slot";
import axios from "axios/index";
import user from'../user.png';

class Day extends React.Component {
    state = {json: [], slots: [{id: '', text: '', box: ''}]};

    render() {
        console.log(this.state);
        return (
            <div id="day" style={{display: 'inline-block'}}>
                {!this.props.label&&<img src={this.state.picurl ? this.state.picurl : user} alt="Avatar" className="avatar" />}
                <div className="header">{this.props.label ? this.props.label : (this.state.json[0]&&this.state.json[0].username)}</div>
                {this.state.slots.map((data, index) => <Slot key={index} data={data}/>)}
            </div>
        )
    }

    componentDidUpdate(nextProps) {
        if (this.props !== nextProps) {
            this.load();
        }
    }

    // Converts hh:mm:ss to an integer in a 96-slot calendar of 15-minute slots
    convertToSlots(time) {
        let slot = time.substring(0, 2) * 4;
        let minutes = time.substring(3, 5);
        switch (minutes) {
            case "00":
                break;
            case "15": {
                slot += 1;
                break;
            }
            case "30": {
                slot += 2;
                break;
            }
            case "45": {
                slot += 3;
                break;
            }
        }
        return slot;
    }

    componentDidMount() {
        this.load();
    }

    load = () => {
        this.setState({isLoading: true});
        var type = this.props.label === 'place' ? 'place' : 'user';
        axios.get('/api/bookings/day/'+type+'/' + this.props.user + '?day=' + this.props.day)
            .then(response => {
                const json = response.data;
                this.setState({json});
                if (this.props.label==='' && this.props.name) this.setState({name: this.props.name});

                // Fill the day's slot array with emptiness...
                var entry = {id: 0, text: ''};
                let slots = Array.from(Array(96), () => entry);

                for (var i = 0; i < json.length; i++) {
                    let start = this.convertToSlots(json[i].begin.substring(11));
                    let ending = this.convertToSlots(json[i].ending.substring(11));
                    for (var x = start; x < ending; x++) {
                        var boxClass = 'middle';
                        var text = '';
                        if (x === start) {
                            boxClass = 'first';
                            text = json[i].type;
                        }
                        if (x === ending - 1) boxClass += ' last';
                        slots[x] = {id: json[i].id, text: text, box: boxClass};
                    }
                }
                // Showing only slots after 7 am and before 11 pm
                slots.splice(0, 28);
                slots.splice(63, 5);
                this.setState({slots});
                if (this.props.label==='' && json[0]) {
                    axios.get('/api/users/' + json[0].userid)
                        .then(response => {
                            const picurl = response.data.picurl;
                            this.setState({picurl:picurl});
                        })
                }
            });
    }
}

export default Day;