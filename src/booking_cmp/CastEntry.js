import React from 'react';
import axios from "axios/index";

class CastEntry extends React.Component {
    state = { selected: '', shortList: [] };

    handleUserChange = (event) => {
        this.findSelected(event.target.value);
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
        console.log("tämä", shortList);
    };

    findSelected = (id) => {
        let selected = this.props.users.find(user => user.id == id);
        console.log(selected);
        this.setState({ selected: selected });
    }

    findCastPersonnel = (workroleid) => {
        console.log("lähetetty workroleid", workroleid);
        if (this.props.selectedCast.length > 0) {
            let personnel = this.props.selectedCast ? this.props.selectedCast.find(cast => cast.workroleid == workroleid):'';
            console.log(personnel? personnel.username: "Ei valittu");
            return personnel? personnel.username: "Ei valittu";
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
        console.log(this.props.selectedCast);//tässä on jo valmiiksi valitut. Saisiko nämä näkymään valittuina?
        console.log(this.props.data.workroleId)
        let musician = this.findCastPersonnel(this.props.data.workroleId);
        console.log(musician);
        return (
            <tr>
                <td>{this.props.data.name}</td>
                <td><select id={this.props.data.workroleId} style={{ width: '160px' }} value={this.state.selected} onChange={this.handleUserChange}>
                    <option key={musician?musician.id:0} value={musician?musician.workroleId:0} label={"Valitse muusikko"} data={musician} />
                    {shortList.map((data, index) => <option key={data.workroleId} value={data.workroleId} label={data.name} data={data} />)} )
                </select>
                </td>
            </tr>
        )
    }

    componentDidMount() {
        //this.createShortList();
    }
}

export default CastEntry