import './App.css';
import NavBar from "./NavBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import Registration from "./Registration";
import Songs from "./Songs";
import SongDetail from "./SongDetail";
import Albums from "./Albums";
import AlbumDetail from "./AlbumDetail";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import MessageBar from "./MessageBar";
import PageNotFound from "./PageNotFound";
import UserPanel from "./UserPanel";
import UserLoginPermission from "./UserLoginPermission";
import Error403 from "./Error403";

import React, {Component} from 'react';
import GlobalSettings from "./GlobalSettings";
import Translations from "./Translations";

class App extends Component {
    constructor(props) {
        super(props);

        GlobalSettings.InitializeSkinMode()
        this.state = {
            skinMode: GlobalSettings.skinMode
        }

        document.querySelector('title').text = Translations.GetText('pageTitle')
    }

    componentDidMount() {
        GlobalSettings.SubscribeSkinModeChange(this)
    }

    componentWillUnmount() {
        GlobalSettings.UnsubscribeSkinModeChange(this)
    }

    render() {
        return (
            <div className={"App " + this.state.skinMode}>
                <BrowserRouter>
                    <MessageBar/>
                    <NavBar/>
                    <br/>
                    <Switch>
                        <Route path="/songs" component={Songs}/>
                        <Route path="/register" component={Registration}/>
                        <Route path="/song/:id" component={SongDetail}/>
                        <Route path="/albums" render={(props) => (
                            <Albums {...props} myAlbums={false} />
                        )}/>
                        <Route path="/my_albums" render={(props) =>
                            <UserLoginPermission component={<Albums {...props} myAlbums={true}/>}/>}/>
                        <Route path="/album/:id" component={AlbumDetail}/>
                        <Route path="/register" component={Registration}/>
                        <Route path="/user" render={() => <UserLoginPermission component={<UserPanel/>}/>}/>
                        <Route exact path="/" component={Songs}/>
                        <Route path="/error403" component={Error403}/>
                        <Route component={PageNotFound} />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
