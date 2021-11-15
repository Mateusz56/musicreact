import React, {Component} from 'react';
import {Envelope, EnvelopeOpen} from "react-bootstrap-icons";

class AlbumInvitationListRow extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.albumName}</td>
                <td>{this.props.songsCount}</td>
                <td>{this.props.mark}</td>
                <td>{this.props.commentsCount}</td>
                <td><EnvelopeOpen/></td>
                <td><Envelope/></td>
            </tr>
        );
    }
}

export default AlbumInvitationListRow;