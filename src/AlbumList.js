import React, {Component} from 'react';
import {Table} from "react-bootstrap";
import { HeartFill, StarFill, ChatRightDots, Envelope } from 'react-bootstrap-icons';
import SongListRow from "./SongListRow";
import AlbumListRow from "./AlbumListRow";
import {withCookies} from "react-cookie";
import Modal from "./Modal";
import AlbumInvitation from "./AlbumInvitation";
import FetchFunctions from "./FetchFunctions";
import AlbumInvitationList from "./AlbumInvitationList";

class AlbumList extends Component {
    constructor(props) {
        super(props);
        this.cookies = props.cookies

        this.state = {
            albums: [],
            page: 0,
            loadMoreButtonText: 'Załaduj kolejne',
            canLoadMoreAlbums: true,
            userId: this.cookies.get('user_id'),
            showModal: false,
        }

        this.fetchData = this.fetchData.bind(this)
        this.prepareParams = this.prepareParams.bind(this)
        this.handleFetch = this.handleFetch.bind(this)
    }

    componentDidMount() {
        this.fetchData()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.name !== this.props.name || prevProps.favourite !== this.props.favourite
            || prevProps.myAlbums !== this.props.myAlbums) {
            this.setState({
                page: 0,
                albums: [],
                loadMoreButtonText: 'Załaduj kolejne',
                canLoadMoreAlbums: true
            }, this.fetchData)
        }
    }

    prepareParams() {
        let params = {};

        params.name = this.props.name;
        params.page = this.state.page;
        params.favourite = this.props.favourite;
        params.user = this.state.userId;
        params.private = this.props.myAlbums;

        return params;
    }

    fetchData() {
        FetchFunctions.Get('album', this.prepareParams(), this.handleFetch)
    }

    handleFetch(json) {
        this.setState((state) => {
            let albumsCount = state.albums.length
            let newAlbumsArray = state.albums.concat(json)
            if(albumsCount === newAlbumsArray.length)
                return {
                    loadMoreButtonText: 'Załadowano wszystkie albumy spełniające warunki wyszukiwania',
                    canLoadMoreAlbums: false
                }

            return {
                albums: state.albums.concat(json)
            }
        })
    }

    loadMore() {
        if(this.state.canLoadMoreAlbums)
            this.setState((state, props) => {
                return {
                    page: state.page + 1,
                };
            }, this.fetchData);
    }

    render() {
        return (
            <div>
                <Modal enabled={this.state.showModal} hideModal={() => this.setState({showModal: false})}>
                    <AlbumInvitation albumId = {this.state.albumId}/>
                </Modal>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th><HeartFill/></th>
                        <th>Nazwa</th>
                        <th>Piosenki</th>
                        <th>Ocena</th>
                        <th>Komentarze</th>
                        {this.props.myAlbums ? <th><Envelope/></th> : ""}
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.albums.map(x =>
                        <AlbumListRow key={x.id} albumName={x.name} songsCount={x.songs_count} mark={x.marks_avg}
                                      commentsCount={x.comments_count} albumId={x.id} history={this.props.history}
                                      favourite={x.favourite} userId={this.state.userId} showModal={this.props.myAlbums ? () => this.setState({showModal: true, albumId: x.id}) : null}/>)}
                    <tr>
                        <td colSpan={6} onClick={this.loadMore.bind(this)}>
                            {this.state.loadMoreButtonText}
                        </td>
                    </tr>
                    </tbody>
                </Table>
                <h2 style={{textAlign: 'left', marginLeft: '15px'}}>Zaproszenia</h2>
                {this.props.myAlbums ? <AlbumInvitationList/> : ""}
            </div>
        );
    }
}

export default withCookies(AlbumList);