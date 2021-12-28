import React, {Component} from 'react';
import {Button, Col, Form} from "react-bootstrap";
import {withCookies} from "react-cookie";
import FetchFunctions from "./FetchFunctions";
import MessageBar from "./MessageBar";
import GlobalSettings from "./GlobalSettings";
import Translations from "./Translations";

class AddAlbum extends Component {
    constructor(props) {
        super(props);
        this.cookies = props.cookies;

        this.state = {
            albumName: "",
            isPublic: false,
            userId: this.cookies.get('user_id'),
            nameErrors: [],
            artistErrors: [],
            imageErrors: []
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault()

        let body = {
            name: this.state.albumName,
            public: this.state.isPublic,
            artist: this.state.artist,
            image_url: this.state.imageUrl,
            owners: [this.state.userId]
        }
        FetchFunctions.Post("album", body, (response) => MessageBar.ShowMessage(`${Translations.GetText('albumAdded')}.`),
            (response) => response.json().then(json => this.setState({
                nameErrors: json.name || [],
                artistErrors: json.artist || [],
                imageErrors: json.image_url || [],
            })))
    }

    showError(error) {
        return error.map(x => [<br/>, <sub style={{color: 'red'}}>{x}</sub>])
    }

    render() {
        return(
            <Form onSubmit={this.handleSubmit.bind(this)}>
                <Form.Label>
                    {Translations.GetText('name')}:
                    {this.showError(this.state.nameErrors)}
                    <Form.Control
                        name="albumName"
                        type="text"
                        onChange={this.handleInputChange} />
                </Form.Label>
                <br />
                <Form.Label>
                    {Translations.GetText('performer')}:
                    {this.showError(this.state.artistErrors)}
                    <Form.Control
                        name="artist"
                        type="text"
                        onChange={this.handleInputChange} />
                </Form.Label>
                <br />
                <Form.Label>
                    {Translations.GetText('imageUrl')}:
                    {this.showError(this.state.imageErrors)}
                    <Form.Control
                        name="imageUrl"
                        type="text"
                        onChange={this.handleInputChange} />
                </Form.Label>
                <br />
                <Form.Label>
                    {Translations.GetText('public')}:
                    <Form.Check
                        name="isPublic"
                        onChange={this.handleInputChange}
                        checked={this.state.public}
                    />
                </Form.Label>
                <br />
                <Button type={'submit'}>{Translations.GetText('send')}</Button>
            </Form>
        )
    }
}

export default withCookies(AddAlbum);