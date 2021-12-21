import React, {Component} from 'react';
import {Table} from "react-bootstrap";
import Mark from "./Mark";
import AddCommentBox from "./AddCommentBox";
import CommentsList from "./CommentsList";
import {withCookies} from "react-cookie";
import SongList from "./SongList";
import FetchFunctions from "./FetchFunctions";
import GlobalSettings from "./GlobalSettings";

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
            comments: [],
            skinMode: GlobalSettings.skinMode
        }
    }

    componentDidMount() {
        GlobalSettings.SubscribeSkinModeChange(this)

        if (this.cancelFlag)
            this.cancelFlag.cancel = true

        this.cancelFlag = FetchFunctions.Get(`album/${this.props.match.params.id}`, null,
            (json, response) => {
                this.cancelFlag = null
                if(response.status == 403) {
                    this.props.history.push('/error403')
                    return
                }
                if(response.status == 404) {
                    this.props.history.push('/error404')
                    return
                }
                this.setState({
                    albumName: json.name,
                })
            })
    }

    componentWillUnmount() {
        if (this.cancelFlag)
            this.cancelFlag.cancel = true

        GlobalSettings.UnsubscribeSkinModeChange(this)
    }

    render() {
        return (
            <div>
                <Table striped bordered hover variant={this.state.skinMode}>
                    <tbody>
                    <tr>
                        <td align={"left"} colSpan={5}>{this.state.albumName}</td>
                    </tr>
                    <Mark targetId={this.props.match.params.id} token={this.state.token} markAPILink={"album_mark"}
                          markAuthorAPILink={"album_mark_author"}/>
                    </tbody>
                </Table>
                <SongList albumId={this.props.match.params.id} history={this.props.history}/>
                {this.state.token ?
                    <AddCommentBox commentAPILink={"album_comment"} albumId={this.props.match.params.id}
                                   token={this.state.token}/>
                    : "Zaloguj się, żeby dodać komentarz"}
                <CommentsList commentAPILink={"album_comment"} targetId={this.props.match.params.id}/>
            </div>
        );
    }
}

export default withCookies(AlbumDetail);