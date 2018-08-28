import React from 'react';
import Carousel from "../components/Carousel";
import axios from "axios/index";

class Main extends React.Component {
    state = {json:[]};
    render () {
        console.log(this.state.json);

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