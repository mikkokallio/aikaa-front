import React from 'react';
import axios from 'axios';

class QuoteForm extends React.Component {
    state= { author: '', quote: ''};
    handleCreateClick= (e) => {
        e.preventDefault();

        axios.post('/afos/uusi', { quote:this.state.quote, author:this.state.author })
            .then(res => {})

        // JA FETCH TAAS:
        // return fetch('/afos/uusi', {
        //     method: 'post',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({quote:this.state.quote,author:this.state.author})
        // })
        //     .then(response => response.json());
    };
    handleAuthorChange= (event) => {
        this.setState({author: event.target.value});
    };
    handleQuoteChange= (event) => {
        this.setState({quote: event.target.value});
    };

    render() {
        return(
            <fieldset><legend>QuoteForm</legend>
            <form>
                <input type="text "placeholder="author" value={this.state.author} onChange={this.handleAuthorChange}/>
                <input type="text" placeholder="quote" value={this.state.quote} onChange={this.handleQuoteChange}/>
                <input type="submit" value="Create" onClick={this.handleCreateClick}/>
            </form>
            </fieldset>);
    }
}

export default QuoteForm;