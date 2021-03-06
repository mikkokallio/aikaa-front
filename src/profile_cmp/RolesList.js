import React from 'react';
import axios from "axios/index";
import Role from '../roles_cmp/Role';

class RolesList extends React.Component {
    state = {selected:'', categories: [], roleList: [], shortList: []};

    handleCategoryChange = (event) => {
        var roles=this.state.roleList;
        var shortList = [];
        for (var i = 0; i < roles.length; i++) {
            if (roles[i].categoryId==event.target.value) shortList.push(roles[i]);
        }
        console.log(shortList);
        this.setState({shortList: shortList});
    };
    handleRoleChange = (event) => {
        this.setState({selected: event.target.value})
        console.log(this.state.selected);
    };
    //TODO: Tämän pitää olla kontekstisidonnainen: lisää/poista/yms riippuen siitä missä näkymässä ollaan!
    handleAddClick= (event) => {
        // console.log("RolesListin state",this.state);
        // console.log("RolesListin props.user.id",this.props.user.id);
        axios.post('/api/userrole/'+ this.props.user.id+'/'+this.state.selected)
            .then(res => {
                this.props.callBack();
            });
    };

    handleRoleRemoval=(id, workid) => {
        this.props.callBackRemove(id, workid);
        this.props.callBack();
    }

    render() {
        return (
                <table className="boxx table-striped">
                    <thead>
                    <tr><th colSpan={3}><span className="glyphicon glyphicon-tags"></span><span> </span>Roolit</th></tr>
                    </thead>
                    <tbody>
                    <tr><td colSpan={3}>{this.props.user.roles?this.props.user.roles.map((line, index) => <Role key={index} callBack={this.props.callBack} callBackRemove={this.handleRoleRemoval} data={line}/>):'Lataa...'}</td>
                    </tr>
                    <tr><td>
                        <div style={{display:'inline-block'}}><select style={{width:'160px'}} value={this.state.categoryId} onChange={this.handleCategoryChange}>
                            <option disabled selected value> -- kategoria -- </option>
                            {this.state.categories.map((data, index) => <option key={index} value={data.id} label={data.name} data={data}/>)}
                        </select></div></td>
                        <td><div><select style={{width:'160px'}} value={this.state.role} onChange={this.handleRoleChange}>
                            <option disabled selected value> -- rooli -- </option>
                            {this.state.shortList.map((data, index) => <option value={data.id} label={data.name} data={data}/>)}
                        </select></div>
                        </td>
                        <td><div className="circle" onClick={this.handleAddClick.bind(this)}><span className="glyphicon glyphicon-plus"></span></div></td></tr>
                    </tbody>
            </table>
        )
    }

    componentDidMount() {
        this.load();
    }

    load = () => {
        axios.get('/api/rolecategories')
            .then(response => {
                const categories = response.data;
                this.setState({categories});
            });
        axios.get('/api/roles')
            .then(response => {
                const roleList = response.data;
                this.setState({roleList});
            });
    }
}

export default RolesList;