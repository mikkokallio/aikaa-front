import React, {Component} from 'react';
import Work from './Work';

class Event extends React.Component {

    render() {
        return (
            <div>
                <div><span className="glyphicon glyphicon-tag"></span> {this.props.data.name}</div>
                <div>Event-näkymä Jeejee!!!!
                    {this.props.data.works.map((data, index) => <Work key={index} data={data}/>)}
                </div>
            </div>
        )
    }
}

export default Event;



import {ListGroup, ListGroupItem} from 'react-bootstrap';

class Maalista extends Component {
    state = {
        maat: {content: []},
        sivu: 1
    };

    // haemaatfetch = () => {
    //     ...
    //     itse.setState({maat: olio, sivu: olio.number + 1});
    // };

    render() {
        // Maalistan render()
        const maadata = this.state.maat.content;
        const maaelementit = maadata.map((maa) => {
            return <MaaRivi {...this.props} maa={maa} key={maa.code}/>
        });
        return (
            <p>Sivu: {this.state.maat.number + 1} / {this.state.maat.totalPages}</p>
            <table className='table-striped table-hover table-bordered'>
            <tbody>{maaelementit}</tbody>
    </table>

        <input value={this.state.sivu} onChange={this.muutasivu} onKeyPress={this.näpytintäNäppäilty}/>
        <button type='button' onClick={this.haemaatfetch}>Hae sivu</button>
    </div>
    );
    }

    muutasivu = (evt) => {
        this.setState({sivu: evt.target.value});
    }
    näpytintäNäppäilty = (evt) => {
        if (evt.key === 'Enter') {
            this.haemaatfetch();
        }
    }
}

class MaaRivi extends Component {
    maaklikattu = (evt) => {
        const url = '/maasivu/' + this.props.maa.code;
        this.props.history.push(url);
    }

    render() {
        const maa = this.props.maa;
        return (
            <tr onClick={this.maaklikattu}>
                <td>{maa.name}</td>
                <td>{maa.localName}</td>
                <td>{maa.continent}</td>
                <td>{maa.capital ? maa.capital.name : '-'}</td>
                <td>{maa.population}</td>
            </tr>
        );
    }
}