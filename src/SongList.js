import React, {Component} from 'react';
import {Table} from "react-bootstrap";
import { HeartFill, StarFill, ChatRightDots } from 'react-bootstrap-icons';
import SongListRow from "./SongListRow";
import {withCookies} from "react-cookie";

class SongList extends Component {
    constructor(props) {
        super(props);
        this.cookies = props.cookies

        this.state = {
            songs: [],
            offset: 0,
            loadMoreButtonText: 'Załaduj kolejne',
            canLoadMoreSongs: true,
            userId: this.cookies.get('user_id')
        }

        this.fetchData = this.fetchData.bind(this)
        this.sendMarkInput = this.sendMarkInput.bind(this)
    }

    componentDidMount() {
        this.fetchData()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.name !== this.props.name || prevProps.genres !== this.props.genres ||
            prevProps.yearTo !== this.props.yearTo || prevProps.yearSince !== this.props.yearSince ||
            prevProps.markInput !== this.props.markInput || prevProps.markLess !== this.props.markLess ||
            prevProps.markEqual !== this.props.markEqual || prevProps.markMore !== this.props.markMore) {
            this.setState({
                offset: 0,
                songs: [],
                loadMoreButtonText: 'Załaduj kolejne',
                canLoadMoreSongs: true
            }, this.fetchData)
        }
    }

    sendMarkInput() {
        if(this.props.markEqual && this.props.markLess)
            return `&mark=${this.props.markInput}&mark_filter=lte`

        if(this.props.markEqual && this.props.markMore)
            return `&mark=${this.props.markInput}&mark_filter=gte`

        if(this.props.markEqual)
            return `&mark=${this.props.markInput}&mark_filter=exact`

        if(this.props.markLess)
            return `&mark=${this.props.markInput}&mark_filter=lt`

        if(this.props.markMore)
            return `&mark=${this.props.markInput}&mark_filter=gt`

        return ""
    }

    fetchData() {
        fetch(`http://localhost:8000/song/?
${this.props.name ? "name=" + this.props.name : ""}
${this.props.genres ? '&genres=' + this.props.genres : ''}
${this.props.yearSince ? '&yearSince=' + this.props.yearSince : ''}
${this.props.yearTo ? '&yearTo=' + this.props.yearTo : ''}
${this.props.albumId ? '&albumId=' + this.props.albumId : ''}
${this.sendMarkInput()}
${this.props.albumId ? '&albumId=' + this.props.albumId : ''}
${this.state.userId ? '&user=' + this.state.userId : ''}
${'&offset=' + this.state.offset}`, {
            method: "GET",
            headers: {
                'content-type': "application/json",
            }
        }).then((respone) => respone.json())
            .then((json) => this.setState((state, props) => {
                let songsCount = state.songs.length
                let newSongsArray = state.songs.concat(json)
                if(songsCount === newSongsArray.length)
                    return {
                        loadMoreButtonText: 'Załadowano wszystkie piosenki spełniające warunki wyszukiwania',
                        canLoadMoreSongs: false
                    }

                return {
                    songs: state.songs.concat(json)
                }
            }))
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
                        <th>Nazwa</th>
                        <th>Wykonawca</th>
                        <th>Gatunek</th>
                        <th>Rok</th>
                        <th><StarFill/></th>
                        <th><ChatRightDots/></th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.songs.map(x =>
                        <SongListRow key={x.id} userId={this.state.userId} songId={x.id} songName={x.title} performer={x.performer}
                                     genre={x.genre} year={x.year} mark={x.marks_avg.toPrecision(2)}
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