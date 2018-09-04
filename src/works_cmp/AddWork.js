import React from 'react';
import axios from 'axios';

class NewWork extends React.Component {
    state = {workid: '',works:[]};
    handleAddClick = (event) => {
        let requestparam = '';
        if (this.props.eventid) {
        requestparam += '?event=true&eventid='+this.props.eventid;
        }
        axios.post('/api/works'+requestparam, { work:this.state.work, composer:this.state.composer, musicians:this.state.musicians,
            durationInMinutes:this.state.durationInMinutes, instrumentation:this.state.instrumentation})
            .then(res => {
                this.props.callBack();
                this.setState({workid: ''});
            });
    };

    handleWorkChange = (event) => {
        this.setState({workid: event.target.value});
    };

    render() {
        return (
            <tr>
                <td colSpan={5}><span className="glyphicon glyphicon-music"></span><span> </span>
                    <select placeholder="teos" value={this.state.workid} onChange={this.handleWorkChange}>
                        <option key={0} value={0} label={"Valitse teos"} data={"Ei valittu"}/>
                        {this.state.works && this.state.works.map((data, index) => <option
                            key={data.id} value={data.id}
                            label={data.work} data={data} selected={this.state.workid == data.id && 'selected'}/>)}
                    </select>
                </td>
                <td colSpan="2">
                    <div className="circle" onClick={this.handleCreateClick}><span
                        className="glyphicon glyphicon-plus"></span></div>
                </td>
            </tr>);
    }

    componentDidMount () {
        this.load();
    }

    load = () => {
        axios.get('/api/works')
            .then(response => {
                const works = response.data;
                this.setState({ works: works });
            });
    }
}

export default NewWork;