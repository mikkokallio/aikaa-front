import React from 'react';
import axios from 'axios';
import { Col } from 'react-bootstrap';

class NewRole extends React.Component {
    state = { json: [], name: '', categoryId: '' };
    handleCreateClick = (event) => {
        //event.preventDefault();
        axios.post('/api/roles', { name: this.state.name, categoryId: this.state.categoryId })
            .then(res => {
                this.props.callBack();
            });
        this.setState({ name: '', categoryId: '' });
    };
    handleNameChange = (event) => {
        this.setState({ name: event.target.value });
    };
    handleCategoryChange = (event) => {
        this.setState({ categoryId: event.target.value });
    };

    componentDidMount() {
        this.load();
    }
    load = () => {
        this.setState({ isLoading: true });
        axios.get('/api/rolecategories')
            .then(response => {
                const json = response.data;
                this.setState({ json });
            });
    };



    render() {
        return (
            <div className="role alert alert-success"><span className="glyphicon glyphicon-tag"></span>
                <input type="text" style={{ width: '120px' }} placeholder="uusi rooli" value={this.state.name} onChange={this.handleNameChange} />
                <div style={{ display: 'inline-block' }}><select placeholder="luokka" value={this.state.categoryId} onChange={this.handleCategoryChange}>
                    <option key={0} value={0} label={"Valitse rooli"} data={"Ei valittu"} />
                    {this.state.json.map((data, index) => <option value={data.id} label={data.name} data={data} />)}
                </select></div>

                <div className="circle" onClick={this.handleCreateClick.bind(this)}><span className="glyphicon glyphicon-plus"></span></div></div>
        );
    }

}

export default NewRole;