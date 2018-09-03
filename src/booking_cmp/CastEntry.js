import React from 'react';
import axios from "axios/index";

class CastEntry extends React.Component {
    state = { selected: '', shortList: []};

    handleUserChange = (event) => {
        let roleid = event.target.id;
        let userid = event.target.value;
        let castMember = {'roleid': roleid, 'userid': userid};
        this.props.callBack(castMember);
        //console.log(this.state.selected);
    };
    createShortList = (event) => {
        var users = this.props.users;
        var shortList = [];
        //console.log(this.props.users.length);
        for (var i = 0; i < users.length; i++) {
            if (users[i].roles.contains(this.props.data.name)) shortList.push(users[i]);
            //console.log(users[i] + " " + this.props.data.name);
        }
        //console.log(shortList);
        this.setState({ shortList: shortList });
    };

    render() {
        //console.log(this.state);
        //console.log(this.props.users);
        var users = this.props.users;
        var shortList = [];
        //console.log(this.props.users.length);
        for (var i = 0; i < users.length; i++) {
            for (var j = 0; j < users[i].roles.length; j++) {
                // console.log("Tyypin roolit: "+users[i].roles[j].id);
                // console.log("Odotus: "+this.props.data.id);
                if (users[i].roles[j].id == this.props.data.id) shortList.push(users[i]);
            }
        }
        //console.log(shortList);
        return (
            <tr>
                <td>{this.props.data.name}</td>
                <td><select id={this.props.data.id} style={{ width: '160px' }} value={this.state.selected} onChange={this.handleUserChange}>
                    <option key={0} value={0} label={"Valitse muusikko"} data={"Ei valittu"} />
                    {shortList.map((data, index) => <option key={data.id} value={data.id} label={data.name} data={data} />)} )
                    {/* <option selected value> -- muusikko --</option>
                    {shortList.map((data, index) => <option key={data.id} value={data.id} label={data.name} data={data}/>)} */}
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

// handleAddClick= (event) => {
//     axios.post('/api/userrole/3/'+this.state.selected)
//         .then(res => {
//             this.props.callBack();
//         });
// };
//
// render() {
//                 <div style={{display:'inline-block'}}>
//                 <td><div><select style={{width:'160px'}} value={this.state.role} onChange={this.handleRoleChange}>
//                     <option disabled selected value> -- rooli -- </option>
//                     {this.state.shortList.map((data, index) => <option value={data.id} label={data.name} data={data}/>)}
//                 </select></div>
//                 </td>
//                 <td><div className="circle" onClick={this.handleAddClick.bind(this)}><span className="glyphicon glyphicon-plus"></span></div></td></tr>
//             </tbody>
//         </table>
//     )
// }
//
// }