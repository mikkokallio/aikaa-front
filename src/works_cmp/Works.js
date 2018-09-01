import React from 'react';
import axios from "axios/index";
import WorksList from "./WorksList";

class Works extends React.Component {
    state = {json:[]};
    render () {
        console.log(this.state.json);

        return (
            <div className="boxx">
                <h1>Teokset / ??</h1>
                <div className="alert alert-info">
                    <span className="glyphicon glyphicon-info-sign"></span> Tässä näkymässä voit lisätä ja muokata teoksia.
                </div>
                <p>-Listaa filtteröidyt teokset?</p>
                <WorksList data={this.state.json}/>
                {/*Alla oleva varmaankin vaaditaan jollekin tasolle jos haluaa mennä juuri tiettyyn workkiin!*/}
                {/*{this.state.json.map((data, index) => <Work {...this.props} id={this.state.json.id} key={index} data={data}/>)}*/}
            </div>
        )}

    componentDidMount()
    {
        this.load();
    }

    load = () => {
        this.setState({isLoading: true});
        axios.get('/api/works')
            .then(response => {
                const json = response.data;
                this.setState({json});
            });
    };

}

export default Works;