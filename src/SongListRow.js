import React, {Component} from 'react';
import {HeartFill} from "react-bootstrap-icons";

class SongListRow extends Component {
    render() {
        return (
            <tr>
                <td><HeartFill/></td>
                <td>{this.props.songName}</td>
                <td>{this.props.performer}</td>
                <td>{this.props.genre}</td>
                <td>{this.props.year}</td>
                <td>{this.props.mark}</td>
                <td>{this.props.commentsCount}</td>
            </tr>
        );
    }
}

export default SongListRow;