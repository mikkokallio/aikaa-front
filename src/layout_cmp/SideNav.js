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
        console.log("mode ",sessionStorage.getItem("mode"));
        console.log("token ",sessionStorage.getItem("token"));
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
                                <li><span className="glyphicon glyphicon-log-in"></span><a
                                    href="/signin">{strings.signin}</a></li>
                            }
                            {(this.props.mode === 'ROLE_USER' || this.props.mode === 'ROLE_ADMIN' || this.props.mode === 'ROLE_SUPERADMIN') && <div>
                                <li onClick={this.handleSignOut}><span className="glyphicon glyphicon-log-out" ></span><a
                                    href="/">{strings.signout}</a></li>
                                {/* <li><span className="glyphicon glyphicon-dashboard"></span><a
                                    href="/">{strings.front}</a></li> */}
                                <li><span className="glyphicon glyphicon-user"></span><a
                                    href="/profile">{strings.profile}</a></li>
                                {/* <li><span className="glyphicon glyphicon-comment"></span><a
                                    href="/messages">{strings.messages}</a></li> */}
                                <li><span className="glyphicon glyphicon-time"></span><a
                                    href="/schedule">{strings.schedule}</a></li>
                                <li><span className="glyphicon glyphicon-flag"></span><a href="/events">{strings.events}</a>
                                </li>
                            </div>}
                            {(this.props.mode === 'ROLE_ADMIN' || this.props.mode === 'ROLE_SUPERADMIN') &&
                                <div>
                                    <li><span className="glyphicon glyphicon-music"></span><a
                                        href="/works">{strings.works}</a></li>
                                    <li><span className="glyphicon glyphicon-list-alt"></span><a
                                        href="/users">{strings.users}</a></li>
                                    <li><span className="glyphicon glyphicon-map-marker"></span><a
                                        href="/places">{strings.places}</a></li>
                                    <li><span className="glyphicon glyphicon-tags"></span><a
                                        href="/roles">{strings.roles}</a></li>
                                    {/* <li><span className="glyphicon glyphicon-calendar"></span><a
                                        href="/calendar">{strings.bookings}</a></li> */}
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
                                <a href="#" onClick={() => this.setMode('ROLE_USER')}>user</a>/
                                <a href="#" onClick={() => this.setMode('ROLE_ADMIN')}>admin</a>/
                                <a href="#" onClick={() => this.setMode('ROLE_SUPERADMIN')}>superadmin</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default SideNav;