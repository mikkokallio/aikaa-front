import React from 'react';
import axios from "axios/index";
import CastEntry from "./CastEntry";

class WorkCast extends React.Component {
    state = {work:[],users:[]};

    render () {
        console.log(this.state);
        return (
            <div>
                <tr><td style={{textAlign:'center'}} colSpan={2}><b>{this.props.data.work}</b></td></tr>
                {this.state.work.roleList&&this.state.work.roleList.map((data, index) => <CastEntry key={index} users={this.state.users} data={data}/>)}
                {/*{this.state.event.works&&this.state.event.works.map((data, index) => <WorkCast key={index} data={data}/>)}*/}
            </div>
        )
    }
    componentDidMount() {
        this.load();
    }

    load = () => {
        this.setState({isLoading: true});
        axios.get('/api/works/'+this.props.data.id)
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