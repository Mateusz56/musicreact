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
import { BrightnessHigh, Moon } from 'react-bootstrap-icons';
import GlobalSettings from "./GlobalSettings";
import Translations from "./Translations";
import Cookies from "./Cookies";

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
            password: '',
            skinMode: GlobalSettings.skinMode
        };

        AuthToken.token = this.cookies.get('token')
    }

    componentDidMount() {
        GlobalSettings.SubscribeSkinModeChange(this)

        if(this.state.token) {
            FetchFunctions.Get('user_info', null, (json) => {this.setState({
                displayName: json.username,
                user_id: json.id,
                })
                sessionStorage.setItem('userLoggedIn', 'true')
            })

            if (!Cookies.cookieExists('skinMode')) {
                FetchFunctions.Get('user_skin_mode', null, (json) => {
                    console.log(json);
                    GlobalSettings.ChangeSkinMode(json.skin_mode, false)
                })
            }
        }
    }

    componentWillUnmount() {
        GlobalSettings.UnsubscribeSkinModeChange(this)
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
                <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/songs">{Translations.GetText('songs')}</Nav.Link>
                        <Nav.Link as={Link} to="/albums">{Translations.GetText('albums')}</Nav.Link>
                        <Nav.Link as={Link} to="/my_albums">{Translations.GetText('myAlbums')}</Nav.Link>
                        <Nav.Link onClick={() => this.setState({showAddSongModal: true, showAddAlbumModal: false})}>{Translations.GetText('addSong')}</Nav.Link>
                        <Nav.Link onClick={() => this.setState({showAddAlbumModal: true, showAddSongModal: false})}>{Translations.GetText('addAlbum')}</Nav.Link>
                    </Nav>

                    {this.state.skinMode === 'dark' ?
                        <BrightnessHigh onClick={() => GlobalSettings.ChangeSkinMode('', true)} className={'clickable'} color={'white'} size={20}/> :
                        <Moon onClick={() => GlobalSettings.ChangeSkinMode('dark', true)} className={'clickable'} color={'white'} size={20} />}
                    <Nav.Link as={Link} to="/user">{this.state.displayName}</Nav.Link>

                    <Button onClick={this.logout.bind(this)} variant="outline-info">{Translations.GetText('logout')}</Button>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }

    navBarLoggedOut() {
        return (
            <div>
                    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                        {/*<Navbar.Brand href="#home">Navbar</Navbar.Brand>*/}
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link as={Link} to="/songs">{Translations.GetText('songs')}</Nav.Link>
                                <Nav.Link as={Link} to="/albums">{Translations.GetText('albums')}</Nav.Link>
                            </Nav>

                            {this.state.skinMode === 'dark' ?
                                <BrightnessHigh onClick={() => GlobalSettings.ChangeSkinMode('', false)} className={'clickable changeSkinModeIconLoggedOut'} color={'white'} size={20}/> :
                                <Moon onClick={() => GlobalSettings.ChangeSkinMode('dark', false)} className={'clickable changeSkinModeIconLoggedOut'} color={'white'} size={20}/>}
                            <Form inline>
                                <FormControl type="text" value={this.state.username}
                                             onChange={e => this.setState({username: e.target.value})}
                                             placeholder={Translations.GetText('username')} className="mr-sm-2"/>
                                <FormControl type="password" value={this.state.password}
                                             onChange={e => this.setState({password: e.target.value})} placeholder={Translations.GetText('password')}
                                             className="mr-sm-2"/>
                                <Button onClick={() => this.login(this.state.username, this.state.password)}
                                        variant="outline-success">{Translations.GetText('login')}</Button>
                                <Button href={"/register"} variant="outline-info">{Translations.GetText('register')}</Button>
                            </Form>
                        </Navbar.Collapse>
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
                MessageBar.ShowError(Translations.GetText('loginError'))
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