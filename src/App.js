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

function App() {
  return (
    <div className="App">
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
                <Route path="/my_albums" render={(props) => (
                    <Albums {...props} myAlbums={true} />
                )}/>
                <Route path="/album/:id" component={AlbumDetail}/>
                <Route path="/register" component={Registration}/>
                <Route path="/user" component={UserPanel}/>
                <Route exact path="/" component={Songs}/>
                <Route component={PageNotFound} />
            </Switch>
        </BrowserRouter>

    </div>
  );
}

export default App;
