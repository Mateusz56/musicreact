import React, {Component} from 'react';
import {Button, Table} from "react-bootstrap";
import {HeartFill, StarFill, ChatRightDots, Envelope, Star, ArrowUpShort, ArrowDownShort} from 'react-bootstrap-icons';
import SongListRow from "./SongListRow";
import AlbumListRow from "./AlbumListRow";
import {withCookies} from "react-cookie";
import Modal from "./Modal";
import AlbumInvitation from "./AlbumInvitation";
import FetchFunctions from "./FetchFunctions";
import AlbumInvitationList from "./AlbumInvitationList";
import TableHeadersUtility from "./TableHeadersUtility";

class AlbumList extends Component {
    constructor(props) {
        super(props);
        this.cookies = props.cookies
        this.cancelFlag = null

        this.state = {
            albums: [],
            page: 0,
            loadMoreButtonText: 'Załaduj kolejne',
            canLoadMoreAlbums: true,
            userId: this.cookies.get('user_id'),
            showModal: false,
            sortMode: '',
        }

        this.fetchData = this.fetchData.bind(this)
        this.prepareParams = this.prepareParams.bind(this)
        this.handleFetch = this.handleFetch.bind(this)
        this.changeSortMode = TableHeadersUtility.changeSortMode.bind(this)
        this.getSortButtonVariant = TableHeadersUtility.getSortButtonVariant.bind(this)
        this.renderTableHeader = TableHeadersUtility.renderTableHeader.bind(this)
    }

    componentDidMount() {
        this.fetchData()
    }

    componentWillUnmount() {
        if(this.cancelFlag)
            this.cancelFlag.cancel = true
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.name !== this.props.name || prevProps.favourite !== this.props.favourite
            || prevProps.myAlbums !== this.props.myAlbums || prevState.sortMode !== this.state.sortMode) {
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
        params.sortMode = this.state.sortMode;

        return params;
    }

    fetchData() {
        if(this.cancelFlag)
            this.cancelFlag.cancel = true
        this.cancelFlag = FetchFunctions.Get('album', this.prepareParams(), this.handleFetch)
    }

    handleFetch(json) {
        this.cancelFlag = null
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
                            <th>
                                {this.renderTableHeader('Nazwa', TableHeadersUtility.sortOptions.nameUp, TableHeadersUtility.sortOptions.nameDown)}
                            </th>
                            <th>
                                {this.renderTableHeader('Piosenki', TableHeadersUtility.sortOptions.songsCountUp, TableHeadersUtility.sortOptions.songsCountDown)}
                            </th>
                            <th>
                                {this.renderTableHeader(<StarFill/>, TableHeadersUtility.sortOptions.marksUp, TableHeadersUtility.sortOptions.marksDown)}
                            </th>
                            <th>
                                {this.renderTableHeader(<ChatRightDots/>, TableHeadersUtility.sortOptions.commentsUp, TableHeadersUtility.sortOptions.commentsDown)}
                            </th>
                            {this.props.myAlbums ? <th><Envelope/></th> : null}
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
                {this.props.myAlbums ? <AlbumInvitationList/> : ""}
            </div>
        );
    }
}

export default withCookies(AlbumList);