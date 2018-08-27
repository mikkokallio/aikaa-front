import React from 'react';
import axios from 'axios';

class QuoteForm extends React.Component {
    state= { author: '', quote: ''};
    handleCreateClick= (e) => {
        e.preventDefault();

        axios.post('/afos/uusi', { quote:this.state.quote, author:this.state.author })
            .then(res => {})
    };
    handleAuthorChange= (event) => {
        this.setState({author: event.target.value});
    };
    handleQuoteChange= (event) => {
        this.setState({quote: event.target.value});
    };

    render() {
        return(
            <form>
                <input type="text "placeholder="author" value={this.state.author} onChange={this.handleAuthorChange}/>
                <input type="text" placeholder="quote" value={this.state.quote} onChange={this.handleQuoteChange}/>
                <input type="submit" value="Create" onClick={this.handleCreateClick}/>
            </form>
            );
    }
}

export default QuoteForm;