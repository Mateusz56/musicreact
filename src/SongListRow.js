import React, {Component} from 'react';
import {HeartFill} from "react-bootstrap-icons";

class SongListRow extends Component {
    constructor(props) {
        super(props);

        this.state = {
            favourite: this.props.favourite
        }
    }

    setFavourite() {
        if(!this.state.favourite)
            fetch(`http://localhost:8000/favourite_song/`, {
                method: "POST",
                headers: {
                    'content-type': "application/json",
                },
                body: JSON.stringify({
                    author: this.props.userId,
                    song: this.props.songId,
                })
            })
                 .then((response) => response.json())
                 .then((json) =>
                     this.setState({
                         favourite: json.id
                     }, () => console.log(this.state)))
        else
            fetch(`http://localhost:8000/favourite_song/${this.state.favourite}`, {
                method: "DELETE",
                headers: {
                    'content-type': "application/json",
                },
            }).then(() => this.setState({
                favourite: null
            }, () => console.log(this.state)))
    }

    render() {
        return (
            <tr>
                <td><HeartFill color={this.state.favourite ? "red" : "black"} onClick={this.setFavourite.bind(this)}/></td>
                <td>{this.props.songName}</td>
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