import React from 'react';

import { Link } from "react-router-dom";
import { Navbar } from "react-bulma-components";

import './HeaderBar.scss';

export class HeaderBar extends React.Component {

    render() {
        return (
            <Navbar>
                <Navbar.Brand>
                    <Navbar.Item renderAs={Link} to="/">Home</Navbar.Item>
                    <Navbar.Burger />
                </Navbar.Brand>
                <Navbar.Menu>
                    <Navbar.Container>
                        <Navbar.Item renderAs={Link} to="/hot">Hot</Navbar.Item>
                        <Navbar.Item renderAs={Link} to="/new">New</Navbar.Item>
                    </Navbar.Container>
                    <Navbar.Container position="end">
                        <Navbar.Item renderAs={Link} to="/login">Login</Navbar.Item>
                    </Navbar.Container>
                </Navbar.Menu>
            </Navbar>
        );
    }
}