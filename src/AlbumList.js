import React, {Component} from 'react';
import {Table} from "react-bootstrap";
import { HeartFill, StarFill, ChatRightDots } from 'react-bootstrap-icons';
import SongListRow from "./SongListRow";
import AlbumListRow from "./AlbumListRow";
import {withCookies} from "react-cookie";

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
        }

        this.fetchData = this.fetchData.bind(this)
    }

    componentDidMount() {
        this.fetchData()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.name !== this.props.name || prevProps.favourite !== this.props.favourite) {
            this.setState({
                page: 0,
                albums: [],
                loadMoreButtonText: 'Załaduj kolejne',
                canLoadMoreAlbums: true
            }, this.fetchData)
        }
    }

    fetchData() {
        fetch(`http://localhost:8000/album/?${this.props.name ? "name=" + this.props.name : ""}
${'&page=' + this.state.page}
${this.props.favourite ? "&favourite=" + this.props.favourite : ""}
${this.state.userId ? '&user=' + this.state.userId : ''}
${this.props.myAlbums ? '&private=' + this.props.myAlbums : ''}`, {
            method: "GET",
            headers: {
                'content-type': "application/json",
            }
        }).then((respone) => respone.json())
            .then((json) => this.setState((state, props) => {
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
            }))
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
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th><HeartFill/></th>
                        <th>Nazwa</th>
                        <th>Piosenki</th>
                        <th>Ocena</th>
                        <th>Komentarze</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.albums.map(x =>
                        <AlbumListRow key={x.id} albumName={x.name} songsCount={x.songs_count} mark={x.marks_avg}
                                      commentsCount={x.comments_count} albumId={x.id} history={this.props.history}
                                      favourite={x.favourite} userId={this.state.userId}/>)}
                    <tr>
                        <td colSpan={5} onClick={this.loadMore.bind(this)}>
                            {this.state.loadMoreButtonText}
                        </td>
                    </tr>
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default withCookies(AlbumList);