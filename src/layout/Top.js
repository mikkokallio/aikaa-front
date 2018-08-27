import React from "react";
import {Navbar} from "react-bootstrap";
import {Nav} from "react-bootstrap";
import {NavItem} from "react-bootstrap";
import {NavDropdown} from "react-bootstrap";
import {MenuItem} from "react-bootstrap";

class Top extends React.Component {

    render() {
        return (
            <Navbar fixedTop inverse>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#home">Right Place, Right Time</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    {/*<NavItem eventKey={1} href="#">*/}
                        {/*Link*/}
                    {/*</NavItem>*/}
                    {/*<NavItem eventKey={2} href="#">*/}
                        {/*Link*/}
                    {/*</NavItem>*/}
                    <NavDropdown eventKey={3} title="Mikko Kallio" id="basic-nav-dropdown">
                        <MenuItem eventKey={3.1}>Profiili</MenuItem>
                            <MenuItem divider/>
                        <MenuItem eventKey={3.4}>Kirjaudu ulos</MenuItem>
                    </NavDropdown>
                </Nav>
            </Navbar>
        )
    }
}

export default Top;