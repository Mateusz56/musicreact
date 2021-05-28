import React, {Component} from 'react';
import {Table} from "react-bootstrap";
import { HeartFill, StarFill, ChatRightDots } from 'react-bootstrap-icons';
import SongListRow from "./SongListRow";

class SongList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            songs: []
        }
    }

    componentDidMount() {
        fetch(`http://localhost:8000/song/?${this.props.name ? "name=" + this.props.name : ""}${this.props.genres ? '&genres=' + this.props.genres : ''}`, {
            method: "GET",
            headers: {
                'content-type': "application/json",
            }
        }).then((respone) => respone.json())
            .then((json) => this.setState({
                songs: json
            }))
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.name !== this.props.name || prevProps.genres !== this.props.genres) {
            fetch(`http://localhost:8000/song/?${this.props.name ? "name=" + this.props.name : ""}${this.props.genres ? '&genres=' + this.props.genres : ''}`, {
                method: "GET",
                headers: {
                    'content-type': "application/json",
                }
            }).then((respone) => respone.json())
                .then((json) => this.setState({
                    songs: json
                }))
        }
    }

    render() {
        return (
            <div>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th><HeartFill/></th>
                        <th>Nazwa</th>
                        <th>Wykonawca</th>
                        <th>Gatunek</th>
                        <th>Rok</th>
                        <th><StarFill/></th>
                        <th><ChatRightDots/></th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.songs.map(x =>
                        <SongListRow songName={x.title} performer={x.performer} genre={x.genre} year={x.year.substring(0, 4)} mark='4.7' commentsCount='7'/>)}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default SongList;