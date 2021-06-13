import React, {Component} from 'react';
import {Table} from "react-bootstrap";
import {StarFill} from "react-bootstrap-icons";
import AddCommentBox from "./AddCommentBox";
import CommentsList from "./CommentsList";
import {withCookies} from "react-cookie";
import Mark from "./Mark";

class SongDetail extends Component {
    constructor(props) {
        super(props);
        this.cookies = props.cookies;
        this.state = {
            token: this.cookies.get('token'),

            songName: "Nazwa piosenki",
            songPerformer: "Wykonawca",
            songYear: "2000",
            songGenre: "Gatunek",
        }
    }

    componentDidMount() {
        fetch(`http://localhost:8000/song/${this.props.songId}/`, {
            method: "GET",
            headers: {
                'content-type': "application/json",
            }
        }).then((respone) => respone.json())
            .then((json) => this.setState({
                songName: json.title,
                songPerformer: json.performer,
                songYear: json.year,
                songGenre: json.genre,
            }))
    }

    render() {
        return (
            <div>
                <Table striped bordered hover>
                    <tbody>
                        <tr><td align={"left"} colSpan={5}>{this.state.songName}</td></tr>
                        <tr><td align={"left"} colSpan={5}>{this.state.songPerformer}</td></tr>
                        <tr><td align={"left"} colSpan={5}>{this.state.songYear}</td></tr>
                        <tr><td align={"left"} colSpan={5}>{this.state.songGenre}</td></tr>
                        <Mark targetId={this.props.songId} token={this.state.token} markAPILink={"song_mark"} markAuthorAPILink={"song_mark_author"}/>
                    </tbody>
                </Table>
                {this.state.token ?
                <AddCommentBox commentAPILink={"song_comment"} songId={this.props.songId} token={this.state.token}/>
                    : "Zaloguj się, żeby dodać komentarz"}
                <CommentsList commentAPILink={"song_comment"} targetId={this.props.songId}/>
            </div>
        );
    };
}

export default withCookies(SongDetail);