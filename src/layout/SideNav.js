import React from 'react';
import Sidebar from 'react-bootstrap';

class SideNav extends React.Component {

    render() {
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
                            <li><span className="glyphicon glyphicon-dashboard"></span><a href="/">Yhteenveto</a></li>
                            <li><span className="glyphicon glyphicon-user"></span><a href="/profile">Profiili</a></li>
                            <li><span className="glyphicon glyphicon-list-alt"></span><a href="/users">Käyttäjät</a></li>
                            <li><span className="glyphicon glyphicon-comment"></span><a href="/messages">Viestit</a></li>
                            <li><span className="glyphicon glyphicon-time"></span><a href="/schedule">Aikataulu</a></li>
                            <li><span className="glyphicon glyphicon-flag"></span><a href="/events">Tapahtumat</a></li>
                            <li><span className="glyphicon glyphicon-map-marker"></span><a href="/places">Paikat</a></li>
                            <li><span className="glyphicon glyphicon-tags"></span><a href="/roles">Roolit</a></li>
                            <li><span className="glyphicon glyphicon-calendar"></span><a href="/calendar">Bookkaus/eventcast?</a></li>

                            <li data-toggle="collapse" data-target="#products" className="collapsed active">
                                <a href="#">Admin-valikko <span
                                    className="glyphicon glyphicon-chevron-down"></span></a>
                            </li>
                            <li><a href="#" onClick={signOut}>Kirjaudu ulos</a></li>
                            {/*<ul className="sub-menu collapse" id="products">*/}
                                {/*<li className="active"><a href="#">Admin-asetukset</a></li>*/}
                            {/*</ul>*/}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default SideNav;