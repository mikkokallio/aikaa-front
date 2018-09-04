import React from 'react';
import axios from "axios/index";

class CastEntry extends React.Component {
    state = { selected: '', shortList: [] };

    handleUserChange = (event) => {
        let roleid = event.target.id;
        let userid = event.target.value;
        let castMember = { 'roleid': roleid, 'userid': userid };
        this.props.callBack(castMember);
        this.setState(this.state);
    };

    createShortList = (event) => {
        var users = this.props.users;
        var shortList = [];
        for (var i = 0; i < users.length; i++) {
            if (users[i].roles.contains(this.props.data.name)) shortList.push(users[i]);
        }
        this.setState({ shortList: shortList });
    };

    findSelected = (id) => {
        let selected = this.props.users.find(user => user.id == id);
        this.setState({ selected: selected });
    }

    findCastPersonnel = (workroleid) => {
        if (this.props.selectedCast.length > 0) {
            let personnel = this.props.selectedCast ? this.props.selectedCast.find(cast => cast.workroleid == workroleid):'';
            return personnel? personnel: "Ei valittu";
        } else {
            return "Ei valittu";
        }
    }

    render() {
        var users = this.props.users;
        var shortList = [];
        for (var i = 0; i < users.length; i++) {
            for (var j = 0; j < users[i].roles.length; j++) {
                if (users[i].roles[j].id == this.props.data.id) shortList.push(users[i]);
            }
        }
        let musician = this.findCastPersonnel(this.props.data.workroleId);
        return (
            <tr>
                <td>{this.props.data.name}</td>
                <td>{musician.username}</td>
                <td><select id={this.props.data.workroleId} style={{ width: '160px' }} value={this.state.selected} onChange={this.handleUserChange}>
                    <option key={0} value={0} label={"Valitse muusikko"} data={"Ei valittu"} />
                    {shortList.map((data, index) => <option key={data.id} value={data.id} label={data.name} data={data} />)} )
                </select>
                </td>
            </tr>
        )
    }
    // <select placeholder="teos" value={this.state.workid} onChange={this.handleWorkChange}>
    //                     <option key={0} value={0} label={"Valitse teos"} data={"Ei valittu"}/>
    //                     {this.state.works && this.state.works.map((data, index) => <option
    //                         key={data.id} value={data.id}
    //                         label={data.work} data={data} selected={this.state.workid == data.id && 'selected'}/>)}
    //                 </select>

    componentDidMount() {
        //this.createShortList();
    }
}

export default CastEntry