import logo from './logo.svg';
import './App.css';
import NavBar from "./NavBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import Registration from "./Registration";
import SongList from "./SongList";
import Songs from "./Songs";
import SongDetail from "./SongDetail";
import AlbumList from "./AlbumList";

function App() {
  return (
    <div className="App">
        <NavBar/>
        <br/>
        {/*<Registration/>*/}
        {/*<SongDetail songId={15}/>*/}
        <AlbumList/>
    </div>
  );
}

export default App;
