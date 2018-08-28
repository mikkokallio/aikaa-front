import React from 'react';
import axios from 'axios';
import {Col} from 'react-bootstrap';

class NewRole extends React.Component {
    state= { name: '', categoryId: ''};
    handleCreateClick= (event) => {
        //event.preventDefault();

        axios.post('/api/roles', { name:this.state.name, categoryId:this.state.categoryId })
            .then(res => {});
        this.props.callBack();
    };
    handleNameChange= (event) => {
        this.setState({name: event.target.value});
    };
    handleCategoryChange= (event) => {
        this.setState({categoryId: event.target.value});
    };

    render() {
        return(
            <Col xs={2} md={2} className="boxx alert alert-warning"><span className="glyphicon glyphicon-tag"></span>
                    <input type="text" style={{width:'80px'}} placeholder="nimi" value={this.state.name} onChange={this.handleNameChange}/>
                    <input type="text" style={{width:'40px'}} placeholder="luokka" value={this.state.categoryId} onChange={this.handleCategoryChange}/>
                <div className="circle" onClick={this.handleCreateClick.bind(this)}><span className="glyphicon glyphicon-plus"></span></div></Col>
        );
    }
}

export default NewRole;