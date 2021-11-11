import React, {Component} from 'react';
import {HeartFill} from "react-bootstrap-icons";
import FetchFunctions from "./FetchFunctions";

class SongListRow extends Component {
    constructor(props) {
        super(props);

        this.state = {
            favourite: this.props.favourite
        }
    }

    setFavourite() {
        if(!this.props.userId) return;
        if(!this.state.favourite)
            FetchFunctions.Post('favourite_song', {
                author: this.props.userId,
                song: this.props.songId,
            }, (response) => response.json()
                .then((json) =>
                this.setState({
                    favourite: json.id
                })))
        else
            FetchFunctions.Delete(`favourite_song/${this.state.favourite}`, () => this.setState({
                favourite: null
            }))
    }

    navigateToSongDetail(songId) {
        this.props.history.push(`/song/${songId}`)
    }

    render() {
        return (
            <tr>
                <td><HeartFill color={this.state.favourite ? "red" : "black"} onClick={this.setFavourite.bind(this)}/></td>
                <td onClick={() => this.navigateToSongDetail(this.props.songId)}>{this.props.songName}</td>
                <td>{this.props.performer}</td>
                <td>{this.props.genre}</td>
                <td>{this.props.year}</td>
                <td>{this.props.mark}</td>
                <td>{this.props.commentsCount}</td>
            </tr>
        );
    }
}

export default SongListRow;