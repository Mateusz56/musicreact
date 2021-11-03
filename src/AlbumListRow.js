import React, {Component} from 'react';
import {Envelope, EnvelopeFill, HeartFill} from "react-bootstrap-icons";

class AlbumListRow extends Component {
    constructor(props) {
        super(props);

        this.state = {
            favourite: this.props.favourite
        }
    }

    setFavourite() {
        if(!this.props.userId) return;
        if(!this.state.favourite)
            fetch(`http://localhost:8000/favourite_album/`, {
                method: "POST",
                headers: {
                    'content-type': "application/json",
                },
                body: JSON.stringify({
                    author: this.props.userId,
                    album: this.props.albumId,
                })
            })
                .then((response) => response.json())
                .then((json) =>
                    this.setState({
                        favourite: json.id
                    }))
        else
            fetch(`http://localhost:8000/favourite_album/${this.state.favourite}`, {
                method: "DELETE",
                headers: {
                    'content-type': "application/json",
                },
            }).then(() => this.setState({
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
                {this.props.showModal ? <td onClick={this.props.showModal}><EnvelopeFill/></td> : ""}
            </tr>
        );
    }
}

export default AlbumListRow;