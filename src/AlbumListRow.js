import React, {Component} from 'react';
import {HeartFill} from "react-bootstrap-icons";

class AlbumListRow extends Component {
    render() {
        return (
            <tr>
                <td><HeartFill/></td>
                <td>{this.props.albumName}</td>
                <td>{this.props.songsCount}</td>
                <td>{this.props.mark}</td>
                <td>{this.props.commentsCount}</td>
            </tr>
        );
    }
}

export default AlbumListRow;