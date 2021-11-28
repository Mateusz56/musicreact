import React, {Component} from 'react';
import {Button, Form} from "react-bootstrap";
import FetchFunctions from "./FetchFunctions";
import MessageBar from "./MessageBar";

class AddSong extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genres: []
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        FetchFunctions.Get('genres', null, (json) => this.setState({
            genres: json
        }))
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
            title: this.state.title,
            performer: this.state.performer,
            year: this.state.year,
            genre: this.state.genre,
        }
        FetchFunctions.Post('song', body, (response) => MessageBar.ShowMessage('Dodano piosenkę.'))
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit.bind(this)}>
                <Form.Label>
                    Tytuł:
                    <Form.Control
                        name="title"
                        type="text"
                        onChange={this.handleInputChange} />
                </Form.Label>
                <br />
                <Form.Label>
                    Wykonawca:
                    <Form.Control
                        name="performer"
                        type="text"
                        onChange={this.handleInputChange} />
                </Form.Label>
                <br />
                <Form.Label>
                    Rok:
                    <Form.Control
                        name="year"
                        type="number"
                        min={1900} max={2021}
                        onChange={this.handleInputChange} />
                </Form.Label>
                <br />
                <Form.Label>
                    Gatunek:
                    <select className="form-control" name="genre" value={this.state.genre} onChange={this.handleInputChange}>
                        {this.state.genres.map(x => <option key={x} value={x}>{x}</option>)}
                    </select>
                </Form.Label>
                <br />
                <Button type={'submit'}>Wyślij</Button>
            </Form>
        );
    }
}

export default AddSong;