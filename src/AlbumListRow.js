import React, {Component} from 'react';
import { EnvelopeFill, HeartFill} from "react-bootstrap-icons";
import FetchFunctions from "./FetchFunctions";

class AlbumListRow extends Component {
    constructor(props) {
        super(props);

        this.state = {
            favourite: this.props.favourite
        }
    }

    setFavourite() {
        if(sessionStorage.getItem('userLoggedIn') !== 'true') return
        if(!this.state.favourite)
        {
            let body = {
                album: this.props.albumId,
            }
            FetchFunctions.Post('favourite_album', body, (response) => response.json()
                .then((json) => this.setState({
                favourite: json.id
            })))
        }
        else
            FetchFunctions.Delete(`favourite_album/${this.state.favourite}`, () => this.setState({
                favourite: null
            }))
    }

    navigateToAlbumDetail(albumId) {
        this.props.history.push(`/album/${albumId}`)
    }

    render() {
        return (
            <tr>
                <td><HeartFill color={this.state.favourite ? "red" : "black"} onClick={this.setFavourite.bind(this)}/></td>
                <td onClick={() => this.navigateToAlbumDetail(this.props.albumId)}>{this.props.albumName}</td>
                <td>{this.props.songsCount}</td>
                <td>{this.props.mark}</td>
                <td>{this.props.commentsCount}</td>
                {this.props.showModal ? <td onClick={this.props.showModal}><EnvelopeFill/></td> : null}
            </tr>
        );
    }
}

export default AlbumListRow;