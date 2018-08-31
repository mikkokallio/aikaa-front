import React from 'react';
import Sidebar from 'react-bootstrap';
import axios from "axios/index";
import LocalizedStrings from 'react-localization';

const strings = new LocalizedStrings({
    fi:{
        dashboard:"Yhteenveto",
        profile:"Profiili",
        users:"Käyttäjät",
        messages:"Viestit",
        schedule:"Aikataulu",
        events:"Tapahtumat",
        places:"Paikat",
        roles:"Roolit",
        bookings:"Varaukset"
    },
    sv: {
        dashboard:"???",
        profile:"Profil",
        users:"Användare",
        messages:"Meddelande",
        schedule:"Tidtabell",
        events:"Evenemang",
        places:"Platser",
        roles:"Roller",
        bookings:"Bokningar"
    }
});

//                             <li><span className="glyphicon glyphicon-calendar"></span><a href="/calendar">Bookkaus/eventcast?</a></li>

class SideNav extends React.Component {
    //state = {refresh:false};

    render() {

        function setLanguageToSwedish () {
            strings.setLanguage('sv');
            //var refresh=true;
            //this.setState({refresh});
        }
        function setLanguageToFinnish () {
            strings.setLanguage('fi');
            //this.setState({});
        }

        function onSignIn (googleUser) {
            var profile = googleUser.getBasicProfile();
            console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
            console.log('Name: ' + profile.getName());
            console.log('Image URL: ' + profile.getImageUrl());
            console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
            // console.log(googleUser);
            // console.log("Käykö täällä?");
            var id_token = googleUser.getAuthResponse().id_token;
            //Then, send the ID token to your server with an HTTPS POST request:
            axios.post('/auth', {idtoken: id_token})
                .then(res => {});
        };

        // XHR version
            //var xhr = new XMLHttpRequest();
            //xhr.open('POST', 'https://yourbackend.example.com/tokensignin');
            //xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            //xhr.onload = function() {
                //console.log('Signed in as: ' + xhr.responseText);
            //};
            //xhr.send('idtoken=' + id_token);
        //}

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
                            <li><span className="glyphicon glyphicon-dashboard"></span><a href="/">{strings.dashboard}</a></li>
                            <li><span className="glyphicon glyphicon-user"></span><a href="/profile">{strings.profile}</a></li>
                            <li><span className="glyphicon glyphicon-list-alt"></span><a href="/users">{strings.users}</a></li>
                            <li><span className="glyphicon glyphicon-comment"></span><a href="/messages">{strings.messages}</a></li>
                            <li><span className="glyphicon glyphicon-time"></span><a href="/schedule">{strings.schedule}</a></li>
                            <li><span className="glyphicon glyphicon-flag"></span><a href="/events">{strings.events}</a></li>
                            <li><span className="glyphicon glyphicon-map-marker"></span><a href="/places">{strings.places}</a></li>
                            <li><span className="glyphicon glyphicon-tags"></span><a href="/roles">{strings.roles}</a></li>
                            <li><span className="glyphicon glyphicon-calendar"></span><a href="/calendar">{strings.bookings}</a></li>

                            {/*<li data-toggle="collapse" data-target="#products" className="collapsed active">*/}
                                {/*<a href="#">Admin-valikko <span*/}
                                    {/*className="glyphicon glyphicon-chevron-down"></span></a>*/}
                            {/*</li>*/}
                            {/*<li><a href="#" onClick={signOut}>Kirjaudu ulos</a></li>*/}
                            {/*<li><a href="#" onClick={onSignIn}>Lähetä tunnistetiedot</a></li>*/}
                            <li><a href="#" onClick={setLanguageToFinnish}>Fi</a> / <a href="#" onClick={setLanguageToSwedish}>Sv</a></li>
                            {/*<ul className="sub-menu collapse" id="products">*/}
                                {/*<li className="active"><a href="#">Admin-asetukset</a></li>*/}
                            {/*</ul>*/}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
    componentDidMount () {
        window.addEventListener('google-auth-loaded',
            this.renderGoogleSignInButton);
    }

    renderGoogleSignInButton = () => {
        window.gapi.signin2.render('g-signin2', {
            'scope': 'https://www.googleapis.com/auth/plus.login',
            'width': 300,
            'height': 50,
            'longtitle': true,
            'theme': 'light',
            'data-onsuccess': this.onSignIn
        });
    }
}

export default SideNav;