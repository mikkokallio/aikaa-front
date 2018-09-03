import React from 'react';
import axios from "axios/index";
import CastEntry from "./CastEntry";

class WorkCast extends React.Component {
    state = {work:[],users:[]};

    handleUpdateClick = (event) => {
        // axios.put('/api/works/' + this.state.id, {
        //     work: this.state.work, composer: this.state.composer, musicians: this.state.musicians,
        //     durationInMinutes: this.state.durationInMinutes, instrumentation: this.state.instrumentation
        // })
        //     .then(res => {
        //         // this.props.callBack();
        //         this.load();
        //         //               this.setState({work: '', composer: '', durationInMinutes: '', musicians: '', instrumentation: ''});
        //     });
    };
    handleRevertClick = (event) => {
        this.load();
    };

    render () {
        console.log(this.state);
        return (
                     <table className="boxx table-striped">
                         <thead>
                         <tr><th colSpan={2}><span className="glyphicon glyphicon-user"></span><span> </span>Roolitukset: {this.state.work.work}</th></tr>
                         </thead>
                         <tbody>
                             {this.state.work.roleList&&this.state.work.roleList.map((data, index) => <CastEntry key={index} users={this.state.users} data={data}/>)}
                         <tr>
                             <td><input className="btn btn-primary" type="submit" onClick={this.handleUpdateClick}
                                        value="Talleta"/>
                             </td>
                             <td><input className="btn btn-warning" type="submit" onClick={this.handleRevertClick} value="Peru"/></td></tr>
                         </tbody>
                     </table>
        )
    }
    componentDidMount() {
        this.load();
    }

    load = () => {
        this.setState({isLoading: true});
        // axios.get('/api/works/1')
        axios.get('/api/works/'+this.props.workId)
            .then(response => {
                const work = response.data;
                this.setState({work});
            });
        axios.get('/api/users')
            .then(response => {
                const users = response.data;
                this.setState({users});
            });
    }
}

export default WorkCast