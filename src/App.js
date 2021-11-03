import logo from './logo.svg';
import './App.css';
import NavBar from "./NavBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import Registration from "./Registration";
import SongList from "./SongList";
import Songs from "./Songs";
import SongDetail from "./SongDetail";
import AlbumList from "./AlbumList";
import Albums from "./Albums";
import AlbumDetail from "./AlbumDetail";
import {BrowserRouter, Switch, Route, useParams} from "react-router-dom";
import AddSong from "./AddSong";
import AddAlbum from "./AddAlbum";

function App() {
  return (
    <div className="App">
        <BrowserRouter>

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
                <Route path="/" component={Songs}/>
            </Switch>
        </BrowserRouter>

    </div>
  );
}

export default App;
