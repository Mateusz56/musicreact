import React, {Component} from 'react';
import {Table} from "react-bootstrap";
import { HeartFill, StarFill, ChatRightDots } from 'react-bootstrap-icons';
import SongListRow from "./SongListRow";
import AlbumListRow from "./AlbumListRow";

class AlbumList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            albums: [],
            page: 0,
            loadMoreButtonText: 'Załaduj kolejne',
            canLoadMoreAlbums: true
        }

        this.fetchData = this.fetchData.bind(this)
    }

    componentDidMount() {
        this.fetchData()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.name !== this.props.name) {
            this.setState({
                page: 0,
                albums: [],
                loadMoreButtonText: 'Załaduj kolejne',
                canLoadMoreAlbums: true
            }, this.fetchData)
        }
    }

    fetchData() {
        fetch(`http://localhost:8000/album/?${this.props.name ? "name=" + this.props.name : ""}${'&page=' + this.state.page}`, {
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
                        loadMoreButtonText: 'Załadowano wszystkie piosenki spełniające warunki wyszukiwania',
                        canLoadMoreAlbums: false
                    }

                return {
                    albums: state.albums.concat(json)
                }
            }))
    }

    loadMore() {
        if(this.state.canLoadMoreSongs)
            this.setState((state, props) => {
                return {
                    page: state.page + 20,
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
                        <AlbumListRow albumName={x.name} songsCount={x.songs_count} mark={x.marks_avg} commentsCount={x.comments_count}/>)}
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

export default AlbumList;