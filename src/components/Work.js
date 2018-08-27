import React, {Component} from 'react';

class Work extends React.Component {

    render() {
        console.log(this.props);
        return (
            <span>{this.props.data.work} </span>
        )
    }
}

export default Work;