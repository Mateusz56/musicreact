import React, {Component} from 'react';
import {Table} from "react-bootstrap";
import {HeartFill, StarFill, ChatRightDots, Envelope } from 'react-bootstrap-icons';
import AlbumListRow from "./AlbumListRow";
import Modal from "./Modal";
import AlbumInvitation from "./AlbumInvitation";
import FetchFunctions from "./FetchFunctions";
import AlbumInvitationList from "./AlbumInvitationList";
import TableHeadersUtility from "./TableHeadersUtility";
import GlobalSettings from "./GlobalSettings";
import Translations from "./Translations";

class AlbumList extends Component {
    constructor(props) {
        super(props);
        this.cancelFlag = null

        this.state = {
            albums: [],
            page: 0,
            loadMoreButtonText: Translations.GetText('loadMore'),
            canLoadMoreAlbums: true,
            showModal: false,
            sortMode: '',
            skinMode: GlobalSettings.skinMode
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
        GlobalSettings.SubscribeSkinModeChange(this)
    }

    componentWillUnmount() {
        if(this.cancelFlag)
            this.cancelFlag.cancel = true

        GlobalSettings.UnsubscribeSkinModeChange(this)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.name !== this.props.name || prevProps.favourite !== this.props.favourite
            || prevProps.myAlbums !== this.props.myAlbums || prevState.sortMode !== this.state.sortMode) {
            this.setState({
                page: 0,
                albums: [],
                loadMoreButtonText: Translations.GetText('loadMore'),
                canLoadMoreAlbums: true
            }, this.fetchData)
        }
    }

    prepareParams() {
        let params = {};

        params.name = this.props.name;
        params.page = this.state.page;
        params.favourite = this.props.favourite;
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
                    loadMoreButtonText: Translations.GetText('allAlbumsLoaded'),
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
                <Table striped bordered hover variant={this.state.skinMode}>
                    <thead>
                        <tr>
                            <th><HeartFill color={'black'}/></th>
                            <th>
                                {this.renderTableHeader(Translations.GetText('name'), TableHeadersUtility.sortOptions.nameUp, TableHeadersUtility.sortOptions.nameDown)}
                            </th>
                            <th>
                                {this.renderTableHeader(Translations.GetText('performer'), TableHeadersUtility.sortOptions.artistUp, TableHeadersUtility.sortOptions.artistDown)}
                            </th>
                            <th>
                                {this.renderTableHeader(Translations.GetText('songs'), TableHeadersUtility.sortOptions.songsCountUp, TableHeadersUtility.sortOptions.songsCountDown)}
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
                                      favourite={x.favourite} artist={x.artist}
                                      showModal={this.props.myAlbums ? () => this.setState({showModal: true, albumId: x.id}) : null}/>)}
                    <tr>
                        <td className={'clickable'} colSpan={6} onClick={this.loadMore.bind(this)}>
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

export default AlbumList;