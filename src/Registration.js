import React, {Component} from 'react';
import {Button, Form} from "react-bootstrap";
import FetchFunctions from "./FetchFunctions";
import MessageBar from "./MessageBar";
import Translations from "./Translations";

class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usernameErrors: [],
            passwordErrors: [],
            firstNameErrors: [],
            lastNameErrors: [],
            emailErrors: [],
            repeatPasswordErrors: []
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

        this.setState({
            repeatPasswordErrors: this.state.password !== this.state.repeatpassword ? [`${Translations.GetText('passwordsAreDifferent')}.`] : []
        })

        let body = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            first_name: this.state.name,
            last_name: this.state.surname
        }
        FetchFunctions.Post('user', body, (json) => MessageBar.ShowMessage(`${Translations.GetText('userRegistered')}.`),
            (response) => response.json().then(json => this.setState({
                usernameErrors: json.username || [],
                passwordErrors: json.password || [],
                firstNameErrors: json.first_name || [],
                lastNameErrors: json.last_name || [],
                emailErrors: json.email || []
        })))
    }

    showError(error) {
        return error.map(x => [<br/>, <sub style={{color: 'red'}}>{x}</sub>])
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit.bind(this)}>
                <Form.Label>
                    {Translations.GetText('username')}:
                    {this.showError(this.state.usernameErrors)}
                    <Form.Control
                        name="username"
                        type="text"
                        onChange={this.handleInputChange} />
                </Form.Label>
                <br />
                <Form.Label>
                    {Translations.GetText('password')}:
                    {this.showError(this.state.passwordErrors)}
                    <Form.Control
                        name="password"
                        type="password"
                        onChange={this.handleInputChange} />
                </Form.Label>
                <br />
                <Form.Label>
                    {Translations.GetText('repeatPassword')}:
                    {this.showError(this.state.repeatPasswordErrors)}
                    <Form.Control
                        name="repeatpassword"
                        type="password"
                        onChange={this.handleInputChange} />
                </Form.Label>
                <br />
                <Form.Label>
                    {Translations.GetText('firstName')}:
                    {this.showError(this.state.firstNameErrors)}
                    <Form.Control
                        name="name"
                        type="text"
                        onChange={this.handleInputChange} />
                </Form.Label>
                <br />
                <Form.Label>
                    {Translations.GetText('lastName')}:
                    {this.showError(this.state.lastNameErrors)}
                    <Form.Control
                        name="surname"
                        type="text"
                        onChange={this.handleInputChange} />
                </Form.Label>
                <br />
                <Form.Label>
                    {Translations.GetText('email')}:
                    {this.showError(this.state.emailErrors)}
                    <Form.Control
                        name="email"
                        type="text"
                        onChange={this.handleInputChange} />
                </Form.Label>
                <br />
                <Button type={'submit'}>{Translations.GetText('send')}</Button>
            </Form>
        );
    }
}

export default Registration;