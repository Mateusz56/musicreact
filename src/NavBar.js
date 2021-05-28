import React, {Component} from 'react';
import Navbar from "react-bootstrap/Navbar";
import {Button, Form, FormControl, Nav} from "react-bootstrap";
import {withCookies, Cookies} from 'react-cookie';
import {instanceOf} from 'prop-types';

class NavBar extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        this.cookies = props.cookies;
        this.state = {
            token: this.cookies.get('token')
        };
    }

    navBarLoggedIn() {
        return (
            <div>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">Piosenki</Nav.Link>
                        <Nav.Link href="#features">Albumy</Nav.Link>
                        <Nav.Link href="#pricing">Moje albumy</Nav.Link>
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
                        <Nav.Link href="#home">Piosenki</Nav.Link>
                        <Nav.Link href="#features">Albumy</Nav.Link>
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
                    <Button variant="outline-info">Zarejestruj</Button>
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
                        this.setState(
                            {
                                token: json.token,
                                username: "",
                                password: ""
                            })
                        this.cookies.set("token", json.token)
                    })
            else
                alert("Błąd logowania")
                this.setState(
                    {
                        token: "",
                        username: "",
                        password: ""
                    })
        })

    }

    logout() {
        this.cookies.remove("token")
        this.setState({
            token: null
        })
    }

    render() {
        if (this.state.token)
            return this.navBarLoggedIn()
        else
            return this.navBarLoggedOut()
    }
}

export default withCookies(NavBar);