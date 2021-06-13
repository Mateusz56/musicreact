import React, {Component} from 'react';
import {Table} from "react-bootstrap";
import Mark from "./Mark";
import AddCommentBox from "./AddCommentBox";
import CommentsList from "./CommentsList";
import {withCookies} from "react-cookie";
import SongList from "./SongList";

class AlbumDetail extends Component {
    constructor(props) {
        super(props);
        this.cookies = props.cookies;

        this.state = {
            token: this.cookies.get('token'),
            name: "",
            author: "",
            mark: "",
            songs: "",
            canLoadMoreSongs: true,
            comments: []
        }
    }

    componentDidMount() {
        fetch(`http://localhost:8000/album/${this.props.albumId}/`, {
            method: "GET",
            headers: {
                'content-type': "application/json",
            }
        }).then((respone) => respone.json())
            .then((json) => this.setState({
                albumName: json.name,
            }))
    }

    render() {
        return (
            <div>
                <Table striped bordered hover>
                    <tbody>
                    <tr><td align={"left"} colSpan={5}>{this.state.albumName}</td></tr>
                    <Mark targetId={this.props.albumId} token={this.state.token} markAPILink={"album_mark"} markAuthorAPILink={"album_mark_author"}/>
                    </tbody>
                </Table>
                <SongList albumId={this.props.albumId}/>
                {this.state.token ?
                    <AddCommentBox commentAPILink={"album_comment"} albumId={this.props.albumId} token={this.state.token}/>
                    : "Zaloguj się, żeby dodać komentarz"}
                <CommentsList commentAPILink={"album_comment"} targetId={this.props.albumId}/>
            </div>
        );
    }
}

export default withCookies(AlbumDetail);