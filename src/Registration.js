import React, {Component} from 'react';
import {Button, Form} from "react-bootstrap";
import FetchFunctions from "./FetchFunctions";

class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };

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
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            first_name: this.state.name,
            last_name: this.state.surname
        }
        FetchFunctions.Post('user', body, (json) => alert(json))
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit.bind(this)}>
                <Form.Label>
                    Nazwa użytkownika:
                    <Form.Control
                        name="username"
                        type="text"
                        onChange={this.handleInputChange} />
                </Form.Label>
                <br />
                <Form.Label>
                    Hasło:
                    <Form.Control
                        name="password"
                        type="password"
                        onChange={this.handleInputChange} />
                </Form.Label>
                <br />
                <Form.Label>
                    Powtórz hasło:
                    <Form.Control
                        name="repeatpassword"
                        type="password"
                        onChange={this.handleInputChange} />
                </Form.Label>
                <br />
                <Form.Label>
                    Imię:
                    <Form.Control
                        name="name"
                        type="text"
                        onChange={this.handleInputChange} />
                </Form.Label>
                <br />
                <Form.Label>
                    Nazwisko:
                    <Form.Control
                        name="surname"
                        type="text"
                        onChange={this.handleInputChange} />
                </Form.Label>
                <br />
                <Form.Label>
                    E-mail:
                    <Form.Control
                        name="email"
                        type="text"
                        onChange={this.handleInputChange} />
                </Form.Label>
                <br />
                <Button type={'submit'}>Wyślij</Button>
            </Form>
        );
    }
}

export default Registration;