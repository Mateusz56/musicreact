import React, {Component} from 'react';
import FetchFunctions from "./FetchFunctions";
import {CheckLg, XLg} from "react-bootstrap-icons";
import {Table} from "react-bootstrap";
import AlbumInvitationListRow from "./AlbumInvitationListRow";
import GlobalSettings from "./GlobalSettings";

class AlbumInvitationList extends Component {
    constructor(props) {
        super(props);

        this.cancelFlag = null
        this.state = {
            albums: [],
            skinMode: GlobalSettings.skinMode
        }
    }

    componentDidMount() {
        GlobalSettings.SubscribeSkinModeChange(this)

        if (this.cancelFlag)
            this.cancelFlag.cancel = true

        this.cancelFlag = FetchFunctions.Get(`album_invitation_user`, null,
            (json) => {
                this.setState({
                    albums: json.results
                })
                this.cancelFlag = null
            }
        )
    }

    componentWillUnmount() {
        GlobalSettings.UnsubscribeSkinModeChange(this)

        if (this.cancelFlag)
            this.cancelFlag.cancel = true
    }

    render() {
        return (
            <div>
                <h2 style={{textAlign: 'left', marginLeft: '15px'}}>Zaproszenia</h2>
                <Table striped bordered hover variant={this.state.skinMode}>
                    <thead>
                    <tr>
                        <th>Nazwa</th>
                        <th>Piosenki</th>
                        <th>Ocena</th>
                        <th>Komentarze</th>
                        <th><CheckLg/></th>
                        <th><XLg/></th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.albums.map(x =>
                        <AlbumInvitationListRow id={x.id} key={x.album} albumName={x.album_name}
                                                songsCount={x.songs_count} mark={x.marks_avg}
                                                commentsCount={x.comments_count} albumId={x.album}/>)}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default AlbumInvitationList;