import React, {Component} from 'react';
import {HeartFill} from "react-bootstrap-icons";

class AlbumListRow extends Component {
    navigateToAlbumDetail(albumId) {
        this.props.history.push(`/album/${albumId}`)
    }

    render() {
        return (
            <tr>
                <td><HeartFill/></td>
                <td onClick={() => this.navigateToAlbumDetail(this.props.albumId)}>{this.props.albumName}</td>
                <td>{this.props.songsCount}</td>
                <td>{this.props.mark}</td>
                <td>{this.props.commentsCount}</td>
            </tr>
        );
    }
}

export default AlbumListRow;