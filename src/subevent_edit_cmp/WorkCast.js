import React from 'react';
import axios from "axios/index";
import CastEntry from "./CastEntry";

class WorkCast extends React.Component {
    state = { work: [], users: [], chosenCast: [] };

    handleUpdateClick = () => {
        this.props.callBack(this.state.chosenCast);
    };
    handleAddCast = (event) => {
        let cast = this.state.chosenCast;
        cast.push(event);
        this.setState({chosenCast: cast});
    };
    handleRevertClick = (event) => {
        this.load();
    };

    render() {
        let updateCast = this.props.callBack;
        let selectedCast = this.props.selectedCast;
        return (
            <table className="boxx table-striped">
                <thead>
                    <tr><th colSpan={3}><span className="glyphicon glyphicon-user"></span><span> </span>Roolitukset: {this.state.work.work}</th></tr>
                </thead>
                <tbody>
                    {this.state.work.roleList && this.state.work.roleList.map((data, index) => <CastEntry key={data.workroleid} selectedCast={selectedCast} callBack={this.handleAddCast} users={this.state.users} data={data} />)}
                    {(sessionStorage.getItem("mode") === 'ROLE_ADMIN' || sessionStorage.getItem("mode") === 'ROLE_SUPERADMIN')
                        && <tr>
                        <td><input className="btn btn-primary" type="submit" onClick={this.handleUpdateClick}
                            value="Talleta" />
                        </td>
                        <td colSpan={2}><input className="btn btn-warning" type="submit" onClick={this.handleRevertClick} value="Peru" /></td>
                    </tr>}
                </tbody>
            </table>
        )
    }
    componentDidMount() {
        this.load();
    }

    load = () => {
        this.setState({ isLoading: true });
        axios.get('/api/works/' + this.props.workid)
            .then(response => {
                const work = response.data;
                this.setState({ work });
            });
        axios.get('/api/bookings/free/'+this.props.subeventid)
            .then(response => {
                const users = response.data;
                this.setState({ users });
            });
    }
}

export default WorkCast