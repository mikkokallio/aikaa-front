import React from 'react';
import Carousel from "./Carousel";
import axios from "axios/index";

class Main extends React.Component {
    state = {json:[]};
    render () {

    return (
        <div>
            <Carousel data={this.state.json}/>
        </div>
    )

    }
    componentDidMount()
    {
        // this.setState({isLoading: true});
        // axios.get('/afos')
        //     .then(response => {
        //         const json = response.data;
        //         this.setState({json});
        //     });
    }

}

export default Main;