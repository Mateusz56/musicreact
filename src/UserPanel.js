import React, {Component} from 'react';
import FetchFunctions from "./FetchFunctions";
import MessageBar from "./MessageBar";
import {Button, Form} from "react-bootstrap";

class UserPanel extends Component {
    constructor(props) {
        super(props);

        this.handleInputChange = this.handleInputChange.bind(this);
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

    marginLeft10px = {
        marginLeft: '10px'
    }

    render() {
        return (
            <div align='left' style={this.marginLeft10px}>
                <h3>Zmień hasło</h3>
                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <Form.Label>
                        Nowe hasło:
                        <Form.Control
                            name="performer"
                            type="text"
                            onChange={this.handleInputChange} />
                    </Form.Label>
                    <Form.Label style={this.marginLeft10px}>
                        Powtórz nowe hasło:
                        <Form.Control
                            name="performer"
                            type="text"
                            onChange={this.handleInputChange} />
                    </Form.Label>
                    <Button type={'submit'} style={{...this.marginLeft10px, marginBottom: '7px'}}>Zmień</Button>
                </Form>
                <br/>
                <br/>
                <h3>Zmień dane</h3>
                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <Form.Label>
                        Imię:
                        <Form.Control
                            name="title"
                            type="text"
                            onChange={this.handleInputChange} />
                    </Form.Label>
                    <Form.Label style={this.marginLeft10px}>
                        Nazwisko:
                        <Form.Control
                            name="performer"
                            type="text"
                            onChange={this.handleInputChange} />
                    </Form.Label>
                    <Button type={'submit'} style={{...this.marginLeft10px, marginBottom: '7px'}}>Zmień</Button>
                </Form>
                <br/>
                <br/>
                <h3>Zmień adres e-mail</h3>
                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <Form.Label>
                        Imię:
                        <Form.Control
                            name="title"
                            type="text"
                            onChange={this.handleInputChange} />
                    </Form.Label>
                    <Form.Label style={this.marginLeft10px}>
                        Nazwisko:
                        <Form.Control
                            name="performer"
                            type="text"
                            onChange={this.handleInputChange} />
                    </Form.Label>
                    <Button type={'submit'} style={{...this.marginLeft10px, marginBottom: '7px'}}>Zmień</Button>
                </Form>
            </div>
        );
    }
}

export default UserPanel;