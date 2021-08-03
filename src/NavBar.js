import React, {Component} from 'react';
import Navbar from "react-bootstrap/Navbar";
import {Button, Form, FormControl, Nav, NavLink} from "react-bootstrap";
import {withCookies} from 'react-cookie';
import {BrowserRouter, Link} from "react-router-dom";

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.cookies = props.cookies;
        this.state = {
            token: this.cookies.get('token'),
            user_id: this.cookies.get('user_id')
        };
    }

    navBarLoggedIn() {
        return (
            <div>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/songs">Piosenki</Nav.Link>
                        <Nav.Link as={Link} to="/albums">Albumy</Nav.Link>
                        <Nav.Link as={Link} to="/my_albums">Moje albumy</Nav.Link>
                        <Nav.Link as={Link} to="/add_song">Dodaj piosenkę</Nav.Link>
                    </Nav>
                    <Nav.Link href="#pricing">{this.state.token}</Nav.Link>
                    <Button onClick={this.logout.bind(this)} variant="outline-info">Wyloguj</Button>
                </Navbar>
            </div>
        )
    }

    navBarLoggedOut() {
        return (
            <div>
                    <Navbar bg="dark" variant="dark">
                        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                        <Nav className="mr-auto">
                            <Nav.Link as={Link} to="/songs">Piosenki</Nav.Link>
                            <Nav.Link as={Link} to="/albums">Albumy</Nav.Link>
                        </Nav>
                        <Form inline>
                            <FormControl type="text" value={this.state.username}
                                         onChange={e => this.setState({username: e.target.value})}
                                         placeholder="Nazwa użytkownika" className="mr-sm-2"/>
                            <FormControl type="password" value={this.state.password}
                                         onChange={e => this.setState({password: e.target.value})} placeholder="Hasło"
                                         className="mr-sm-2"/>
                            <Button onClick={() => this.login(this.state.username, this.state.password)}
                                    variant="outline-success">Zaloguj</Button>
                        </Form>
                        <Button href={"/register"} variant="outline-info">Zarejestruj</Button>
                    </Navbar>
            </div>
        )
    }

    login(username, password) {
        fetch("http://localhost:8000/api-token-auth/", {
            method: "POST",
            headers: {
                'content-type': "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        }).then((respone) => {
            if (respone.status === 200)
                return respone.json()
                    .then((json) => {
                        this.cookies.set("token", json.token)
                        this.cookies.set("user_id", json.user_id)
                        this.setState(
                            {
                                token: json.token,
                                user_id: json.user_id,
                                username: "",
                                password: ""
                            }, () => window.location.reload())
                    })
            else
                alert("Błąd logowania")
                this.setState(
                    {
                        token: "",
                        user_id: "",
                        username: "",
                        password: ""
                    })
        })

    }

    logout() {
        this.cookies.remove("token")
        this.cookies.remove("user_id")
        this.setState({
            token: null,
            user_id: null
        }, () => window.location.reload())
    }

    render() {
        if (this.state.token)
            return this.navBarLoggedIn()
        else
            return this.navBarLoggedOut()
    }
}

export default withCookies(NavBar);