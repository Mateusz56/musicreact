import React, {Component} from 'react';
import FetchFunctions from "./FetchFunctions";
import NavBar from "./NavBar";
import {withCookies} from "react-cookie";
import {Envelope, EnvelopeOpen, HeartFill} from "react-bootstrap-icons";
import AlbumListRow from "./AlbumListRow";
import {Table} from "react-bootstrap";
import AlbumInvitationListRow from "./AlbumInvitationListRow";

class AlbumInvitationList extends Component {
    constructor(props) {
        super(props);
        this.cookies = props.cookies

        this.state = {
            userId: this.cookies.get('user_id'),
            albums: []
        }
    }

    componentDidMount() {
        FetchFunctions.Get(`album_invitation_user/${this.state.userId}`, null, (json) => this.setState({
            albums: json.albums
        }))
    }

    render() {
        return (
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Nazwa</th>
                    <th>Piosenki</th>
                    <th>Ocena</th>
                    <th>Komentarze</th>
                    <th><EnvelopeOpen/></th>
                    <th><Envelope/></th>
                </tr>
                </thead>
                <tbody>
                    {this.state.albums.map(x =>
                        <AlbumInvitationListRow key={x.album} albumName={x.album_name} songsCount={x.song_count} mark={x.mark_avg}
                                      commentsCount={x.comment_count} albumId={x.album}/>)}
                </tbody>
            </Table>
        );
    }
}

export default withCookies(AlbumInvitationList);