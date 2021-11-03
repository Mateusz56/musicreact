import React, {Component} from 'react';
import {Button, Col, Form, Table} from "react-bootstrap";
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
            userId: this.cookies.get('user_id'),
            albumId: 0,
        }

        this.submitAddToAlbum = this.submitAddToAlbum.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    componentDidMount() {
        fetch(`http://localhost:8000/song/${this.props.match.params.id}/`, {
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

        if(this.state.token) {
                fetch(`http://localhost:8000/album/?
${this.state.userId ? '&user=' + this.state.userId : ''}
&private=true&get_all=true`, {
                    method: "GET",
                    headers: {
                        'content-type': "application/json",
                    }
                }).then((respone) => respone.json())
                .then((json) => this.setState({
                    albums: json,
                    albumId: json[0] ? json[0].id : 0
                }))
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    submitAddToAlbum(event) {
        event.preventDefault()

        fetch(`http://localhost:8000/album/${this.state.albumId}/`, {
            method: "PUT",
            headers: {
                'content-type': "application/json",
            },
            body: JSON.stringify({
                add_song: this.props.match.params.id
            })
        }).then((respone) => alert(respone.status))
    }

    renderAddToAlbum() {
        return(
            <Form style={{marginBottom: 20, marginLeft: 20, marginRight: 20}} onSubmit={this.submitAddToAlbum}>
                <Form.Row>
                    <Form.Label>Nazwa albumu:</Form.Label>
                </Form.Row>
                <Form.Row>
                    <select className="form-control" style={{width: '25%'}} name="albumId" value={this.state.albumId} onChange={this.handleInputChange}>
                        {this.state.albums.map((x, i) => <option value={x.id}>{x.name}</option>)}
                    </select>
                    <Button type={'submit'}>Dodaj do album</Button>
                </Form.Row>
            </Form>
        )
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
                        <Mark targetId={this.props.match.params.id} token={this.state.token} markAPILink={"song_mark"} markAuthorAPILink={"song_mark_author"}/>
                    </tbody>
                </Table>
                {this.state.albums && this.state.albums.length !== 0 ? this.renderAddToAlbum() : ""}
                {this.state.token ?
                <AddCommentBox commentAPILink={"song_comment"} songId={this.props.match.params.id} token={this.state.token}/>
                    : "Zaloguj się, żeby dodać komentarz"}
                <CommentsList commentAPILink={"song_comment"} targetId={this.props.match.params.id}/>
            </div>
        );
    };
}

export default withCookies(SongDetail);