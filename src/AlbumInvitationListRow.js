import React, {Component} from 'react';
import {CheckLg, XLg} from "react-bootstrap-icons";
import FetchFunctions from "./FetchFunctions";

class AlbumInvitationListRow extends Component {
    answerInvitation(accept) {
        FetchFunctions.Post('album_invitation_user', {albumInvitation: this.props.id, accept: accept ? 1 : 0}, () => window.location.reload())
    }

    render() {
        return (
            <tr>
                <td>{this.props.albumName}</td>
                <td>{this.props.songsCount}</td>
                <td>{this.props.mark}</td>
                <td>{this.props.commentsCount}</td>
                <td onClick={() => this.answerInvitation(true)}><CheckLg color={'green'}/></td>
                <td onClick={() => this.answerInvitation(false)}><XLg color={'red'}/></td>
            </tr>
        );
    }
}

export default AlbumInvitationListRow;