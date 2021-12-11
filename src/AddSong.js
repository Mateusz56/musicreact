import React, {Component} from 'react';
import {Button, Form} from "react-bootstrap";
import FetchFunctions from "./FetchFunctions";
import MessageBar from "./MessageBar";

class AddSong extends Component {
    constructor(props) {
        super(props);
        this.cancelFlag = null

        this.state = {
            genres: [],
            titleErrors: [],
            performerErrors: [],
            yearErrors: [],
            genreErrors: []
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        this.cancelFlag = FetchFunctions.Get('genres', null, (json) => this.setState({
            genres: json
        }))
    }

    componentWillUnmount() {
        if (this.cancelFlag)
            this.cancelFlag.cancel = true
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
        FetchFunctions.Post('song', body, (response) => MessageBar.ShowMessage('Dodano piosenkę.'),
            (response) => response.json().then(json => this.setState({
                titleErrors: json.title || [],
                performerErrors: json.performer || [],
                yearErrors: json.year || [],
                genreErrors: json.genre || []
            })))
    }

    showError(error) {
        return error.map(x => [<br/>, <sub style={{color: 'red'}}>{x}</sub>])
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit.bind(this)}>
                <Form.Label>
                    Tytuł:
                    {this.showError(this.state.titleErrors)}
                    <Form.Control
                        name="title"
                        type="text"
                        onChange={this.handleInputChange} />
                </Form.Label>
                <br />
                <Form.Label>
                    Wykonawca:
                    {this.showError(this.state.performerErrors)}
                    <Form.Control
                        name="performer"
                        type="text"
                        onChange={this.handleInputChange} />
                </Form.Label>
                <br />
                <Form.Label>
                    Rok:
                    {this.showError(this.state.yearErrors)}
                    <Form.Control
                        name="year"
                        type="number"
                        min={1900} max={2021}
                        onChange={this.handleInputChange} />
                </Form.Label>
                <br />
                <Form.Label>
                    Gatunek:
                    {this.showError(this.state.genreErrors)}
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