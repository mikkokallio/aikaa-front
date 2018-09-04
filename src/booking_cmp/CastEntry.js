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

    render() {
        var users = this.props.users;
        var shortList = [];
        for (var i = 0; i < users.length; i++) {
            for (var j = 0; j < users[i].roles.length; j++) {
                if (users[i].roles[j].id == this.props.data.id) shortList.push(users[i]);
            }
        }
        // console.log(this.props.selectedCast);//tässä on jo valmiiksi valitut. Saisiko nämä näkymään valittuina?

        return (
            <tr>
                <td>{this.props.data.name}</td>
                <td><select id={this.props.data.workroleId} style={{ width: '160px' }} value={this.state.selected} onChange={this.handleUserChange}>
                    <option key={0} value={0} label={"Valitse muusikko"} data={"Ei valittu"} />
                    {shortList.map((data, index) => <option key={data.id} value={data.id} label={data.name} data={data} />)} )
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