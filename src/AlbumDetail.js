import React, {Component} from 'react';
import {Table} from "react-bootstrap";
import Mark from "./Mark";
import AddCommentBox from "./AddCommentBox";
import CommentsList from "./CommentsList";
import {withCookies} from "react-cookie";
import SongList from "./SongList";
import FetchFunctions from "./FetchFunctions";

class AlbumDetail extends Component {
    constructor(props) {
        super(props);
        this.cookies = props.cookies;
        this.cancelFlag = null

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
        if(this.cancelFlag)
            this.cancelFlag.cancel = true
        
        this.cancelFlag = FetchFunctions.Get(`album/${this.props.match.params.id}`, null,
            (json) => {
            this.cancelFlag = null
            this.setState({
                albumName: json.name,
            })
        })
    }

    componentWillUnmount() {
        if(this.cancelFlag)
            this.cancelFlag.cancel = true
    }

    render() {
        return (
            <div>
                <Table striped bordered hover>
                    <tbody>
                    <tr><td align={"left"} colSpan={5}>{this.state.albumName}</td></tr>
                    <Mark targetId={this.props.match.params.id} token={this.state.token} markAPILink={"album_mark"} markAuthorAPILink={"album_mark_author"}/>
                    </tbody>
                </Table>
                <SongList albumId={this.props.match.params.id} history={this.props.history}/>
                {this.state.token ?
                    <AddCommentBox commentAPILink={"album_comment"} albumId={this.props.match.params.id} token={this.state.token}/>
                    : "Zaloguj się, żeby dodać komentarz"}
                <CommentsList commentAPILink={"album_comment"} targetId={this.props.match.params.id}/>
            </div>
        );
    }
}

export default withCookies(AlbumDetail);