import React, {Component} from 'react';
import {Table} from "react-bootstrap";
import {StarFill} from "react-bootstrap-icons";
import AddCommentBox from "./AddCommentBox";
import CommentsList from "./CommentsList";
import {withCookies} from "react-cookie";

class SongDetail extends Component {
    constructor(props) {
        super(props);
        this.cookies = props.cookies;
        this.state = {
            token: this.cookies.get('token'),
            starsColor: ['black', 'black', 'black', 'black', 'black'],

            songName: "Nazwa piosenki",
            songPerformer: "Wykonawca",
            songYear: "2000",
            songGenre: "Gatunek",
            songMark: 5
        }

        this.onMouseEnterStar = this.onMouseEnterStar.bind(this)
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

        fetch(`http://localhost:8000/song_mark/?${this.props.songId}`, {
            method: "GET",
            headers: {
                'content-type': "application/json",
            }
        }).then((response) => response.json())
            .then((json) =>
                this.setState({
                songMark: json.avg ? json.avg.toPrecision(2) : "Brak ocen"
            }))

        if(this.state.token)
            fetch(`http://localhost:8000/song_mark_author/?${this.state.token ? "token=" + this.state.token : ""}${this.props.songId ? "&songId=" + this.props.songId : ""}`, {
                method: "GET",
                headers: {
                    'content-type': "application/json",
                }
            }).then((response) => response.json())
                .then((json) =>
                    this.setState({
                        myMark: json.mark
                    }, () => this.onMouseEnterStar(json.mark - 1)))
    }

    sendMark(mark) {
        fetch(`http://localhost:8000/song_mark_author/`, {
            method: "PUT",
            headers: {
                'content-type': "application/json",
            },
            body: JSON.stringify({
                author: this.state.token,
                song: this.props.songId,
                mark: mark
            })
        }).then((response) => response.json())
            .then((json) =>
                this.setState({
                    myMark: json.mark
                }))
    }

    onMouseEnterStar(starIndex) {
        let newArray = this.state.starsColor.slice()
        for(let i = starIndex; i >= 0; i--)
            newArray[i] = 'yellow'
        for(let i = starIndex + 1; i < 5; i++)
            newArray[i] = 'black'

        this.setState({
            starsColor: newArray
        })
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
                        <tr>
                            <td width={250} align={"left"} colSpan={1} className={'m-auto'}>Ocena: {this.state.songMark}<br/>Twoja ocena: {this.state.myMark}</td>
                            {this.state.token ?
                                <td width={200} align={"left"} colSpan={1}
                                    onMouseLeave={() => this.onMouseEnterStar(this.state.myMark ? this.state.myMark - 1 : -1)}>
                                    <StarFill onMouseEnter={() => this.onMouseEnterStar(0)} onClick={() => this.sendMark(1)} size={35}
                                              color={this.state.starsColor[0]}/>
                                    <StarFill onMouseEnter={() => this.onMouseEnterStar(1)} onClick={() => this.sendMark(2)} size={35}
                                              color={this.state.starsColor[1]}/>
                                    <StarFill onMouseEnter={() => this.onMouseEnterStar(2)} onClick={() => this.sendMark(3)} size={35}
                                              color={this.state.starsColor[2]}/>
                                    <StarFill onMouseEnter={() => this.onMouseEnterStar(3)} onClick={() => this.sendMark(4)} size={35}
                                              color={this.state.starsColor[3]}/>
                                    <StarFill onMouseEnter={() => this.onMouseEnterStar(4)} onClick={() => this.sendMark(5)} size={35}
                                              color={this.state.starsColor[4]}/>
                                </td>
                                :
                                <td>
                                    Zaloguj się, żeby ocenić.
                                </td>
                            }
                            <td></td>
                        </tr>
                    </tbody>
                </Table>
                {this.state.token ?
                <AddCommentBox songId={this.props.songId} token={this.state.token}/>
                    : "Zaloguj się, żeby dodać komentarz"}
                <CommentsList songId={this.props.songId}/>
            </div>
        );
    };
}

export default withCookies(SongDetail);