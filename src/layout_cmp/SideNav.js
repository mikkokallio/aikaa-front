import React from 'react';
import Sidebar from 'react-bootstrap';
import axios from "axios/index";
import LocalizedStrings from 'react-localization';

const strings = new LocalizedStrings({
    fi: {
        signin: "Sisäänkirjautuminen",
        signout: "Uloskirjautuminen",
        front: "Etusivu",
        profile: "Profiili",
        users: "Käyttäjät",
        messages: "Viestit",
        schedule: "Aikataulu",
        events: "Tapahtumat",
        places: "Paikat",
        roles: "Roolit",
        bookings: "Varaukset",
        works: "Teokset"
    },
    sv: {
        signin: "Inloggning",
        signout: "Utloggning",
        front: "Framsidan",
        profile: "Profil",
        users: "Användare",
        messages: "Meddelande",
        schedule: "Tidtabell",
        events: "Evenemang",
        places: "Platser",
        roles: "Roller",
        bookings: "Bokningar",
        works: "Verk"
    }
});

class SideNav extends React.Component {

    setLanguageToSwedish = () => {
        sessionStorage.setItem("language", "sv");
        this.setState({});
    };

    setLanguageToFinnish = () => {
        sessionStorage.setItem("language", "fi");
        this.setState({});
    };

    setMode = (mode) => {
        sessionStorage.setItem("mode", mode);
        this.setState();
    };

    handleSignOut = () => {
        this.setMode("unknown");
        sessionStorage.setItem("token", "");
        sessionStorage.setItem("mode", "unknown");
        sessionStorage.removeItem("monday");
        this.setState();
    };

    render() {
        if (sessionStorage.getItem("language") !== null) strings.setLanguage(sessionStorage.getItem("language"));

        return (
            <div className="wrapper">
                <div className="nav-side-menu">
                    <div className="brand"><span className="redeye glyphicon glyphicon-music"></span> Aikaa</div>
                    <i className="fa fa-bars fa-2x toggle-btn" data-toggle="collapse" data-target="#menu-content"></i>
                    <div className="menu-list">
                        <ul id="menu-content" className="menu-content collapse out">
                            {(this.props.mode === 'unknown'|| this.props.mode == undefined) &&
                                <li><a
                                    href="/signin"><span className="glyphicon glyphicon-log-in"></span> {strings.signin}</a></li>
                            }
                            {(sessionStorage.getItem("mode") === 'ROLE_USER' || sessionStorage.getItem("mode") === 'ROLE_ADMIN' || sessionStorage.getItem("mode") === 'ROLE_SUPERADMIN') && <div>
                                <li onClick={this.handleSignOut}><a
                                    href="/"><span className="glyphicon glyphicon-log-out" ></span> {strings.signout}</a></li>
                                {/* <li><span className="glyphicon glyphicon-dashboard"></span><a
                                    href="/">{strings.front}</a></li> */}
                                <li><a
                                    href="/profile"><span className="glyphicon glyphicon-user"></span> {strings.profile}</a></li>
                                {/* <li><span className="glyphicon glyphicon-comment"></span><a
                                    href="/messages">{strings.messages}</a></li> */}
                                <li><a
                                    href="/schedule"><span className="glyphicon glyphicon-time"></span> {strings.schedule}</a></li>
                                <li><a href="/events"><span className="glyphicon glyphicon-flag"></span> {strings.events}</a>
                                </li>
                            </div>}
                            {(sessionStorage.getItem("mode") === 'ROLE_ADMIN' || sessionStorage.getItem("mode") === 'ROLE_SUPERADMIN') &&
                                <div>
                                    <li><a
                                        href="/works"><span className="glyphicon glyphicon-music"></span> {strings.works}</a></li>
                                    <li><a
                                        href="/users"><span className="glyphicon glyphicon-list-alt"></span> {strings.users}</a></li>
                                    <li><a
                                        href="/places"><span className="glyphicon glyphicon-map-marker"></span> {strings.places}</a></li>
                                    <li><a
                                        href="/roles"><span className="glyphicon glyphicon-tags"></span> {strings.roles}</a></li>
                                    {/* <li><span className="glyphicon glyphicon-calendar"></span><a
                                        href="/calendar">{strings.bookings}</a></li> */}
                                </div>}

                            {/*<li data-toggle="collapse" data-target="#products" className="collapsed active">*/}
                            {/*<a href="#">Admin-valikko <span*/}
                            {/*className="glyphicon glyphicon-chevron-down"></span></a>*/}
                            {/*</li>*/}
                            {/*<li><a href="#" onClick={signOut}>Kirjaudu ulos</a></li>*/}
                            <li style={{textAlign:'center'}}><a href="#" onClick={this.setLanguageToFinnish}>FI </a>
                                /<a href="#" onClick={this.setLanguageToSwedish}> SV</a>
                            </li>
                            {/*<ul className="sub-menu collapse" id="products">*/}
                            {/*<li className="active"><a href="#">Admin-asetukset</a></li>*/}
                            {/*</ul>*/}
                             <li style={{textAlign:'center'}}>
                                <a href="#" onClick={() => this.setMode('unknown')}>unknown</a>/
                                <a href="#" onClick={() => this.setMode('ROLE_USER')}>user</a>/
                                <a href="#" onClick={() => this.setMode('ROLE_ADMIN')}>admin</a>/
                                <a href="#" onClick={() => this.setMode('ROLE_SUPERADMIN')}>super</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default SideNav;