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
                <Route path="/albums" component={Albums}/>
                <Route path="/album/:id" component={AlbumDetail}/>
            </Switch>
        {/*<Registration/>*/}
        {/*<SongDetail songId={15}/>*/}
        {/*<Albums/>*/}
        {/*<AlbumDetail albumId={1}/>*/}
        </BrowserRouter>

    </div>
  );
}

export default App;
