import React, {Component} from 'react';
import { Table } from "react-bootstrap";
import { HeartFill, StarFill, ChatRightDots } from 'react-bootstrap-icons';
import SongListRow from "./SongListRow";
import {withCookies} from "react-cookie";
import FetchFunctions from "./FetchFunctions";
import TableHeadersUtility from "./TableHeadersUtility";

class SongList extends Component {
    constructor(props) {
        super(props);
        this.cookies = props.cookies
        this.cancelFlag = null

        this.state = {
            songs: [],
            offset: 0,
            loadMoreButtonText: 'Załaduj kolejne',
            canLoadMoreSongs: true,
            userId: this.cookies.get('user_id'),
            sortMode: ''
        }

        this.fetchData = this.fetchData.bind(this)
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
        if (prevProps.name !== this.props.name || prevProps.genres !== this.props.genres ||
            prevProps.yearTo !== this.props.yearTo || prevProps.yearSince !== this.props.yearSince ||
            prevProps.markInput !== this.props.markInput || prevProps.markLess !== this.props.markLess ||
            prevProps.markEqual !== this.props.markEqual || prevProps.markMore !== this.props.markMore ||
            prevProps.favourite !== this.props.favourite || prevState.sortMode !== this.state.sortMode) {
            this.setState({
                offset: 0,
                songs: [],
                loadMoreButtonText: 'Załaduj kolejne',
                canLoadMoreSongs: true
            }, this.fetchData)
        }
    }

    chooseMarkInput() {
        if(this.props.markEqual && this.props.markLess)
            return 'lte'

        if(this.props.markEqual && this.props.markMore)
            return 'gte'

        if(this.props.markEqual)
            return 'exact'

        if(this.props.markLess)
            return 'lt'

        if(this.props.markMore)
            return 'gt'

        return false
    }

    prepareParams() {
        let params = {};

        params.name = this.props.name;
        params.genres = this.props.genres;
        params.yearSince = this.props.yearSince;
        params.yearTo = this.props.yearTo;
        params.albumId = this.props.albumId;
        params.user = this.state.userId;
        params.favourite = this.props.favourite;
        params.offset = this.state.offset;
        params.sortMode = this.state.sortMode;

        let markFilter = this.chooseMarkInput()
        if(markFilter)
        {
            params.mark = this.props.markInput;
            params.mark_filter = markFilter;
        }

        return params;
    }

    handleFetch(json) {
        this.cancelFlag = null
        this.setState((state) => {
            let songsCount = state.songs.length
            let newSongsArray = state.songs.concat(json)
            if (songsCount === newSongsArray.length)
                return {
                    loadMoreButtonText: 'Załadowano wszystkie piosenki spełniające warunki wyszukiwania',
                    canLoadMoreSongs: false
                }

            return {
                songs: state.songs.concat(json)
            }
        })
    }

    fetchData() {
        if(this.cancelFlag)
            this.cancelFlag.cancel = true
        this.cancelFlag = FetchFunctions.Get("song", this.prepareParams(), this.handleFetch)
    }

    loadMore() {
        if(this.state.canLoadMoreSongs)
            this.setState((state, props) => {
                return {
                    offset: state.offset + 20,
                };
            }, this.fetchData);
    }

    render() {
        return (
            <div>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th><HeartFill/></th>
                        <th>
                            {this.renderTableHeader('Nazwa', TableHeadersUtility.sortOptions.titleUp, TableHeadersUtility.sortOptions.titleDown)}
                        </th>
                        <th>
                            {this.renderTableHeader('Wykonawca', TableHeadersUtility.sortOptions.performerUp, TableHeadersUtility.sortOptions.performerDown)}
                        </th>
                        <th>
                            {this.renderTableHeader('Gatunek', TableHeadersUtility.sortOptions.genreUp, TableHeadersUtility.sortOptions.genreDown)}
                        </th>
                        <th>
                            {this.renderTableHeader('Rok', TableHeadersUtility.sortOptions.yearUp, TableHeadersUtility.sortOptions.yearDown)}
                        </th>
                        <th>
                            {this.renderTableHeader(<StarFill/>, TableHeadersUtility.sortOptions.marksUp, TableHeadersUtility.sortOptions.marksDown)}
                        </th>
                        <th>
                            {this.renderTableHeader(<ChatRightDots/>, TableHeadersUtility.sortOptions.commentsUp, TableHeadersUtility.sortOptions.commentsDown)}
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.songs.map(x =>
                        <SongListRow key={x.id} userId={this.state.userId} songId={x.id} songName={x.title} performer={x.performer}
                                     genre={x.genre} year={x.year} mark={x.marks_avg ? x.marks_avg.toPrecision(2) : '-'}
                                     commentsCount={x.comments_count} favourite={x.favourite} history={this.props.history}/>)}
                    <tr>
                        <td colSpan={7} onClick={this.loadMore.bind(this)}>
                            {this.state.loadMoreButtonText}
                        </td>
                    </tr>
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default withCookies(SongList);