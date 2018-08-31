import React from 'react';
import Sidebar from 'react-bootstrap';
import axios from "axios/index";
import LocalizedStrings from 'react-localization';

const strings = new LocalizedStrings({
    fi: {
        signin: "Sisäänkirjautuminen",
        front: "Etusivu",
        profile: "Profiili",
        users: "Käyttäjät",
        messages: "Viestit",
        schedule: "Aikataulu",
        events: "Tapahtumat",
        places: "Paikat",
        roles: "Roolit",
        bookings: "Varaukset"
    },
    sv: {
        signin: "Inloggning",
        front: "Framsidan",
        profile: "Profil",
        users: "Användare",
        messages: "Meddelande",
        schedule: "Tidtabell",
        events: "Evenemang",
        places: "Platser",
        roles: "Roller",
        bookings: "Bokningar"
    }
});

class SideNav extends React.Component {

    setLanguageToSwedish = () => {
        localStorage.setItem("language","sv");
        this.setState({});
    };

    setLanguageToFinnish = () => {
        localStorage.setItem("language","fi");
        this.setState({});
    };

    setMode = (mode) => {
        localStorage.setItem("mode",mode);
        this.setState();
    };


    render() {
        console.log(localStorage.getItem('token'));
        if (localStorage.getItem("language")!==null) strings.setLanguage(localStorage.getItem("language"));

        function signOut() {
            var auth2 = window.gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
                console.log('User signed out.');
            });
        }

        return (
            <div className="wrapper">
                <div className="nav-side-menu">
                    <div className="brand"><span className="redeye glyphicon glyphicon-eye-open"></span> Red-I</div>
                    <i className="fa fa-bars fa-2x toggle-btn" data-toggle="collapse" data-target="#menu-content"></i>
                    <div className="menu-list">
                        <div className="g-signin2" data-onsuccess="onSignIn"></div>
                        <ul id="menu-content" className="menu-content collapse out">
                            {(this.props.mode === 'unknown') &&
                            <li><span className="glyphicon glyphicon-dashboard"></span><a
                                href="/signin">{strings.signin}</a></li>
                            }
                            {(this.props.mode === 'user' || this.props.mode === 'admin' || this.props.mode === 'superadmin') && <div>
                            <li><span className="glyphicon glyphicon-dashboard"></span><a
                                href="/">{strings.front}</a></li>
                            <li><span className="glyphicon glyphicon-user"></span><a
                                href="/profile">{strings.profile}</a></li>
                            <li><span className="glyphicon glyphicon-comment"></span><a
                                href="/messages">{strings.messages}</a></li>
                            <li><span className="glyphicon glyphicon-time"></span><a
                                href="/schedule">{strings.schedule}</a></li>
                            <li><span className="glyphicon glyphicon-flag"></span><a href="/events">{strings.events}</a>
                            </li>
                            </div>}
                            {(this.props.mode === 'admin' || this.props.mode === 'superadmin') &&
                            <div>
                                <li><span className="glyphicon glyphicon-list-alt"></span><a
                                    href="/users">{strings.users}</a></li>
                                <li><span className="glyphicon glyphicon-map-marker"></span><a
                                    href="/places">{strings.places}</a></li>
                                <li><span className="glyphicon glyphicon-tags"></span><a
                                    href="/roles">{strings.roles}</a></li>
                                <li><span className="glyphicon glyphicon-calendar"></span><a
                                    href="/calendar">{strings.bookings}</a></li>
                            </div>}

                            {/*<li data-toggle="collapse" data-target="#products" className="collapsed active">*/}
                            {/*<a href="#">Admin-valikko <span*/}
                            {/*className="glyphicon glyphicon-chevron-down"></span></a>*/}
                            {/*</li>*/}
                            {/*<li><a href="#" onClick={signOut}>Kirjaudu ulos</a></li>*/}
                            <li><a href="#" onClick={this.setLanguageToFinnish}>Fi</a>
                                / <a href="#" onClick={this.setLanguageToSwedish}>Sv</a>
                            </li>
                            {/*<ul className="sub-menu collapse" id="products">*/}
                            {/*<li className="active"><a href="#">Admin-asetukset</a></li>*/}
                            {/*</ul>*/}
                            <li>
                                <a href="#" onClick={() => this.setMode('unknown')}>unknown</a>/
                                <a href="#" onClick={() => this.setMode('user')}>user</a>/
                                <a href="#" onClick={() => this.setMode('admin')}>admin</a>/
                                <a href="#" onClick={() => this.setMode('superadmin')}>superadmin</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default SideNav;