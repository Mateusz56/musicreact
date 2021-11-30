import React, {Component} from 'react';
import Navbar from "react-bootstrap/Navbar";
import {Button, Form, FormControl, Nav} from "react-bootstrap";
import {withCookies} from 'react-cookie';
import {Link} from "react-router-dom";
import Modal from "./Modal";
import AddSong from "./AddSong"
import AddAlbum from "./AddAlbum";
import FetchFunctions from "./FetchFunctions";
import MessageBar from "./MessageBar";
import AuthToken from "./AuthToken";
class NavBar extends Component {
    constructor(props) {
        super(props);
        this.cookies = props.cookies;
        this.state = {
            displayName: '',
            token: this.cookies.get('token'),
            user_id: '',
            showAddSongModal: false,
            username: '',
            password: ''
        };

        AuthToken.token = this.cookies.get('token')
    }

    componentDidMount() {
        if(this.state.token)
            FetchFunctions.Get('user_info', null, (json) => this.setState({
                displayName: json.username,
                user_id: json.id,
            }))
    }

    navBarLoggedIn() {
        return (
            <div>
                <Modal enabled={this.state.showAddSongModal} hideModal={() => this.setState({showAddSongModal: false})}>
                    <AddSong/>
                </Modal>
                <Modal enabled={this.state.showAddAlbumModal} hideModal={() => this.setState({showAddAlbumModal: false})}>
                    <AddAlbum/>
                </Modal>
                <Navbar bg="dark" variant="dark">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/songs">Piosenki</Nav.Link>
                        <Nav.Link as={Link} to="/albums">Albumy</Nav.Link>
                        <Nav.Link as={Link} to="/my_albums">Moje albumy</Nav.Link>
                        <Nav.Link onClick={() => this.setState({showAddSongModal: true, showAddAlbumModal: false})}>Dodaj piosenkę</Nav.Link>
                        <Nav.Link onClick={() => this.setState({showAddAlbumModal: true, showAddSongModal: false})}>Dodaj album</Nav.Link>
                    </Nav>
                    <Nav.Link as={Link} to="/user">{this.state.displayName}</Nav.Link>
                    <Button onClick={this.logout.bind(this)} variant="outline-info">Wyloguj</Button>
                </Navbar>
            </div>
        )
    }

    navBarLoggedOut() {
        return (
            <div>
                    <Navbar bg="dark" variant="dark">
                        {/*<Navbar.Brand href="#home">Navbar</Navbar.Brand>*/}
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
        let body = {
            username: username,
            password: password
        }

        FetchFunctions.Post('api-token-auth', body,
            (response) => response.json().then((json) => {
                this.cookies.set("token", json.token)
                this.cookies.set("user_id", json.user_id)
                sessionStorage.setItem('userLoggedIn', 'true')
                window.location.reload()
            }),
            () => {
                MessageBar.ShowError("Błąd logowania")
                this.setState(
                    {
                        token: "",
                        user_id: "",
                        username: "",
                        password: "",
                    })
            })
    }

    logout() {
        this.cookies.remove("token")
        this.cookies.remove("user_id")
        sessionStorage.removeItem('userLoggedIn')
        this.setState({
            token: null,
            user_id: null,
            displayName: null,
        }, () => window.location.reload())
    }

    render() {
        if (this.state.displayName)
            return this.navBarLoggedIn()
        else
            return this.navBarLoggedOut()
    }
}

export default withCookies(NavBar);